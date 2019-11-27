const session = require('express-session');
const { Pool } = require('pg');
var PostgREST = require('postgrest-client')
var Api = new PostgREST ('http://testpostgrest-calendrier.herokuapp.com')
var sess;

const fpageWeb  = async (req, res) => {
  response.sendFile(path.join(__dirname + '/views/pages/gestionHoraire.ejs'));
  }

const ajouterHoraire   = async (req, res) => {
	  let result = {}
	  const reqJson = req.body;
	  var sessEmployeur = req.session.username;
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

const enleverHoraire   = async (req, res) => {
 res.end();
}

async function ajoutHoraire(sessEmployeur, horairedate, lundijour, lundisoir, lundinuit, mardijour, mardisoir, mardinuit, mercredijour, 
  mercredisoir, mercredinuit, jeudijour, jeudisoir, jeudinuit, vendredijour, vendredisoir, vendredinuit ) {

    var idtablehoraire = sessEmployeur + '' + horairedate;
    await Api
      .post('/basequartsemployeur')
      .send({idemployeur: sessEmployeur, idtablehoraire: idtablehoraire, typequart: 'J', joursemaine: '1', Nbemployes: lundijour}); 
}

module.exports = {
  ajouterHoraire ,	
  enleverHoraire
}	

