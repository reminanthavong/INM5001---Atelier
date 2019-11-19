const session = require('express-session');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

var sess;


const afficherHoraire  = async (req, res) => {
sessEmployeur = req.session.username;
console.log(sessEmployeur);
res.end();
}
   
const ajouterHoraire   = async (req, res) => {
	  let result = {}
	  const reqJson = req.body;
	  var sessEmployeur = req.session.username;
	  try{	
      await ajoutEmploye(sessEmployeur, reqJson.lundijour, reqJson.lundisoir, reqJson.lundinuit, reqJson.lundidate, reqJson.mardijour, reqJson.mardisoir, reqJson.mardinuit, reqJson.mardidate, reqJson.mercredijour, 
        reqJson.mercredisoir, reqJson.mercredinuit, reqJson.mercredidate, reqJson.jeudijour, reqJson.jeudisoir, reqJson.jeudinuit, reqJson.jeudidate, reqJson.vendredijour, reqJson.vendredisoir, reqJson.vendredinuit, reqJson.vendredidate );		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

const enleverHoraire   = async (req, res) => {
 res.end();
}


async function ajoutHoraire(sessEmployeur, lundijour, lundisoir, lundinuit, lundidate, mardijour, mardisoir, mardinuit, mardidate, mercredijour, 
  mercredisoir, mercredinuit, mercredidate, jeudijour, jeudisoir, jeudinuit, jeudidate, vendredijour, vendredisoir, vendredinuit, vendredidate ) {

  try {
        const client = await pool.connect();
        client.release(); 
    } catch(e){
        return false;
  }
}

module.exports = {
  afficherHoraire,
  ajouterHoraire ,
  enleverHoraire 
}

