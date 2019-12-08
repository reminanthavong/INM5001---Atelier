const Ressources = require('./ressources')
const GenererHoraire = require('./GenererHoraire')

async function afficherChoixHoraire(req, res)  {
  try {
           const choixSemaines = await Ressources.recupererListeSemaine();
	  console.log(JSON.stringify(choixSemaines))
		res.setHeader("content-type", "application/json")
		res.send(JSON.stringify(choixSemaines.choixSemaines));
          } catch (err) {
            console.error(err);
            res.send("Erreur appel client " + err);
          }
}

const afficherHoraire  = async (req, res) => {
        const resp = req.body; //{$choixsemaine}
	console.log(resp)
        const choixsemaine = resp.choixsemaine || '000';
        const choixdate = resp.date || '01-01-1899';     
        const employeur = req.session.idgestion //'Gestion3525' //'JNASH'// 
         try {
		const horairesRecu= await Ressources.recupererHoraire(choixsemaine,choixdate.slice(0, 10),employeur)
                console.log(JSON.stringify(horairesRecu))
		res.setHeader("content-type", "application/json")
		res.send(JSON.stringify(horairesRecu.horaires));
             } catch (err) {
               console.error(err);
               res.send("Erreur appel client " + err);
             }
}
   
const GenererHoraireReponse = async (req, res) => {
	const resp = req.body; 
	const choixsemaine = resp['choixsemaine'] || '000';
        const choixdate = resp['choixdate'] || '01-01-1899';     
        const employeur = req.session.username
try {
	const horaire =await GenererHoraire.GenererHoraire(choixsemaine,choixdate,employeur);
	res.json(horaire);
 } catch (err) {
	console.error(err);
	res.send("Erreur appel client " + err);
 }
}


//---------------------------------------------------------------------------------------------------------------------------------//
module.exports = {
	afficherChoixHoraire,
  	afficherHoraire,
	GenererHoraireReponse
}
