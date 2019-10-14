const Pool = require('pg').Pool 
const express = require("express")
const app = express();
//const PORT = process.env.PORT || 5000
app.use(express.json())

//app.set('views', path.join(__dirname, 'views'))
//app.set('view engine', 'ejs')
/**
const pool = new Pool ({
	connectionString: process.env.DATABASE_URL,
	ssl:true
})
*/

const pool = new Pool ({
	user:"nvgnyxzoglgozi",
	password:"e669132b12a9be74fc1c2d60d357928740f17fc9e2b84c1d4b30199b3bb1bd14",
	host: "ec2-54-243-208-234.compute-1.amazonaws.com",
	port: 5432,
	database: "d181pdml81daoa",
	ssl: true
})
	

//app.listen(PORT, () => console.log(`Web server listening on port ${PORT}`))
app.listen(8080, () => console.log("Web server is listening.. on port 8080"))


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
	
		const reqJson = req.body;
		await ajoutEmploye(reqJson.IDEmploye, reqJson.NomEmploye, reqJson.PrenomEmploye, reqJson.NBRHeuresMax, reqJson.DateEmbauche, reqJson.MotdePasse);
		result.success = true;
		
	} catch (e) {
		result.success = false;
	} finally {
		res.setHeader("content-type", "application/json")
		res.send(JSON.stringify(result))
	}
	
})

app.delete('/Employe', async (req, res) => {
	let result = {}

	try{	
		const reqJson = req.body;
		await deleteMembres(reqJson.IDEmploye);
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
		console.log("Connexion réussie avec succès");
	} catch(e) {
		console.error(`Erreur de connexion ${e}.`)
	}
}

async function ajoutEmploye(IDEmploye, NomEmploye, PrenomEmploye, NBRHeuresMax, DateEmbauche, MotdePasse) {
	try {
		await pool.query("insert into BaseEmployes values ($1, $2, $3, $4, $5, $6)", ["Gestion001", IDEmploye, NomEmploye, PrenomEmploye, NBRHeuresMax, DateEmbauche]);
		await pool.query("insert into BaseIdentification values ($1, $2, $3)", [IDEmploye, MotDePasse, "0"])
		//await pool.query("insert into #BaseQuartsEmploye values ($1, $2, $3, $4, $5, $6, $7)", [IDEmployeur, IDEmploye, IDTableHoraire, TypeQuart, JourSemaine, Disponibilite])
		return true
	} catch(e){
		return false;
	}		
}

async function afficherEmployes() {
	try {
		const results = await pool.query("select IDEmploye, NomEmploye, PrenomEmploye, NBRHeuresMax, DatEmbauche from BaseEmployes")
		return results.rows
	} catch(e) {
		return [];
	}
}

async function deleteEmploye(IDEmploye) {
	try {
		await pool.query("delete from BaseEmployes where IDEmploye = $1", [IDEmploye])
		return true
	} catch(e) {
		return false;
	}
}