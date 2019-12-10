// Module ou Variable requis pour le fonctionnement des fonctions
//var data = require('request');
//const session = require('express-session');	
//const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const config = require('../config');
var JSAlert = require("js-alert");
var PostgREST = require('postgrest-client')
var Api = new PostgREST ('http://testpostgrest-calendrier.herokuapp.com')

const userStatus = async (request, response) => {
	console.log(request.session.typeutilisateur)
        response.send(request.session.typeutilisateur)	
}


// Fonction pour verifier si les valeurs entrez dans le formulaire login est valides.
const loginAPI = async (request, response) => {	// Nom de la fonction
	const username = request.body.username; // Input username dans login.html
	const password = request.body.password; // Input password dans login.html
	
	 try {
      const checkUsername = await verifierUser(username); // Allez chercher le JSON dans la fonction verifierUser
		 
		 // Si le JSON n'est pas vide et le mot de passe est valide
      if ( checkUsername.length > 0 && checkUsername[0].motdepasse == password ) {
	                      if (checkUsername[0].typeutilisateur == 1){
			        // Ajout dans JSON Session
	      			request.session.loggedin = true; // Utilisateur est logger
				request.session.username = username; // Valeur utilisateur
	      			request.session.idgestion = username; // Valeur IDgestion
	                        request.session.nom = username; // Valeur nom de l'employe
	                        request.session.prenom = 'Administrateur'; // Valeur prenom de l'employe
	                        request.session.typeutilisateur = checkUsername[0].typeutilisateur; // Si utilisateur est admin
				let token = jwt.sign({ id: username }, config.secret, { expiresIn: 86400 });
				     
                                response.status(200).send({ auth: true, token: token, user: true});
			      }  else {
	                        const infoUser = await getIDgestion(username); // Allez chercher les informations du utilisateur   
				// Ajout dans JSON Session
	      			request.session.loggedin = true; // Utilisateur est logger
				request.session.username = username; // Valeur utilisateur
	      			request.session.idgestion = infoUser[0].idemployeur; // Valeur IDgestion
	                        request.session.nom = infoUser[0].nomemploye; // Valeur nom de l'employe
	                        request.session.prenom = infoUser[0].prenomemploye; // Valeur prenom de l'employe
	                        request.session.typeutilisateur = checkUsername[0].typeutilisateur; // Si utilisateur est admin
				let token = jwt.sign({ id: username }, config.secret, { expiresIn: 86400});
				     
                                response.status(200).send({ auth: true, token: token, user: false});
			      }
	      
			} else {
				request.session.loggedin = false;
              
				
				response.redirect('/login?error=' + encodeURIComponent('Incorrect_Credential'));
				
			}			
			//response.end(); // Fin de la fonction
    } catch (err) { // Si erreur essaye de l'attraper
      console.error(err);
      response.send(err);
    }
	
}

// Fonction qui fait une requete vers API pour chercher utlisateur
async function verifierUser(user) {
 return await Api.get('/baseidentification').eq('idutilisateur', user)
}

// Fonction qui fait une requete vers API pour chercher IDgestion
async function getIDgestion(user) {
	const checkUsername = await verifierUser(user);
	var typeUtilisateur = null;
	// Verifie si utilisateur existe et allez chercher typeUtilisateur
	if ( checkUsername.length > 0 ){
		
	typeUtilisateur = checkUsername[0].typeutilisateur
		
	}
	// Sinon
	else {
	
		return null
	}
	// Si utilisateur est un gestionnaire, alors son IDgestion = Utilisateur dans table BaseIdentification
	if (typeUtilisateur == 1){
	
		return user
		}
	else {  //Sinon faire request table baseEmployes
		return await Api.get('/baseemployes').eq('idemploye', user)
		
		}
	
}

// Pour lier a index.js
module.exports = {
  loginAPI,
  userStatus
}
