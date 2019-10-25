const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


const fonctions1  = async (req, res) => {
  try {
            const client = await pool.connect()
            const choixSemaine = await client.query(`SELECT DISTINCT IDTableHoraire FROM TableHoraire;`);
            const choixSemaines = { 'choixSemaines': (choixSemaine) ? choixSemaine.rows : null};
            res.json( choixSemaines );
            client.release();
          } catch (err) {
            console.error(err);
            res.send("Erreur appel client " + err);
          }
}

const fonctions2  = async (req, res) => {

        const resp = req.body; //{$choixsemaine}
        //const resp = { choixSemaine: '001'};
        const choix = resp.choixSemaine;
        const employeur = 'Gestion3525'
         try {
            const client = await pool.connect()
            const horaires = await client.query(`SELECT *
                                                         FROM
                                                         (SELECT TC2.Valeur AS TypeQuart, TC3.Valeur AS JourSemaine, CONCAT(BE.NomEmploye,BE.PrenomEmploye) AS NomEmploye
                                                                                                    	FROM TableHoraire TH
                                                                                                    	LEFT JOIN BaseEmployes BE ON BE.IDEmploye=TH.IDEmploye
                                                                                                    	LEFT JOIN TableCodes TC2 ON (TC2.Label='TypeQuart' AND TH.TypeQuart=TC2.Code)
                                                                                                    	LEFT JOIN TableCodes TC3 ON (TC3.Label='JourSemaine' AND TH.JourSemaine=TC3.Code)
                                                                                                    	WHERE TH.IDTableHoraire='${choix}' AND TH.IDEmployeur='${employeur}'
                                                                                                    ) AS SourceTable;
                                                         `);
               const horairesRecu = { 'horaires': (horaires) ? horaires.rows : null};
               res.json( horairesRecu );
               client.release();
             } catch (err) {
               console.error(err);
               res.send("Erreur appel client " + err);
             }
}
   
const fonctions3  = async (req, res) => {
  res.sendFile(path.join(__dirname+'/views/pages/AffichageHoraire.html' /*, getHoraires */));
}

const fonctions4  = async (req, res) => {
  res.sendFile(path.join(__dirname+'/views/pages/AffichageHoraire.html' /*, getHoraires */));
}
module.exports = {
  fonctions1,
  fonctions2,
  fonctions3,
  fonctions4
}
