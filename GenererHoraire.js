
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
//---------------------------------------------------------------------------------------------------------------------------------//
async function GenererHoraire(choixsemaine,choixdate,employeur) {
	const client = await pool.connect()
	const horaire = await client.query(`SELECT DISTINCT '${choixsemaine}' AS IDTableHoraire, '${choixdate}' AS DateParam ,C.IDEmployeur,C.IDEmploye, C.JourSemaine, C.TypeQuart,c.Selection--,NBREmployes
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
	//console.log(horaire);
	return horairegenere
}
//---------------------------------------------------------------------------------------------------------------------------------//
const GenererHoraireReponse = async (req, res) => {
	const resp = req.body; 
	const choixsemaine = resp['choixsemaine'] || '000';
        const choixdate = resp['choixdate'] || '01-01-1899';     
        const employeur = req.session.username
try {
	const horaire =await GenererHoraire(choixsemaine,choixdate,employeur);
	res.json(horaire);
 } catch (err) {
	console.error(err);
	res.send("Erreur appel client " + err);
 }
}

//---------------------------------------------------------------------------------------------------------------------------------//

module.exports = {
GenererHoraire,
GenererHoraireReponse
}

