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
	  try{	
		  await ajoutHoraire(reqJson.employejour, reqJson.employesoir, reqJson.employenuit, reqJson.datehoraire);
		  const reqJson = req.body;
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


async function ajoutHoraire(employejour, employesoir, employenuit, datehoraire) {
  var jourSemaine = 1;
  var nombreEmploye = 1;
  var idHoraire;
  try{
    const client1 = await pool.connect();
    idHoraire = await client.query('SELECT MAX(Idtablehoraire) FROM TableHoraire');
    client1.release();
  } catch(e){
    return false
  }

  try {
    while(nombreEmploye <= employejour){
      while(jourSemaine <= 7) {	
        const client = await pool.connect();
        await client.query('INSERT INTO TableHoraire(Idtablehoraire, Dateparam, Idemployeur, Joursemaine, Typequart) values ($1, $2, $3, $4)', [idHoraire, datehoraire, 'Gestion8768', jourSemaine, 'J']);
        await client.query('INSERT INTO TableHoraire(Idemploye) SELECT * FROM BaseQuartsEmploye LIMIT 1 WHERE BaseQuartsEmployes.Disponibilite="1" AND Typequart="J"'); 
        client.release(); 
        jourSemaine = jourSemaine + 1;  
    }
    nombreEmploye = nombreEmploye + 1;
  }
  return true;
  }  catch(e){
  return false;
  }
}

module.exports = {
  pageWeb,
  afficherHoraire,
  ajouterHoraire ,
  enleverHoraire 
}

