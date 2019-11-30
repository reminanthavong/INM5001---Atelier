const Ressources = require('./ressources')

async function fonctions1(req, res)  {
  try {
           const choixSemaines = await Ressources.recupererListeSemaine();
            res.json( choixSemaines );
          } catch (err) {
            console.error(err);
            res.send("Erreur appel client " + err);
          }
}

const fonctions2  = async (req, res) => {
	console.log(req.body);
        const resp = req.body; //{$choixsemaine}
        const choixsemaine = resp['choixsemaine'] || '000';
	
        const choixdate = resp['choixdate'] || '01-01-1899';     
	console.log(choixsemaine);
	console.log(choixdate);

        const employeur = req.session.username//'Gestion3525' //'JNASH'// 
         try {
		const horairesRecu= await Ressources.recupererHoraire(choixsemaine,choixdate,employeur)
                res.json( horairesRecu );
             } catch (err) {
               console.error(err);
               res.send("Erreur appel client " + err);
             }
}
   
const fonctions3  = async (req, res) => {
  res.sendFile(path.join(__dirname+'/views/pages/AffichageHoraire.html'));
}

const fonctions4  = async (req, res) => {
  res.sendFile(path.join(__dirname+'/views/pages/AffichageHoraire.html'));
}

//---------------------------------------------------------------------------------------------------------------------------------//
module.exports = {
	fonctions1,
  	fonctions2,
  	fonctions3,
  	fonctions4
}
