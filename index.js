const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

   //Page Mourad//
   
  .get('/AffichageHoraire', async (req, res) => {
    try {
      const client = await pool.connect()
      const getHoraire = await client.query(`SELECT *
                                           FROM
                                           (SELECT TC2.Valeur AS TypeQuart, TC3.Valeur AS JourSemaine, CONCAT(BE.NomEmploye,BE.PrenomEmploye) AS NomEmploye
                                                                                      	FROM TableHoraire TH
                                                                                      	LEFT JOIN BaseEmployes BE ON BE.IDEmploye=TH.IDEmploye
                                                                                      	LEFT JOIN TableCodes TC2 ON (TC2.Label='TypeQuart' AND TH.TypeQuart=TC2.Code)
                                                                                      	LEFT JOIN TableCodes TC3 ON (TC3.Label='JourSemaine' AND TH.JourSemaine=TC3.Code)
                                                                                      	WHERE TH.IDTableHoraire='001' AND TH.IDEmployeur='Gestion3525'
                                                                                      ) AS SourceTable
                                           `);
      const getHoraires = { 'getHoraires': (getHoraire) ? getHoraire.rows : null};
      res.render('pages/AffichageHoraire', getHoraires );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
   



  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
