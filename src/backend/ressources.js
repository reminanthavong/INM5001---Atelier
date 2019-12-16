const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


async function recupererListeSemaine(employeur) {
    const client = await pool.connect()
    const choixSemaine = await client.query(`SELECT DISTINCT IDTableHoraire FROM TableHoraire WHERE idemployeur = '${employeur}';`);
    const choixSemaines = { 'choixSemaines': (choixSemaine) ? choixSemaine.rows : null};
    client.release();
    return choixSemaines;
}

async function recupererHoraire(choixsemaine,choixdate,employeur) {
    const client = await pool.connect();
    const horaires = await client.query(`SELECT *
        FROM
        (SELECT DISTINCT TC2.Valeur AS TypeQuart, TC3.Valeur AS JourSemaine, CONCAT(BE.NomEmploye,' ',BE.PrenomEmploye) AS NomEmploye
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

async function genererHoraire(choixsemaine, choixdate, employeur) {
    const client = await pool.connect()
  
	const horaire = await client.query(`SELECT DISTINCT '${choixsemaine}' AS IDTableHoraire, '${choixdate}' AS DateParam ,C.IDEmployeur,C.IDEmploye, C.JourSemaine, C.TypeQuart,c.Selection--,NBREmployes
	FROM(
	SELECT IDEmploye,IDEmployeur,JourSemaine, TypeQuart,Selection,DateEmbauche
	FROM (
		SELECT
		*,ROW_NUMBER()OVER(PARTITION BY A.IDEmploye ORDER BY A.JourSemaine ASC) AS MaxSem
		,ROW_NUMBER()OVER(PARTITION BY A.IDEmploye,A.JourSemaine, A.TypeQuart ORDER BY A.TypeQuart ASC, A.JourSemaine ASC) AS Selection
		FROM(
			SELECT BQE.*, nbrQuartsmax,DateEmbauche ,ROW_NUMBER()OVER(PARTITION BY BQE.IDEmploye, BQE.JourSemaine ORDER BY BQE.TypeQuart ASC) AS MaxJOur
			FROM basequartsemploye BQE
			INNER JOIN baseemployes BE ON BE.IDEmploye=BQE.IDEmploye
				AND BE.IDEmployeur='${employeur}'
  				AND Disponibilite='1'
  				AND ParamType='1'
			LEFT JOIN Tableconges TC ON TC.IDEmploye=BQE.IDEmploye
				AND TC.JourSemaine=BQE.JourSemaine
				AND TC.TypeQuart=BQE.TypeQuart
				AND TC.DateConges='${choixdate}'
			WHERE TC.IDEmploye IS NULL
	)A
	WHERE MaxJour=1
	)B
	WHERE MaxSem<=nbrQuartsmax
	ORDER BY B.DateEmbauche ASC, B.JourSemaine ASC, B.TypeQuart ASC
    )C
    INNER JOIN BaseQuartsEmployeur BQER ON BQER.IDEmployeur=C.IDEmployeur
		AND BQER.IDTableHoraire='${choixsemaine}'
		AND BQER.TypeQuart=C.TypeQuart
		AND BQER.JourSemaine=C.JourSemaine
		AND C.Selection <= BQER.NBREmployes
    ;`);
	const horairegenere = { 'horaires': (horaire) ? horaire.rows : null};
	client.release();
	//console.log('genererhoraire.js' + horairegenere);
	return horairegenere
}


module.exports = {
	recupererListeSemaine,
	recupererHoraire,
	genererHoraire
}
