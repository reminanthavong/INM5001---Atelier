const session = require('express-session');
const creationHoraire = require('./genererhoraire');
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
	await enleverQuarts(sessEmployeur, idtablehoraire);
	while (i < quarts.length) {
		var x = quarts[i];
	    try{
		    await ajoutQuarts(sessEmployeur, idtablehoraire, x.slice(0, 1), x.slice(1), jsonResultat[i]);
		    result.success = true;
		    console.log('Ajout Quarts Success')
	    }catch (e){
		    result.success = false;
	    }
  		i++;
  	}
	 try{
		    await creerHoraire(idtablehoraire, date.toISOString().slice(0, 10), sessEmployeur)
		    result.success = true;
		    console.log('Generer Horaire Success')
	    }catch (e){
		    result.success = false;
	    }
  	

    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(result));
}

async function creerHoraire(idtablehoraire, dateHoraire, sessEmployeur){
    let result = {}
    await enleverHoraire(idtablehoraire,sessEmployeur);
    try {
        horaire = await creationHoraire.genererHoraireReponse(idtablehoraire, dateHoraire, sessEmployeur);
        console.log(horaire);
        var compteur = 0;
        while (compteur < horaire.horaires.length) {
            var id = horaire.horaires[compteur].idtablehoraire;
            var dateparam = horaire.horaires[compteur].dateparam;
            var idemploye = horaire.horaires[compteur].idemploye;
            var jour = horaire.horaires[compteur].joursemaine;
            var quart = horaire.horaires[compteur].typequart;
            await enregistrerHoraire(id, dateparam, sessEmployeur, idemploye, jour, quart);
            compteur++;
        }
        result.success = true;
    }catch (e){
        result.success = false;
    }
}

async function ajoutQuarts(sessEmployeur, idtablehoraire, quart, jour, nbemploye) {
    await Api
      .post('/basequartsemployeur')
      .send({idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: quart, joursemaine: jour, nbremployes: nbemploye});
}

async function avoirQuarts(sessEmployeur, idtablehoraire) {
    await Api
      .get('/basequartsemployeur')
      .eq('idemployeur', sessEmployeur)
       .eq('idtablehoraire',idtablehoraire)
}

async function enleverQuarts(sessEmployeur, idtablehoraire) {
    await Api
      .delete('/basequartsemployeur')
      .eq('idemployeur', sessEmployeur)
       .eq('idtablehoraire',idtablehoraire)
}

async function enregistrerHoraire(id, date, gestionnaire, idemploye, jour, quart){
    await Api
        .post('/tablehoraire')
        .send({idtablehoraire: id, dateparam: date, idemployeur: gestionnaire, idemploye: idemploye, joursemaine: jour, typequart: quart});

}

async function enleverHoraire(id,gestionnaire){
    await Api
        .delete('/tablehoraire')
        .eq('idemployeur', gestionnaire)
	.eq('idtablehoraire',id)
}

module.exports = {
  ajouterQuarts,
}	
