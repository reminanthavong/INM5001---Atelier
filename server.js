"use strict";
const express = require('express');
const session = require('express-session');
const login = require('./src/login')
const gestionemploye = require('./src/gestionemploye')
const afficherhoraire = require('./src/afficherhoraire')
const pageemploye = require('./src/pageemploye')
const gestionhoraire = require('./src/gestionhoraire')
const config = require('./src/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

router.post('/login', login.loginAPI)

// Fonction GestionEmploye
router.get('/Employe', gestionemploye.afficherEmployes)
router.post('/Employe', gestionemploye.ajouterEmploye)
router.patch('/Employe', gestionemploye.modifierEmploye)
router.delete('/Employe', gestionemploye.enleverEmploye)

// Fonction AfficherHoraire
router.get('/api/v1/semaines',afficherhoraire.fonctions1 )
router.post('/api/v1/horaires',afficherhoraire.fonctions2 )

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
