"use strict";
const express = require('express');
const session = require('express-session');
const login = require('./src/backend/login')
const gestionemploye = require('./src/backend/gestionemploye')
const afficherhoraire = require('./src/backend/afficherhoraire')
const pageemploye = require('./src/backend/pageemploye')
const gestionhoraire = require('./src/backend/gestionhoraire')
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
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
router.get('/userStatus', login.userStatus)

// Fonction GestionEmploye
router.get('/Employe', gestionemploye.afficherEmployes)
router.post('/Employe', gestionemploye.ajouterEmploye)
router.patch('/Employe', gestionemploye.modifierEmploye)
router.delete('/Employe', gestionemploye.enleverEmploye)

// Fonction AfficherHoraire
router.get('choixHoraire', afficherhoraire.afficherChoixHoraire)
router.post('affichageHoraire',afficherhoraire.afficherHoraire)

// Fonction GestionHoraire

//router.get('/Horaire',gestionhoraire.afficherHoraire)
router.post('/Horaire',gestionhoraire.ajouterHoraire )
router.delete('/Horaire',gestionhoraire.enleverHoraire )

// Fonction PageEmploye
router.get('/DispoEmploye',pageemploye.afficherDisponibilites)
router.post('/DispoEmploye',pageemploye.ajouterDisponibilites)
router.post('/Conge', pageemploye.ajouterConge)

app.use(router)
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);
