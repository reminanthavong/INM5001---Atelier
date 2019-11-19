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
	var employejour = parseInt(req.body.employejour);
	var employesoir  = parseInt(req.body.employesoir);
	var employenuit  = parseInt(req.body.employenuit);
	  try{	
		  console.log(employejour);
		   console.log(employesoir);
		   console.log(employenuit);
		  await ajoutHoraire(employejour, employesoir, employenuit, reqJson.datehoraire);
		  
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

  //Va chercher l'Idtablehoraire la plus élevé de la table idHoraire et ajoute 1 (logique possiblement erronné)
  var idHoraire;
  try{
    const client1 = await pool.connect();
    idHoraire = await client.query('SELECT MAX(Idtablehoraire) FROM TableHoraire');
    console.log(idHoraire);
    idHoraire = parseInt(idHoraire)+1;
    console.log(idHoraire);
    client1.release();
  } catch(e){
    return false
  }

  //2 boucle pour l'insertion des employés pour l'horaire de jour, 1 boucle pour le nombre d'employer demander, 2ième boucle pour les jours de la semaine de 1 à 7
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

  //2 boucle pour l'insertion des employés pour l'horaire de soir, 1 boucle pour le nombre d'employer demander, 2ième boucle pour les jours de la semaine de 1 à 7
  jourSemaine = 1; nombreEmploye = 1;
    while(nombreEmploye <= employejour){
      while(jourSemaine <= 7) {	
        const client = await pool.connect();
        await client.query('INSERT INTO TableHoraire(Idtablehoraire, Dateparam, Idemployeur, Joursemaine, Typequart) values ($1, $2, $3, $4)', [idHoraire, datehoraire, 'Gestion8768', jourSemaine, 'S']);
        await client.query('INSERT INTO TableHoraire(Idemploye) SELECT * FROM BaseQuartsEmploye LIMIT 1 WHERE BaseQuartsEmployes.Disponibilite="1" AND Typequart="S"'); 
        client.release(); 
        jourSemaine = jourSemaine + 1;  
    }
      nombreEmploye = nombreEmploye + 1;
  }
    //2 boucle pour l'insertion des employés pour l'horaire de nuit, 1 boucle pour le nombre d'employer demander, 2ième boucle pour les jours de la semaine de 1 à 7
    jourSemaine = 1; nombreEmploye = 1;
    while(nombreEmploye <= employejour){
      while(jourSemaine <= 7) {	
        const client = await pool.connect();
        await client.query('INSERT INTO TableHoraire(Idtablehoraire, Dateparam, Idemployeur, Joursemaine, Typequart) values ($1, $2, $3, $4)', [idHoraire, datehoraire, 'Gestion8768', jourSemaine, 'N']);
        await client.query('INSERT INTO TableHoraire(Idemploye) SELECT * FROM BaseQuartsEmploye LIMIT 1 WHERE BaseQuartsEmployes.Disponibilite="1" AND Typequart="N"'); 
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
  afficherHoraire,
  ajouterHoraire ,
  enleverHoraire 
}

