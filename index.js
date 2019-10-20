const express = require('express')
const path = require('path')
//const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const app = express();
//const pool = new Pool({
  //connectionString: process.env.DATABASE_URL,
  //ssl: true
//});


const pool = new Pool ({
	user:"nvgnyxzoglgozi",
	password:"e669132b12a9be74fc1c2d60d357928740f17fc9e2b84c1d4b30199b3bb1bd14",
	host: "ec2-54-243-208-234.compute-1.amazonaws.com",
	port: 5432,
	database: "d181pdml81daoa",
	ssl: true
})



app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/gestionEmploye'))

app.get('/db', async (req, res) => {
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
 
  
 app.listen(8080, () => console.log("Web server is listening.. on port 8080"))

   //Page Mourad//
   app.get('/api/v1/semaines', async (req, res) => {
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
   })
    app.post('/api/v1/horaires', async (req, res) => {
        //const {choixsemaine} = req.body; //{$choixsemaine}
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
                                                                                                    	WHERE TH.IDTableHoraire='001' AND TH.IDEmployeur='{$employeur}'
                                                                                                    ) AS SourceTable;
                                                         `);
               //const horaires = { 'horaires': (horaires) ? choixSemaine.rows : null};
               res.json( horaires );
               client.release();
             } catch (err) {
               console.error(err);
               res.send("Erreur appel client " + err);
             }
      })

  app.get('/AffichageHoraire', async (req, res) => {
      res.sendFile(path.join(__dirname+'/views/pages/AffichageHoraire.html' /*, getHoraires */));
  })
  //fin page Mourad//
  
  //Page Kayla//
  app.get('/Employe', async (req, res) => {	
	  const rows = await afficherEmployes();
	  res.setHeader("content-type", "application/json")
	  res.send(JSON.stringify(rows))	
  })

  app.post('/Employe', async (req, res) => {
	  let result = {}
	  try{	
		  const reqJson = req.body;
		  await ajoutEmploye(reqJson.idemploye, reqJson.nomemploye, reqJson.prenomemploye, reqJson.nbrheuresmax, reqJson.dateembauche, reqJson.motdepasse);
		  result.success = true;
	  } catch (e) {
		  result.success = false;
	  } finally {
		  res.setHeader("content-type", "application/json")
		  res.send(JSON.stringify(result))
	  }	
  })

  app.delete('/Employe', async (req, res) => {
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
	})
	
	async function ajoutEmploye(idemploye, nomemploye, prenomemploye, nbrheuresmax, dateembauche, motdepasse) {
		try {
			const client = await pool.connect();
			await client.query("insert into BaseEmployes(idemployeur, idemploye, nomemploye, prenomemploye, nbrheuresmax, dateembauche) values ($1, $2, $3, $4, $5, $6)", 
										['Gestion0001', idemploye, nomemploye, prenomemploye, nbrheuresmax, dateembauche]);
			//await client.query("insert into BaseIdentification values ($1, $2, $3)", [idemploye, motdepasse, '0'])
			//await pool.query("insert into #BaseQuartsEmploye values ($1, $2, $3, $4, $5, $6, $7)", [IDEmployeur, IDEmploye, IDTableHoraire, TypeQuart, JourSemaine, Disponibilite])
			client.release(); 
			return true;
		} catch(e){
			return false;
		}		
	}

	async function afficherEmployes() {
		try {
			const client = await pool.connect();
			const results = await client.query("select IDEmploye, NomEmploye, PrenomEmploye, NBRHeuresMax, DateEmbauche from BaseEmployes")
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
//Fin page Kayla//

  //.listen(PORT, () => console.log(`Listening on ${ PORT }`))
  