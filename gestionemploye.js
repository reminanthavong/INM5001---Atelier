const { Pool } = require('pg');
const session = require('express-session');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const fpageWeb  = async (req, res) => {
response.sendFile(path.join(__dirname + '/views/pages/gestionEmploye.ejs'));
}

const fafficherEmployes  = async (req, res) => {
	  var sessEmployeur = req.session.username;
	  const rows = await afficherEmployes(sessEmployeur);
	  res.setHeader("content-type", "application/json")
	  res.send(JSON.stringify(rows))
}

const fajouterEmploye   = async (req, res) => {
	  let result = {}
	  const reqJson = req.body;
	  var sessEmployeur = req.session.username;
	  try{	
		  await ajoutEmploye(sessEmployeur, reqJson.idemploye, reqJson.nomemploye, reqJson.prenomemploye, reqJson.nbrheuresmax, reqJson.dateembauche, reqJson.motdepasse);		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

const fenleverEmploye   = async (req, res) => {
	  let result = {}
	  try{	
		  const reqJson = req.body;
		  var sessEmployeur = req.session.username;
		  await deleteEmploye(reqJson.idemploye);
		  result.success = true;		
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }	  
}

const fajouterDisponibilite = async(req, res) => {
	let result = {}
	const reqjson = req.body;
	var sessEmployeur = req.session.username;
	try{	
		  await ajoutDispo(sessEmployeur, reqjson.idemploye, reqjson.typequart, reqjson.joursemaine, reqjson.dispo);		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

const fmodifierEmploye = async (req, res) => {	
	console.log("fonction fmodifierEmploye");
	  let result = {}
	  const reqJson = req.body;
	  var sessEmployeur = req.session.username;
	  var nbHeure = parseInt(reqJson.nbrheuresmax);
	  try{	
		  await modifierEmploye(reqJson.idemploye, reqJson.nomemploye, reqJson.prenomemploye, nbHeure);		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

	async function ajoutEmploye(idemployeur, idemploye, nomemploye, prenomemploye, nbrheuresmax, dateembauche, motdepasse) {	
		console.log(nomemploye)
		console.log(dateembauche)
		
		try {
			const client = await pool.connect();
			await client.query('INSERT INTO BaseEmployes(idemployeur, idemploye, nomemploye, prenomemploye, nbrheuresmax, dateembauche) values ($1, $2, $3, $4, $5, $6)', [idemployeur, idemploye, nomemploye, prenomemploye, nbrheuresmax, dateembauche]);
			await client.query('insert into BaseIdentification values ($1, $2, $3)', [idemploye, motdepasse, '0'])
			client.release(); 
			return true;
		} catch(e){
			return false;
		}		
	}

	async function afficherEmployes(idemployeur) {
		try {
			const client = await pool.connect();
			const results = await client.query('select IDEmploye, NomEmploye, PrenomEmploye, NBRHeuresMax, DateEmbauche from BaseEmployes where IDEmployeur = $1',[idemployeur])
			client.release();
			return results.rows
		} catch(e) {
			console.error(e);
			return [];
		}
	}

	async function deleteEmploye(idemploye) {
		try {
			const client = await pool.connect();
			await client.query('delete from BaseEmployes where IDEmploye = $1', [idemploye])
			await client.query('delete from BaseIdentification where idutilisateur = $1', [idemploye])
			await client.query('update baseQuartsEmploye set disponibilite = $1 where idemploye = $2', ['0', idemploye]);
			client.release();
			return true
		} catch(e) {
			return false;
			console.error(e);
		}
	}
	
	async function ajoutDispo(idemployeur, idemploye, typequart, joursemaine, disponibilite) {		
		try {
			const client = await pool.connect();
			await pool.query('insert into baseQuartsEmploye values ($1, $2, $3, $4, $5, $6, $7)', [idemployeur, idemploye, '000', typequart, joursemaine, disponibilite, '1']);
			client.release(); 
			return true;
		} catch(e){
			return false;
		}		
	}
	
	async function modifierEmploye(idemploye, nomemploye, prenomemploye, nbrheuresmax) {		
		try {
			const client = await pool.connect();
			await client.query('update baseEmployes set nomemploye = $1, prenomemploye = $2, nbrheuresmax = $3 where idemploye = $4', [nomemploye, prenomemploye, nbrheuresmax, idemploye])
			client.release();
			return true;
		} catch (e) {
			return false;
			console.error(e);
		}
	}
   
  module.exports = {
  fpageWeb,
  fajouterEmploye,
  fafficherEmployes,
  fenleverEmploye,
  fajouterDisponibilite,
  fmodifierEmploye
}
