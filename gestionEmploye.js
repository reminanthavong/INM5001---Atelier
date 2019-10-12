const Pool = require('pg').Pool 
const express = require("express")
const app = express();
const PORT = process.env.PORT || 5000
app.use(express.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const pool = new Pool ({
	connectionString: process.env.DATABASE_URL,
	ssl:true
})

app.listen(PORT, () => console.log(`Web server listening on port ${PORT}`))

app.get("/", (req, res) => res.sendFile(`${__dirname}/gestionEmploye.html`))

start()

app.get('/Employe', async (req, res) => {	
	const rows = await afficherEmployes();
	res.setHeader("content-type", "application/json")
	res.send(JSON.stringify(rows))
	
})

app.post('/Employe', async (req, res) => {
	let result = {}

	try{
	
		const reqForm = req.body;
		await ajoutEmploye(reqForm.IDEmploye, reqForm.NomEmploye, reqForm.PrenomEmploye, reqForm.NBRHeuresMax, reqForm.DateEmbauche, reqForm.MotdePasse);
		result.success = true;
		
	} catch (e) {
		result.success = false;
	} finally {
		res.setHeader("content-type", "application/json")
		res.send(JSON.stringify(result))
	}
	
})

async function start() {
	await connect();	
}	

async function connect() {
	try {
		await pool.connect();
	} catch(e) {
		console.error(`Erreur de connexion ${e}`)
	}
}

async function ajoutEmploye(IDEmploye, NomEmploye, PrenomEmploye, NBRHeuresMax, DateEmbauche, MotdePasse) {
	try {
		await pool.query("insert into #BaseEmploye values ($1, $2, $3, $4, $5, $6)", ["gestion001", IDEmploye, NomEmploye, PrenomEmploye, NBRHeuresMax, DateEmbauche]);
		await pool.query("insert into #BaseIdentification values ($1, $2, $3)", [IDEmploye, MotDePasse, "0"])
		//await pool.query("insert into #BaseQuartsEmploye values ($1, $2, $3, $4, $5, $6, $7)", [IDEmployeur, IDEmploye, IDTableHoraire, TypeQuart, JourSemaine, Disponibilite])
		return true
	} catch(e){
		return false;
	}		
}

async function afficherEmployes() {
	try {
		const results = await pool.query("select IDEmploye, NomEmploye, PrenomEmploye, NBRHeuresMax, DatEmbauche from #BaseEmploye where IDEmployeur = 'gestion001'")
		return results.rows
	} catch(e) {
		return [];
	}
}