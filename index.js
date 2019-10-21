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
// Fonction Login
.post('/auth', login.loginAPI)
.get('/home', function(request, response) {
	
	if (request.session.loggedin) {
		response.render('pages/index');
		//response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
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
      res.sendFile(path.join(__dirname+'/views/pages/AffichageHoraire.html' /*, getHoraires */));
  })
// Fonction GestionEmploye
.get('/GestionEmploye', async (req, res) => {
      res.sendFile(path.join(__dirname+'pages/gestionEmploye'));
  })
.get('/Employe',gestionemploye.fafficherEmployes)
.post('/Employe',gestionemploye.fajouterEmploye )
.delete('/Employe',gestionemploye.fenleverEmploye )
// Fonction GestionHoraire
.get('/GestionEmploye', async (req, res) => {
      res.sendFile(path.join(__dirname+'pages/gestionHoraire'));
  })
.get('/Employe',gestionhoraire.afficherHoraire)
.post('/Employe',gestionhoraire.ajouterHoraire )
.delete('/Employe',gestionhoraire.enleverHoraire )

 .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
