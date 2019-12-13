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


module.exports = {
	recupererListeSemaine,
	recupererHoraire
}
