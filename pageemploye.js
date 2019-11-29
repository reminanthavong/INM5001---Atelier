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
	  console.log(rows);
	  res.setHeader("content-type", "application/json")
	  res.send(JSON.stringify(rows))
}

const ajouterDisponibilites   = async (req, res) => {
	
	let result = {}
	var jours = ["1", "1", "1","2", "2", "2","3", "3", "3","4", "4", "4","5", "5", "5",];
	var quarts = ["J1", "N1", "S1","J2", "S2", "N2","J3", "S3", "N3","J4", "S4", "N4","J5", "S5", "N5",];
	const reqjson = req.body;
	console.log(reqjson);
	var utilisateur = req.session.username;
	var gestionnaire = req.session.idgestion;
	var i = 0;
	//console.log(reqjson[quarts[0]]);
	while (i < jours.length) {
		var x = quarts[i];
		var y = jours[i];
  		//console.log(reqjson[x]);
		//console.log(sessEmployeur);
		//console.log(reqjson.idemploye);
		//console.log(x);
		//console.log(y);
		//console.log(xx);
	
		  try{
			if (reqjson[x]){
				console.log("True");
			    await ajoutDispo(gestionnaire, utilisateur, x.slice(0, 1), y, "1");		  
		  result.success = true;
		}
		  
		else{
			console.log("Not True");
			await ajoutDispo(gestionnaire, utilisateur, x.slice(0, 1), y, "0");		  
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

async function ajoutDispo(gestionnaire, utilisateur, typequart, joursemaine, disponibilite) {		
	await Api
			.post('/basequartsemploye')
			.send({idemployeur: gestionnaire, idemploye: utilisateur, idtablehoraire: '000', typequart: typequart, joursemaine: joursemaine, disponibilite: disponibilite, paramtype: '1'})
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
