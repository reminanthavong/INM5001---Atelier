﻿const Ressources = require('./ressources')
var PostgREST = require('postgrest-client');
var Api = new PostgREST ('http://prodpostgrest-calendrier.herokuapp.com');

async function afficherChoixHoraire(req, res)  {
    try {
        const employeur = req.session.idgestion;
        let choixSemaine = await Ressources.recupererListeSemaine(employeur);
	    let result = {};
	    result = choixSemaine.choixSemaines;
	            res.set({'content-type': 'application/json'});
                    res.send(JSON.stringify(result));
    }catch (err) {
        console.error(err);
        res.send("Erreur appel client " + err);
    }
}

const afficherHoraire  = async (req, res) => {
    const resp = req.body; //{$choixsemaine}
    const choixsemaine = resp.choixsemaine || '000';
    const choixdate = resp.dateHoraire || '01-01-1899';
    const employeur = req.session.idgestion ;
    try {
		let horairesRecu = await Ressources.recupererHoraire(choixsemaine,choixdate.slice(0, 10),employeur);
		let result = {};
		result = horairesRecu.horaires
	    if(result.length == 0){
		    horairesRecu = await Ressources.recupererHoraire('999','2019-01-01','default');
		    result = horairesRecu.horaires	;
		}
	            console.log('Retour Horaire ' + result)
	            res.set({'content-type': 'application/json'});
                    res.send(JSON.stringify(result));
    }catch (err){
        console.error(err);
        res.send("Erreur appel client " + err);
    }
}

const afficherExigencesEmployeur = async (req,res) => {
    const employeur = req.session.idgestion;
    var id = req.body.choixsemaine || '000';
    var choixDate = req.body.dateHoraire || '01-01-1899';

    //Permet de savoir si la requete a été envoyé avec le idtablehoraire ou avec une date
    if (id == '000') {
      var date = new Date(choixDate);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); //Ajuste la date par rapport au fuseau horaire
      id = "" + employeur + "-" + date.toISOString().slice(0, 10);
    }

    try {
        var exigences = await getExigences(id);
        console.log(exigences)
	    if (exigences.length == 0){
	       id = 'default';
	       exigences = await getExigences(id);
	    }
        res.set({'content-type': 'application/json'});
        res.send(JSON.stringify(exigences));
    } catch (e) {
        console.error(e);
    }
}

async function getExigences(id) {
    return await Api.get('/basequartsemployeur').eq('idtablehoraire', id);
}


//---------------------------------------------------------------------------------------------------------------------------------//
module.exports = {
	afficherChoixHoraire,
  	afficherHoraire,
  	afficherExigencesEmployeur
}
