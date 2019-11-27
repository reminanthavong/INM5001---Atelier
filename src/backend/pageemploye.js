const session = require('express-session');
const bodyParser = require('body-parser')
var PostgREST = require('postgrest-client')
var Api = new PostgREST ('http://testpostgrest-calendrier.herokuapp.com')

const afficherDisponibilites  = async (req, res) => {
	  var utilisateur = req.session.username;
	  const rows = await getDisponibilites(utilisateur);
	  res.setHeader("content-type", "application/json")
	  res.send(JSON.stringify(rows))
}

const ajouterDisponibilites   = async (req, res) => {
	
	let result = {}
	var jours = ["1", "1", "1","2", "2", "2","3", "3", "3","4", "4", "4","5", "5", "5"];
	var quarts = ["J1", "N1", "S1","J2", "S2", "N2","J3", "S3", "N3","J4", "S4", "N4","J5", "S5", "N5"];
	var i = 0;
	const reqjson = req.body;
	var utilisateur = req.session.username;
	var gestionnaire = req.session.idgestion;
	var dispo = reqjson.dispo;
	try {
		await supprimerDispo(utilisateur);
		result.success = true;
	}catch (e) {
		  result.success = false;
	                     }
	
	while (i < jours.length) {
		var x = quarts[i];
		var y = jours[i];
		  try{
		  await ajoutDispo(gestionnaire, utilisateur, x.slice(0, 1), y, "0");		  
		  result.success = true;
		  }catch (e) {
		  result.success = false;
	                     }
	  
  		i++;	

		}
	
	i = 0;
	
	while (i < dispo.length) {
		try{
		  await patchDispo(gestionnaire, utilisateur, dispo[i].slice(0, 1), dispo[i].slice(1), "1");		  
		  result.success = true;
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
	 var utilisateur = req.session.username;
	var i = 0;
	while (i < dispo.length) {
		try{	
		  await ajoutConge(utilisateur, reqJson.dateconge, reqJson.dateconge.getDay(), reqJson.dispo[i]);		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
		  
	  }
  		i++;	

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

async function patchDispo(idemployeur, idemploye, typequart, joursemaine, disponibilite) {	
		await Api
			.patch('/basequartsemploye')
			.eq('idemploye', idemploye)
		        .eq('idemployeur', idemployeur)
		        .eq('typequart', typequart)
		        .eq('joursemaine', joursemaine)
			.send({idemployeur:idemployeur, idemploye: idemploye, idtablehoraire: '000', typequart: typequart, joursemaine: joursemaine, disponibilite: disponibilite, paramtype: '1'});	
	}

module.exports = {
		  afficherDisponibilites,
		  ajouterDisponibilites, 
		  ajouterConge
		}
