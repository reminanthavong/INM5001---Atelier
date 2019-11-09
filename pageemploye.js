const { Pool } = require('pg');
const session = require('express-session');
const bodyParser = require('body-parser')
var PostgREST = require('postgrest-client')
var Api = new PostgREST ('http://testpostgrest-calendrier.herokuapp.com')

const pageWeb  = async (req, res) => {
response.sendFile(path.join(__dirname + '/views/pages/pageEmploye.ejs'));
}

const afficherDisponibilites  = async (req, res) => {
	  var utilisateur = req.session.username;
	  const rows = await getDisponibilites(utilisateur);
	  res.setHeader("content-type", "application/json")
	  res.send(JSON.stringify(rows))
}

const ajouterDisponibilites   = async (req, res) => {
	 let result = {}
	 const reqjson = req.body;
	 var utilisateur = req.session.username;
	 var gestionnaire = req.session.idgestion;
	 console.log(reqjson);
	 console.log(utilisateur);
	 console.log(gestionnaire);
	 try{	
		  await ajoutDispo(utilisateur, reqjson.typequart, reqjson.joursemaine, reqjson.dispo, gestionnaire);		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

const ajouterConge = async (req, res) => {
	 let result = {}
	 const reqJson = req.body;
	 console.log(reqJson);
	 var utilisateur = req.session.username;
	 try{	
		  await ajoutConge(utilisateur, reqJson.dateconges, reqJson.joursemaine, reqJson.typequart);		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
		  console.log(e);
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

const supprimerDisponibilites   = async (req, res) => {
	  let result = {}
	  try{	
		  var utilisateur = req.session.username;
		  await supprimerDispo(utilisateur);
		  result.success = true;		
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }	  
}

async function getDisponibilites(utilisateur) {
	return await Api.get('/basequartsemploye').eq('idemploye', utilisateur)
}

async function ajoutDispo(utilisateur, typequart, joursemaine, disponibilite, gestionnaire) {		
	await Api
			.post('/basequartsemploye')
			.send({idemployeur: gestionnaire, idemploye:utilisateur, idtablehoraire: '000', typequart: typequart, joursemaine: joursemaine, disponibilite: disponibilite, paramtype: '1'})
}

async function ajoutConge(utilisateur, dateconges, joursemaine, typequart){
	await Api
		.post('/tableconges')
		.send({idemploye: utilisateur, dateconges: dateconges, joursemaine: joursemaine, typequart: typequart});
}

async function supprimerDispo(utilisateur) {
	await Api
			.delete('/basequartsemploye')
			.eq('idemploye', utilisateur)
			.eq('paramtype', '1')
}

module.exports = {
		  pageWeb,
		  afficherDisponibilites,
		  ajouterDisponibilites, 
		  ajouterConge,
		  supprimerDisponibilites
		}
