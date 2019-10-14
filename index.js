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
      const result = await client.query('SELECT * FROM persons');
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
        const results = await affichagehoraire(client);
        res.render('pages/AffichageHoraire', results );
        client.release();


      } catch (err) {
        console.error(err);
        res.send("Error1" + err);
      }
    })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

//Fonctions Mourad//
async function affichagehoraire (client) {
        const result = await client.query(`SELECT * FROM TableHoraire TH
                                           	WHERE TH.IDTableHoraire='001' AND TH.IDEmployeur='Gestion3525'
                                          `);
        const results = { 'results': (result) ? result.rows : null};
return results;
}
//***************//
