const session = require('express-session');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

var sess;

const pageWeb  = async (req, res) => {
response.sendFile(path.join(__dirname + '/views/pages/gestionHoraire.ejs'));
}

const afficherHoraire  = async (req, res) => {
sessEmployeur = req.session.username;
console.log(sessEmployeur);
res.end();
}
   
const ajouterHoraire   = async (req, res) => {
  res.end();
}

const enleverHoraire   = async (req, res) => {
 res.end();
}
module.exports = {
  pageWeb,
  afficherHoraire,
  ajouterHoraire ,
  enleverHoraire 
}