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
	  console.log(sessEmployeur)
	  const rows = await afficherEmployes(sessEmployeur);
	  res.setHeader("content-type", "application/json")
	  res.send(JSON.stringify(rows))
}

const fajouterEmploye   = async (req, res) => {
	  let result = {}
	  const reqJson = req.body;
	console.log(reqJson)
	console.log(reqJson.idemploye)
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
		  var idtablehoraire = sessEmployeur.concat("00000000");
		  await deleteEmploye(reqJson.idemploye, sessEmployeur, idtablehoraire);
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
	var idtablehoraire = sessEmployeur.concat("00000000");
	try{	
		  await ajoutDispo(sessEmployeur, reqJson.idemploye, idtablehoraire, reqJson.typequart, req.joursemaine, req.dispo);		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

const fmodifierEmploye   = async (req, res) => {
	  let result = {}
	  const reqJson = req.body;
	  var sessEmployeur = req.session.username;
	  try{	
		  await modierEmploye(sessEmployeur, reqJson.idemploye, reqJson.nomemploye, reqJson.prenomemploye, reqJson.nbrheuresmax, reqJson.dateembauche);		  
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
}

	async function ajoutEmploye(idemployeur, idemploye, nomemploye, prenomemploye, nbrheuresmax, dateembauche, motdepasse) {	
		try {
			const client = await pool.connect();
			await client.query('INSERT INTO BaseEmployes(idemployeur, idemploye, nomemploye, prenomemploye, nbrheuresmax, dateembauche) values ($1, $2, $3, $4, $5, $6)', [idemployeur, idemploye, nomemploye, prenomemploye, nbrheuresmax, dateembauche]);
			await client.query("insert into BaseIdentification values ($1, $2, $3)", [idemploye, motdepasse, '0'])
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

	async function deleteEmploye(idemploye, idemployeur, idtablehoraire) {
		try {
			const client = await pool.connect();
			await client.query("delete from BaseEmployes where IDEmploye = $1 and IDEmployeur = $2", [idemploye, idemployeur])
			await client.query("delete from BaseIdentification where idutilisateur = $1 and IDEmployeur = $2", [idemploye])
			await client.query("update baseQuartsEmploye set disponiblite = $1 where idemploye = $2 and idtablehoraire = $3", ['0', idemploye, idtablehoraire])
			client.release();
			return true
		} catch(e) {
			return false;
			console.error(e);
		}
	}
	
	async function ajoutDispo(idemployeur, idemploye, idtablehoraire, typequart, joursemaine, disponibilite) {		
		try {
			const client = await pool.connect();
			await pool.query("insert into baseQuartsEmploye values ($1, $2, $3, $4, $5, $6, $7)", [idemployeur, idemploye, idtableHoraire, TypeQuart, JourSemaine, Disponibilite, "1"]);
			client.release(); 
			return true;
		} catch(e){
			return false;
		}		
	}
	
	async function modifierEmploye(idemployeur, idemploye, nomemploye, prenomemploye, nbrheuresmax, dateembauche) {
		try {
			const client = await pool.connect();
			await client.query("update baseEmployes set nomemploye = $1, prenomemploye = $2, nbrheuresmax = $3, dateembauche = $4 where idemploye = $5 and idemployeur = $6", [nomemploye, prenomemploye, nbrheuresmax, dateembauche, idemploye, idemployeur])
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
