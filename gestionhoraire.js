const session = require('express-session');
const { Pool } = require('pg');
var PostgREST = require('postgrest-client')
var Api = new PostgREST ('http://testpostgrest-calendrier.herokuapp.com')
var sess;
   
const ajouterHoraire   = async (req, res) => {
	  let result = {}
	  const reqJson = req.body;
	  var sessEmployeur = req.session.username;
	  try{	
      await ajoutEmploye(sessEmployeur, reqJson.horairedate, reqJson.lundijour, reqJson.lundisoir, reqJson.lundinuit, reqJson.mardijour, reqJson.mardisoir, reqJson.mardinuit, reqJson.mercredijour, 
        reqJson.mercredisoir, reqJson.mercredinuit, reqJson.jeudijour, reqJson.jeudisoir, reqJson.jeudinuit, reqJson.vendredijour, reqJson.vendredisoir, reqJson.vendredinuit);		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

const enleverHoraire   = async (req, res) => {
 res.end();
}

async function ajoutHoraire(sessEmployeur, horairedate, lundijour, lundisoir, lundinuit, mardijour, mardisoir, mardinuit, mercredijour, 
  mercredisoir, mercredinuit, jeudijour, jeudisoir, jeudinuit, vendredijour, vendredisoir, vendredinuit ) {

    var idtablehoraire = sessEmployeur + '' + horairedate;
    await Api
      .post('/basequartsemploye')
      .send({idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'J', joursemaine: '1', Nbemployes: lundijour},
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
            {idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'N', joursemaine: '5', Nbemployes: vendredinuit}) 
}

module.exports = {
  afficherHoraire,
  ajouterHoraire ,
  enleverHoraire 
}

