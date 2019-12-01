const session = require('express-session');
const { Pool } = require('pg');
var PostgREST = require('postgrest-client');
var Api = new PostgREST ('http://testpostgrest-calendrier.herokuapp.com');
var sess;


const ajouterHoraire   = async (req, res) => {
	  let result = {}
	  const reqJson = req.body;
	  var sessEmployeur = req.session.username;
	  console.log(reqJson);
	  try{	
      await ajoutHoraire(sessEmployeur, reqJson.horairedate, reqJson.lundijour, reqJson.lundisoir, reqJson.lundinuit, reqJson.mardijour, reqJson.mardisoir, reqJson.mardinuit, reqJson.mercredijour, 
        reqJson.mercredisoir, reqJson.mercredinuit, reqJson.jeudijour, reqJson.jeudisoir, reqJson.jeudinuit, reqJson.vendredijour, reqJson.vendredisoir, reqJson.vendredinuit);		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

const ajouterHoraireV2 = async(req, res) => {



	let result = {}
	var quarts = ["J1", "N1", "S1","J2", "S2", "N2","J3", "S3", "N3","J4", "S4", "N4","J5", "S5", "N5",];
	const reqjson = req.body;
	
	var sessEmployeur = req.session.username;
	var i = 0;
	//console.log(reqjson[quarts[0]]);
	while (i < jours.length) {
		var x = quarts[i];
		  try{
			if (reqjson[x] != null){
				//console.log("True");
			    await ajoutDispo(sessEmployeur, reqjson.horairedate, x.slice(0, 1), x.slice(1), reqjson[x]);		  
		  result.success = true;
		}
		  
		else{
			//console.log("Not True");
			await ajoutDispo(sessEmployeur, reqjson.horairedate, x.slice(0, 1), x.slice(1),"0");		  
		  result.success = true; 
		} 
			  
		  }catch (e) {
		  result.success = false;
	  }
	  
  		i++;	

		}
	
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))	  
}

const enleverHoraire   = async (req, res) => {
 res.end();
}

async function ajoutHoraire(sessEmployeur, horairedate, lundijour, lundisoir, lundinuit, mardijour, mardisoir, mardinuit, mercredijour, 
  mercredisoir, mercredinuit, jeudijour, jeudisoir, jeudinuit, vendredijour, vendredisoir, vendredinuit ) {

    /* Retirer temporairement pour tester
    var idtablehoraire = sessEmployeur + '' + horairedate;
    */
    await Api
      .post('/basequartsemployeur')
      .send({idemployeur: 'Gestion8768', idtablehoraire: '002', typequart: 'J', joursemaine: '1', nbremployes: '1'});

      /*retirer temporairement pour tester
      .send(
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'J', joursemaine: '1', Nbemployes: lundijour}
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'S', joursemaine: '1', Nbemployes: lundisoir},
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'N', joursemaine: '1', Nbemployes: lundinuit},
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'J', joursemaine: '2', Nbemployes: mardijour},
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'S', joursemaine: '2', Nbemployes: mardisoir},
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'N', joursemaine: '2', Nbemployes: mardinuit},
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'J', joursemaine: '3', Nbemployes: mercredijour},
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'S', joursemaine: '3', Nbemployes: mercredisoir},
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'N', joursemaine: '3', Nbemployes: mercredinuit},
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'J', joursemaine: '4', Nbemployes: jeudijour},
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'S', joursemaine: '4', Nbemployes: jeudisoir},
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'N', joursemaine: '4', Nbemployes: jeudinuit},
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'J', joursemaine: '5', Nbemployes: vendredijour},
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'S', joursemaine: '5', Nbemployes: vendredisoir},
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'N', joursemaine: '5', Nbemployes: vendredinuit}
            );*/ 
}

module.exports = {
  ajouterHoraire ,	
  enleverHoraire,
  ajouterHoraireV2
}	

