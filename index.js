const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000
const request = require('request');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


// Linker queries.js
const afficherhoraire = require('./afficherhoraire')
const login = require('./login')
const gestionemploye = require('./gestionemploye')
const gestionhoraire = require('./gestionhoraire')
const pageemploye = require('./pageemploye')

express()
  .use(express.static(path.join(__dirname, 'public')))
 .use(bodyParser.json())
.use(bodyParser.text())
.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/views/pages/login.html'));
})

// Verification key pour Loader.io PROD
.get('/loaderio-59933bf6aeb3d010d23fa39a006ec516', async (req, res) => {
      res.send('loaderio-59933bf6aeb3d010d23fa39a006ec516');
  })

// Verification key pour Loader.io TEST
.get('/loaderio-ea729398c3aaad4977cc2f95746edf2a', async (req, res) => {
      res.send('loaderio-ea729398c3aaad4977cc2f95746edf2a');
  })

// Fonction Login
.post('/auth', login.loginAPI) // Validation des entrez dans login.html
.get('/home', function(request, response) {
	// Si validation passe
	if (request.session.loggedin) { // Si 'True'
	const results = request.session; // Prendre les informations dans le JSON Session	
		response.render('pages/index',results); // Afficher index.ejs
	} else {
		response.send('Please login to view this page!'); // Sinon
	}
	response.end();
})
// Fonction AfficherHoraire
.get('/api/v1/semaines',afficherhoraire.fonctions1 )
.post('/api/v1/horaires',afficherhoraire.fonctions2 )
.get('/AffichageHoraire', async (req, res) => {
      res.sendFile(path.join(__dirname+'/views/pages/AffichageHoraire.html' /*, getHoraires */));
  })
.get('/AffichageHoraire', async (req, res) => {
if (req.session.typeutilisateur == 1){
      res.render('pages/AffichageHoraire');
	} else {
	  res.send('Vous devez être une Administrateur pour acceder à cette page!');
	}
  })
// Fonction GestionEmploye
.get('/GestionEmploye', async (req, res) => {
	if (req.session.typeutilisateur == 1){
      res.render('pages/gestionEmploye');
		} else {
	  res.send('Vous devez être une Administrateur pour acceder à cette page!');	
	}
  })

.get('/Employe',gestionemploye.afficherEmployes) 
.post('/Employe',gestionemploye.ajouterEmploye) 
.patch('/Employe',gestionemploye.modifierEmploye)
.post('/Disponibilite',gestionemploye.ajouterDisponibilite) 
.post('/Disponibilite2',gestionemploye.ajouterDisponibiliteV2)
.delete('/Employe',gestionemploye.enleverEmploye) 
.post('/Identification', gestionemploye.ajouterIdentification) 
.delete('/Identification', gestionemploye.supprimerIdentification)
.delete('/Disponibilite', gestionemploye.supprimerDisponibilite) 

// Fonction GestionHoraire
.get('/GestionHoraire', async (req, res) => {
	if (req.session.typeutilisateur == 1){
      res.render('pages/gestionHoraire');
		} else {
	  res.send('Vous devez être une Administrateur pour acceder à cette page!');	
	}
  })
//.get('/Horaire',gestionhoraire.afficherHoraire)
.post('/Horaire',gestionhoraire.ajouterHoraireV2 )
.delete('/Horaire',gestionhoraire.enleverHoraire )

// Fonction PageEmploye
.get('/PageEmploye', async (req, res) => {
	if (req.session.typeutilisateur == 0){
      res.render('pages/pageEmploye');
		} else {
	  res.send('Vous devez être un Employe pour acceder à cette page!');	
	}
  })
  .get('/DispoEmploye',pageemploye.afficherDisponibilites)
  .post('/DispoEmploye',pageemploye.ajouterDisponibilites)
  .delete('/DispoEmploye', pageemploye.supprimerDisponibilites)
  .post('/Conge', pageemploye.ajouterConge)

 .listen(PORT, () => console.log(`Listening on ${ PORT }`))
