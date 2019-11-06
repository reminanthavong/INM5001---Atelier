const { Pool } = require('pg');
const session = require('express-session');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const pageWeb  = async (req, res) => {
response.sendFile(path.join(__dirname + '/views/pages/pageEmploye.ejs'));
}

const afficherDisponibilites  = async (req, res) => {
	  var utilisateur = req.session.username;
	  const rows = await getDisponibilites(utilisateur);
	  res.setHeader("content-type", "application/json")
	  res.send(JSON.stringify(rows))
}

const modifierDisponibilites   = async (req, res) => {
	 let result = {}
	 const reqjson = req.body;
	 var utilisateur = req.session.username;
	 try{	
		  await modifierDispo(utilisateur, reqjson.typequart, reqjson.joursemaine, reqjson.dispo);		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

const ajouterConge = async (req, res) => {
	 let result = {}
	 const reqJson = req.body;
	 console.log(reqJson);
	 var utilisateur = req.session.username;
	 try{	
		  await ajoutConge(utilisateur, reqJson.dateconges, reqJson.joursemaine, reqJson.typequart);		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
		  console.log(e);
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

async function getDisponibilites(utilisateur) {
	try {
		const client = await pool.connect();
		const results = await client.query('select TypeQuart, JourSemaine, Disponibilite from BaseQuartsEmploye where IDEmploye = $1 and paramtype = $2',[utilisateur, '1'])
		client.release();
		return results.rows
	} catch(e) {
		console.error(e);
		return [];
	}
}

async function modifierDispo(utilisateur, typequart, joursemaine, disponibilite) {		
	try {
		const client = await pool.connect();
		await pool.query('update baseQuartsEmploye set disponibilite = $1 where idemploye = $2 and typequart = $3 and joursemaine = $4', [disponibilite, utilisateur, typequart, joursemaine]);
		client.release(); 
		return true;
	} catch(e){
		return false;
	}		
}

async function ajoutConge(utilisateur, dateconges, joursemaine, typequart){
	try {
		const client = await pool.connect();
		await client.query('insert into tableconges(idemploye, dateconges, joursemaine, typequart) values ($1, $2, $3, $4)', [utilisateur, dateconges, joursemaine, typequart]);
		client.release(); 
		return true;
	} catch(e){
		return false;
	}
}

module.exports = {
		  pageWeb,
		  afficherDisponibilites,
		  modifierDisponibilites, 
		  ajouterConge
		}
