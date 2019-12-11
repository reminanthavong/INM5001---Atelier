const session = require('express-session');
const GenererHoraire = require('./GenererHoraire')
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
var PostgREST = require('postgrest-client');
var Api = new PostgREST ('http://testpostgrest-calendrier.herokuapp.com');

const ajouterQuarts = async(req, res) => {
	let result = {}
	var quarts = ["","J1", "N1", "S1","J2", "S2", "N2","J3", "S3", "N3","J4", "S4", "N4","J5", "S5", "N5"];
	const reqjson = req.body;

	//Transforme le json reçu en un tableau en ne gardant que les valeurs number
	var jsonResultat = [];
	for (var i in reqjson) {
	    jsonResultat.push(reqjson[i])
	}

	var sessEmployeur = req.session.idgestion;
	var date = new Date(reqjson.horairedate)
	date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); //Ajuste la date par rapport au fuseau horaire
	var idtablehoraire = "" + sessEmployeur + "-" + date.toISOString().slice(0, 10); //Création de l'id de la table horaire

	var i = 1;
	while (i < quarts.length) {
		var x = quarts[i];
		    try{
			    await ajoutQuarts(sessEmployeur, idtablehoraire, x.slice(0, 1), x.slice(1), jsonResultat[i]);
		        result.success = true;

		    }catch (e) {
		        result.success = false;
	        }
  		i++;
  	}
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(result))
}

const genererHoraire = async (req, res) => {
    let result = {}
    const reqjson = req.body;
    var sessEmployeur = req.session.idgestion;

    var date = new Date(reqjson.horairedate);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    var dateHoraire = date.toISOString().slice(0,10)
    console.log(dateHoraire)
    var idtablehoraire = "" + sessEmployeur + "-" + dateHoraire; //Création de l'id de la table horaire

    try {
        const horaire = await GenererHoraire.GenererHoraire(idtablehoraire, dateHoraire, sessEmployeur)
        console.log(horaire)
        var compteur = 0;
        console.log(compteur);
        console.log(horaire.length)
        while (compteur < horaire.length) {
            console.log(horaire[compteur]);

            var id = horaire[compteur].idtablehoraire;
            var dateparam = horaire[compteur].dateparam;
            var idemploye = horaire[compteur].idemploye;
            var jour = horaire[compteur].joursemaine;
            var quart = horaire[compteur].typequart;

            console.log(id);
            console.log(dateparam);
            console.log(idemploye);
            console.log(jour);
            console.log(quart);

            await enregistrerHoraire(id, dateparam, sessEmployeur, idemploye, jour, quart);
            console.log(compteur);
            compteur++;
        }
        result.success = true;
    } catch (e) {
        result.success = false;
    }
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(result))

}

async function ajoutQuarts(sessEmployeur, idtablehoraire, quart, jour, nbemploye) {
    await Api
      .post('/basequartsemployeur')
      .send({idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: quart, joursemaine: jour, nbremployes: nbemploye});
}

async function enregistrerHoraire(id, date, gestionnaire, idemploye, jour, quart){
    console.log('Dans la fonction enregistrerHoraire');
    await Api
        .post('/tablehoraire')
        .send({idtablehoraire: id, dateparam: date, idemployeur: gestionnaire, idemploye: idemploye, joursemaine: jour, typequart: quart});

}

module.exports = {
  ajouterQuarts,
  genererHoraire
}	
