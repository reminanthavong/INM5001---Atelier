const session = require('express-session');
const { Pool } = require('pg');
var PostgREST = require('postgrest-client');
var Api = new PostgREST ('http://testpostgrest-calendrier.herokuapp.com');
var sess;

const ajouterHoraire = async(req, res) => {
	let result = {}
	var quarts = ["","J1", "N1", "S1","J2", "S2", "N2","J3", "S3", "N3","J4", "S4", "N4","J5", "S5", "N5"];
	const reqjson = req.body;

	//Transforme le json reçu en un tableau en ne gardant que les valeurs number
	var jsonResultat = [];
	for (var i in reqjson) {
	    jsonResultat.push(reqjson[i])
	}
	console.log(jsonResultat)

	var sessEmployeur = req.session.idgestion;
	var date = new Date(reqjson.horairedate)
	date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); //Ajuste la date par rapport au fuseau horaire
	var idtablehoraire = "" + sessEmployeur + "-" + date.toISOString().slice(0, 10); //Création de l'id de la table horaire
	console.log(idtablehoraire)

	var i = 1;
	while (i < quarts.length) {
		var x = quarts[i];
		    try{
			    await ajoutHoraire(sessEmployeur, idtablehoraire, x.slice(0, 1), x.slice(1), jsonResultat[i]);
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
    const reqjson = req.body;
    var sessEmployeur = req.session.idgestion;

    var date = new Date(reqjson.horairedate);
    dateAjustee.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    var idtablehoraire = "" + sessEmployeur + "-" + date.toISOString().slice(0, 10); //Création de l'id de la table horaire

    try {
        const client = await pool.connect()
        const horaire = await client.query(`SELECT DISTINCT '${idTableHoraire}' AS IDTableHoraire, '${dateHoraire}' AS DateParam ,C.IDEmployeur,C.IDEmploye, C.JourSemaine, C.TypeQuart,c.Selection--,NBREmployes
        FROM(
	    SELECT IDEmploye,IDEmployeur,JourSemaine, TypeQuart,Selection,DateEmbauche
	    FROM (
		SELECT
		*,ROW_NUMBER()OVER(PARTITION BY A.IDEmploye ORDER BY A.JourSemaine ASC) AS MaxSem
		,ROW_NUMBER()OVER(PARTITION BY A.JourSemaine, A.TypeQuart ORDER BY A.TypeQuart ASC, A.JourSemaine ASC) AS Selection
		FROM(
			SELECT BQE.*, nbrQuartsmax,DateEmbauche ,ROW_NUMBER()OVER(PARTITION BY BQE.IDEmploye, BQE.JourSemaine ORDER BY BQE.TypeQuart ASC) AS MaxJOur
			FROM basequartsemploye BQE
			INNER JOIN baseemployes BE ON BE.IDEmploye=BQE.IDEmploye
				AND BE.IDEmployeur='${sessEmployeur}'
  				AND Disponibilite='1'
  				AND ParamType='1'
			LEFT JOIN Tableconges TC ON TC.IDEmploye=BQE.IDEmploye
				AND TC.JourSemaine=BQE.JourSemaine
				AND TC.TypeQuart=BQE.TypeQuart
				AND TC.DateConges='${dateHoraire}'
			WHERE TC.IDEmploye IS NULL
	    )A
	    WHERE MaxJour=1
	    )B
	    WHERE MaxSem<=nbrQuartsmax
	    ORDER BY B.DateEmbauche ASC, B.JourSemaine ASC, B.TypeQuart ASC
        )C
        INNER JOIN BaseQuartsEmployeur BQER ON BQER.IDEmployeur=C.IDEmployeur
		    AND BQER.IDTableHoraire='001'
		    AND BQER.TypeQuart=C.TypeQuart
		    AND BQER.JourSemaine=C.JourSemaine
		    AND C.Selection <= BQER.NBREmployes
        ;`);
            res.json(horaire);
            client.release();
          } catch (err) {
            console.error(err);
            res.send("Erreur appel client " + err);
          }
}

async function ajoutHoraire(sessEmployeur, idtablehoraire, quart, jour, nbemploye) {
    
    await Api
      .post('/basequartsemployeur')
      .send({idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: quart, joursemaine: jour, nbremployes: nbemploye});
}

module.exports = {
  ajouterHoraire ,
  genererHoraire
}	
