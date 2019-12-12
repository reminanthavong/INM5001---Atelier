// login.js
const jwt = require('jsonwebtoken');
const config = require('../config');
var postgREST = require('postgrest-client');
var api = new postgREST ('http://testpostgrest-calendrier.herokuapp.com');


// Fonction pour verifier si les valeurs entrez dans le formulaire login est valides.
const loginAPI = async (request, response) => {	
	const username = request.body.username; 
	const password = request.body.password; 
	
	 try {
      const checkUsername = await verifierUser(username); 
		 
		 
      if ( checkUsername.length > 0 && checkUsername[0].motdepasse == password ) {
	                      if (checkUsername[0].typeutilisateur == 1){
		
				request.session.username = username;
	      			request.session.idgestion = username; 
	                        request.session.nom = username; 
	                        request.session.prenom = 'Administrateur'; 
	                        request.session.admin = 'true'; 
				request.session.user = 'false'; 
				let token = jwt.sign({ id: username }, config.secret, { expiresIn: 86400 });
				     
                                response.status(200).send({ auth: true, token: token, user: request.session});
			      }  else {
	                        const infoUser = await getIDgestion(username); 
				
				request.session.username = username; 
	      			request.session.idgestion = infoUser[0].idemployeur; 
	                        request.session.nom = infoUser[0].nomemploye; 
	                        request.session.prenom = infoUser[0].prenomemploye; 

	                        request.session.admin = 'false'; 
				request.session.user = 'true';    
				let token = jwt.sign({ id: username }, config.secret, { expiresIn: 86400});
				     
                                response.status(200).send({ auth: true, token: token, user: request.session});
			      }
	      
			} else {
				request.session.loggedin = false;
              
				
				response.redirect('/login?error=' + encodeURIComponent('Incorrect_Credential'));
				
			}			
			
    } catch (err) { 
      console.error(err);
      response.send(err);
    }
	
}

// Fonction qui fait une requete vers API pour chercher utlisateur
async function verifierUser(user) {
 return await api.get('/baseidentification').eq('idutilisateur', user)
}

// Fonction qui fait une requete vers API pour chercher IDgestion
async function getIDgestion(user) {
	const checkUsername = await verifierUser(user);
	var typeUtilisateur = null;
	if ( checkUsername.length > 0 ){
		
	typeUtilisateur = checkUsername[0].typeutilisateur
		
	}
	
	else {
	
		return null
	}
	
	if (typeUtilisateur == 1){
	
		return user
		}
	else {  
		return await api.get('/baseemployes').eq('idemploye', user)
		
		}
	
}


module.exports = {
  loginAPI,
}
