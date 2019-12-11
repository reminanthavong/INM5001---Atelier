const Ressources = require('./ressources')
var PostgREST = require('postgrest-client');
var Api = new PostgREST ('http://testpostgrest-calendrier.herokuapp.com');

async function afficherChoixHoraire(req, res)  {
    try {
        const employeur = req.session.idgestion
        let choixSemaine = await Ressources.recupererListeSemaine(employeur);
	    let result = {};
	    result = choixSemaine.choixSemaines;
	    console.log(JSON.stringify(result))
		res.setHeader("content-type", "application/json")
		res.send(JSON.stringify(result));
    }catch (err) {
        console.error(err);
        res.send("Erreur appel client " + err);
    }
}

const afficherHoraire  = async (req, res) => {
    const resp = req.body; //{$choixsemaine}
    console.log(resp)
    const choixsemaine = resp.choixsemaine || '000';
    const choixdate = resp.dateHoraire || '01-01-1899';
    const employeur = req.session.idgestion //'Gestion3525' //'JNASH'//
    console.log(choixsemaine)
    console.log(choixdate)
    console.log(employeur)
    try {
		let horairesRecu = await Ressources.recupererHoraire(choixsemaine,choixdate.slice(0, 10),employeur)
		let result = {};
		result = horairesRecu.horaires
        console.log(JSON.stringify(result))
		res.setHeader("content-type", "application/json")
		res.send(JSON.stringify(result));
    } catch (err) {
        console.error(err);
        res.send("Erreur appel client " + err);
    }
}

const afficherExigencesEmployeur = async (req,res) => {
    const employeur = req.session.idgestion
    const id = req.body;
    const exigences = await getExigences(id);
    res.set({'content-type': 'application/json'});
    res.send(JSON.stringify(exigences))

}

async function getExigences(id) {
    return await Api.get('/basequartsemployeur').eq('idtablehoraire', id)
}


//---------------------------------------------------------------------------------------------------------------------------------//
module.exports = {
	afficherChoixHoraire,
  	afficherHoraire,
  	afficherExigencesEmployeur
}
