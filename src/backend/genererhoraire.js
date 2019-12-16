const Ressources = require('./ressources')
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const genererHoraireReponse = async (req, res) => {
	const resp = req.body;
	const choixsemaine = resp['choixsemaine'] || '000';
    const choixdate = resp['choixdate'] || '01-01-1899';
    const employeur = req.session.username
    try {
	    const horaire = await Ressources.genererHoraire(choixsemaine,choixdate,employeur);
	    res.json(horaire);
    }catch (err){
	    console.error(err);
	    res.send("Erreur appel client " + err);
    }
}

module.exports = {
    genererHoraireReponse
}
