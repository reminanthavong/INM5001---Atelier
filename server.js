"use strict";
const express = require('express');
const session = require('express-session');
const login = require('./src/backend/login')
const gestionEmploye = require('./src/backend/gestionemploye')
const afficherHoraire = require('./src/backend/afficherhoraire')
const zoneEmploye = require('./src/backend/zoneemploye')
const gestionHoraire = require('./src/backend/gestionhoraire')
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

var path = require('path');
var serveStatic = require('serve-static');

app.use(serveStatic(__dirname + "/dist"));

//CORS middleware
const enableCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
app.use(enableCrossDomain)

// Fonction Login
router.post('/login', login.loginAPI)

// Fonction gestionEmploye
router.get('/Employe', gestionEmploye.afficherEmployes)
router.post('/Employe', gestionEmploye.ajouterEmploye)
router.patch('/Employe', gestionEmploye.modifierEmploye)
router.delete('/Employe', gestionEmploye.enleverEmploye)

// Fonction afficherHoraire
router.get('/choixHoraire', afficherHoraire.afficherChoixHoraire)
router.post('/affichageHoraire',afficherHoraire.afficherHoraire)
router.post('/exigencesEmployeur', afficherHoraire.afficherExigencesEmployeur)
router.get('/exigencesEmployeur', afficherHoraire.afficherExigencesEmployeur)

// Fonction gestionHoraire
router.post('/Horaire', gestionHoraire.ajouterQuarts)
router.post('/creationHoraire', gestionHoraire.genererHoraire)

// Fonction pageEmploye
router.get('/DispoEmploye',zoneEmploye.afficherDisponibilites)
router.post('/DispoEmploye',zoneEmploye.ajouterDisponibilites)
router.post('/Conge', zoneEmploye.ajouterConge)

app.use(router)
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);
