const session = require('express-session');
const bodyParser = require('body-parser')
var PostgREST = require('postgrest-client')
var Api = new PostgREST ('http://testpostgrest-calendrier.herokuapp.com')

function creerIdEmploye(nom, prenom) {
                    let nomUn = nom.charAt(0)
                    let prenomQuatre = prenom.substring(0, 4)
                    let ID = nomUn.concat(prenomQuatre)
                    return ID
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
	  var ID = creerIdEmploye(reqJson.nomemploye.toUpperCase(), reqJson.prenomemploye.toUpperCase());
	  
	  var sessEmployeur = req.session.username;
	  //console.log(reqJson.dispo);
	  //console.log(reqJson.dispo[0]);
	  try{	
		  await ajoutEmploye(sessEmployeur, ID, reqJson.nomemploye.toUpperCase(), reqJson.prenomemploye.toUpperCase(), reqJson.nbrquartsmax, reqJson.dateembauche);		  
		  await ajoutIdentification(ID, reqJson.motdepasse);
		  initDisponibilite(ID,sessEmployeur,reqJson.dispo);
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
		  await suppressionIdentification(reqJson.idemploye);
		  await supprimerDispo(reqJson.idemploye);
		  result.success = true;		
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }	  
}


async function initDisponibilite (ID,sessEmployeur, dispo) {

	let result = {}
	var jours = ["1", "1", "1","2", "2", "2","3", "3", "3","4", "4", "4","5", "5", "5",];
	var quarts = ["J1", "N1", "S1","J2", "S2", "N2","J3", "S3", "N3","J4", "S4", "N4","J5", "S5", "N5",];
	var i = 0;
	while (i < jours.length) {
		var x = quarts[i];
		var y = jours[i];
		  try{
		  await ajoutDispo(sessEmployeur, ID, x.slice(0, 1), y, "0");		  
		  result.success = true;
		  }catch (e) {
		  result.success = false;
	                     }
	  
  		i++;	

		}
	i = 0;
	while (i < dispo.length) {
		try{
		  await patchDispo(sessEmployeur, ID, dispo[i].slice(0, 1), dispo[i].slice(1), "1");		  
		  result.success = true;
		  }catch (e) {
		  result.success = false;
	                     }
  		i++;	

		}
	
		 return result.succes	  
}


const modifierEmploye   = async (req, res) => {
	  let result = {}
	  const reqJson = req.body;
	  var sessEmployeur = req.session.username;
	  try{	
		  await patchEmploye(sessEmployeur, reqJson.idemploye, reqJson.nomemploye, reqJson.prenomemploye, reqJson.nbrquartsmax, reqJson.dateembauche);		  
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

	async function patchEmploye(idemployeur, idemploye, nomemploye, prenomemploye, nbrquartsmax, dateembauche) {	
		await Api
			.patch('/baseemployes')
			.eq('idemploye', idemploye)
		        .eq('idemployeur', idemployeur)
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
	
	async function patchDispo(idemployeur, idemploye, typequart, joursemaine, disponibilite) {	
		await Api
			.patch('/basequartsemploye')
			.eq('idemploye', idemploye)
		        .eq('idemployeur', idemployeur)
		        .eq('typequart', typequart)
		        .eq('joursemaine', joursemaine)
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
  afficherEmployes,
  ajouterEmploye,
  enleverEmploye,
  modifierEmploye,
	  
  creerIdEmploye,
  afficherEmployes,
  getEmployes

}
