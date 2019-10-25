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
	  try{	
		  await ajoutEmploye(reqJson.idemploye, reqJson.nomemploye, reqJson.prenomemploye, reqJson.nbrheuresmax, reqJson.dateembauche, reqJson.motdepasse);
		  
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
		  await deleteEmploye(reqJson.idemploye);
		  result.success = true;		
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }
	  
}

	async function ajoutEmploye(idemploye, nomemploye, prenomemploye, nbrheuresmax, dateembauche, motdepasse) {
		
		
		try {
			const client = await pool.connect();
			var sessEmployeur = req.session.username;
			await client.query('INSERT INTO BaseEmployes(idemployeur, idemploye, nomemploye, prenomemploye, nbrheuresmax, dateembauche) values ($1, $2, $3, $4, $5, $6)', [sessEmployeur, idemploye, nomemploye, prenomemploye, nbrheuresmax, dateembauche]);
			//await client.query("insert into BaseIdentification values ($1, $2, $3)", [idemploye, motdepasse, '0'])
			//await pool.query("insert into #BaseQuartsEmploye values ($1, $2, $3, $4, $5, $6, $7)", [IDEmployeur, IDEmploye, IDTableHoraire, TypeQuart, JourSemaine, Disponibilite])
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
			return [];
		}
	}

	async function deleteEmploye(idemploye) {
		try {
			const client = await pool.connect();
			await client.query("delete from BaseEmployes where IDEmploye = $1", [idemploye])
			client.release();
			return true
		} catch(e) {
			return false;
			console.error(e);
		}
	}
  
  
  module.exports = {
  fpageWeb,
  fajouterEmploye,
  fafficherEmployes,
  fenleverEmploye
}
