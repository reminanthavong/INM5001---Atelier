const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


async function recupererListeSemaine() {
            const client = await pool.connect()
            const choixSemaine = await client.query(`SELECT DISTINCT IDTableHoraire FROM TableHoraire;`);
            const choixSemaines = { 'choixSemaines': (choixSemaine) ? choixSemaine.rows : null};
	    client.release();
            //console.log(choixSemaines);
            return choixSemaines;	
}

async function fonctions1(req, res)  {
  try {
           const choixSemaines = await recupererListeSemaine();
            res.json( choixSemaines );
          } catch (err) {
            console.error(err);
            res.send("Erreur appel client " + err);
          }
}

async function recupererHoraire(choixsemaine,choixdate,employeur) {
            const client = await pool.connect()
            const horaires = await client.query(`SELECT *
                                                         FROM
                                                         (SELECT TC2.Valeur AS TypeQuart, TC3.Valeur AS JourSemaine, CONCAT(BE.NomEmploye,' ',BE.PrenomEmploye) AS NomEmploye
                                                                                                    	FROM TableHoraire TH
                                                                                                    	LEFT JOIN BaseEmployes BE ON BE.IDEmploye=TH.IDEmploye
                                                                                                    	LEFT JOIN TableCodes TC2 ON (TC2.Label='TypeQuart' AND TH.TypeQuart=TC2.Code)
                                                                                                    	LEFT JOIN TableCodes TC3 ON (TC3.Label='JourSemaine' AND TH.JourSemaine=TC3.Code)
                                                                                                    	WHERE (TH.IDTableHoraire='${choixsemaine}' OR TH.DateParam='${choixdate}')
                                                                                                      AND (TH.IDEmployeur='${employeur}' OR TH.IDEmployeur=(SELECT DISTINCT IDEmployeur FROM TableHoraire WHERE IDEmploye = '${employeur}') )
                                                                                                    ) AS SourceTable;

                                                         `);
             const horairesRecu = { 'horaires': (horaires) ? horaires.rows : null};
             client.release();
            return horairesRecu;	
}
const fonctions2  = async (req, res) => {
        const resp = JSON.parse(req.body); //{$choixsemaine}
        const choixsemaine = resp['choixsemaine'] || '000';
        const choixdate = resp['choixdate'] || '01/01/1899';      
        const employeur = req.session.username//'Gestion3525' //'JNASH'// 
         try {
		const horairesRecu= await recupererHoraire(choixsemaine,choixdate,employeur)
                res.json( horairesRecu );
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


//---------------------------------------------------------------------------------------------------------------------------------//

const GenererHoraire = async (req, res) => {
  try {
            const client = await pool.connect()
            const horaire = await client.query(`SELECT DISTINCT '999' AS IDTableHoraire, '10/7/2019' AS DateParam ,C.IDEmployeur,C.IDEmploye, C.JourSemaine, C.TypeQuart,c.Selection--,NBREmployes
FROM(
	SELECT IDEmploye,IDEmployeur,JourSemaine, TypeQuart,Selection,DateEmbauche
	FROM (
		SELECT 
		*,ROW_NUMBER()OVER(PARTITION BY A.IDEmploye ORDER BY A.JourSemaine ASC) AS MaxSem
		,ROW_NUMBER()OVER(PARTITION BY A.JourSemaine, A.TypeQuart ORDER BY A.TypeQuart ASC, A.JourSemaine ASC) AS Selection
		FROM(
			SELECT BQE.*, nbrQuartsmax,DateEmbauche ,ROW_NUMBER()OVER(PARTITION BY BQE.IDEmploye, BQE.JourSemaine ORDER BY BQE.TypeQuart ASC) AS MaxJOur
			FROM basequartsemploye BQE
			INNER JOIN baseemployes BE ON BE.IDEmploye=BQE.IDEmploye 
				AND BE.IDEmployeur='Gestion8768'
  				AND Disponibilite='1'
  				AND ParamType='1'
			LEFT JOIN Tableconges TC ON TC.IDEmploye=BQE.IDEmploye 
				AND TC.JourSemaine=BQE.JourSemaine 
				AND TC.TypeQuart=BQE.TypeQuart
				AND TC.DateConges='2019-10-7'
			WHERE TC.IDEmploye IS NULL 
	)A	
	WHERE MaxJour=1
	)B
	WHERE MaxSem<=nbrQuartsmax
	ORDER BY B.DateEmbauche ASC, B.JourSemaine ASC, B.TypeQuart ASC
)C
INNER JOIN BaseQuartsEmployeur BQER ON BQER.IDEmployeur=C.IDEmployeur
		AND BQER.IDTableHoraire='001'
		AND BQER.TypeQuart=C.TypeQuart
		AND BQER.JourSemaine=C.JourSemaine
		AND C.Selection <= BQER.NBREmployes


;`);
            res.json(horaire);
            client.release();
          } catch (err) {
            console.error(err);
            res.send("Erreur appel client " + err);
          }
}

//---------------------------------------------------------------------------------------------------------------------------------//



module.exports = {
recupererListeSemaine,
  fonctions1,
recupererHoraire,
  fonctions2,
  fonctions3,
  fonctions4,
  GenererHoraire
}
