const { Pool } = require('pg');
const session = require('express-session');
const bodyParser = require('body-parser')
var PostgREST = require('postgrest-client')
var Api = new PostgREST ('http://testpostgrest-calendrier.herokuapp.com')

const fpageWeb  = async (req, res) => {
response.sendFile(path.join(__dirname + '/views/pages/gestionEmploye.ejs'));
}

const afficherEmployes  = async (req, res) => {
	  var sessEmployeur = req.session.username;
	  const rows = await getEmployes(sessEmployeur);
	  res.setHeader("content-type", "application/json")
	  res.send(JSON.stringify(rows))
}

const ajouterEmploye   = async (req, res) => {
	  let result = {}
	  const reqJson = req.body;
	  var sessEmployeur = req.session.username;
	  try{	
		  await ajoutEmploye(sessEmployeur, reqJson.idemploye, reqJson.nomemploye, reqJson.prenomemploye, reqJson.nbrquartsmax, reqJson.dateembauche);		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

const ajouterIdentification = async (req, res) => {
	  let result = {}
	  const reqJson = req.body;
	  try{		  
		  await ajoutIdentification(reqJson.idutilisateur, reqJson.motdepasse)
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

const enleverEmploye   = async (req, res) => {
	  let result = {}
	  try{	
		  const reqJson = req.body;
		  console.log(reqJson);
		  var sessEmployeur = req.session.username;
		  await deleteEmploye(reqJson.idemploye, sessEmployeur);
		  result.success = true;		
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }	  
}

const ajouterDisponibilite = async(req, res) => {
	let result = {}
	const reqjson = req.body;
	console.log(reqjson);
	var sessEmployeur = req.session.username;
	try{	
		  await ajoutDispo(sessEmployeur, reqjson.idemploye, reqjson.typequart, reqjson.joursemaine, reqjson.dispo);		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

const ajouterDisponibiliteV2 = async(req, res) => {
	let result = {}
	const reqjson = req.body;
	//console.log(reqjson);
	while (i > reqjson.length){
	
	console.log(reqjson[i]);
	i++
	}
	var sessEmployeur = req.session.username;
	try{	
		  await ajoutDispo(sessEmployeur, reqjson.idemploye, reqjson.typequart, reqjson.joursemaine, reqjson.dispo);		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

const supprimerDisponibilite   = async (req, res) => {
	  let result = {}
	  const reqJson = req.body;
	  try{	
		  await supprimerDispo(reqJson.idemploye);
		  result.success = true;		
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }	  
}

const supprimerIdentification   = async (req, res) => {
	  let result = {}
	  const reqJson = req.body;
	  try{	
		  await suppressionIdentification(reqJson.idutilisateur);
		  result.success = true;		
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }	  
}


	async function ajoutEmploye(idemployeur, idemploye, nomemploye, prenomemploye, nbrquartsmax, dateembauche) {	
		await Api
			.post('/baseemployes')
			.send({idemployeur:idemployeur, idemploye: idemploye, nomemploye: nomemploye, prenomemploye: prenomemploye, nbrquartsmax: nbrquartsmax, dateembauche: dateembauche});	
	}
	
	async function ajoutIdentification(idemploye, motdepasse){
		await Api
		.post('/baseidentification')
		.send({idutilisateur: idemploye, motdepasse: motdepasse, typeutilisateur: '0'});		
	}

	async function getEmployes(idemployeur) {
		return await Api.get('/baseemployes').eq('idemployeur', idemployeur);
	}

	async function deleteEmploye(idemploye, gestionnaire) {
		await Api
		.delete('/baseemployes')
		.eq('idemploye', idemploye)
		.eq('idemployeur', gestionnaire);
	}
	
	async function ajoutDispo(idemployeur, idemploye, typequart, joursemaine, disponibilite) {		
		await Api
		.post('/basequartsemploye')
		.send({idemployeur:idemployeur, idemploye: idemploye, idtablehoraire: '000', typequart: typequart, joursemaine: joursemaine, disponibilite: disponibilite, paramtype: '1'});		
	}
	
	async function supprimerDispo(idemploye){
		await Api
		.delete('/basequartsemploye')
		.eq('idemploye', idemploye)
		.eq('paramtype', '1');
	}
	
	async function ajoutIdentification(idutilisateur, motdepasse){
		await Api
		.post('/baseidentification')
		.send({idutilisateur: idutilisateur, motdepasse: motdepasse, typeutilisateur: '0'});
	}
	
	async function suppressionIdentification(idutilisateur){
		await Api
		.delete('/baseidentification')
		.eq('idutilisateur', idutilisateur);
	}
   
  module.exports = {
  fpageWeb,
  afficherEmployes,
  ajouterEmploye,
  ajouterIdentification,
  enleverEmploye,
  ajouterDisponibilite,
  supprimerDisponibilite,
  supprimerIdentification,
  ajouterDisponibiliteV2

}
