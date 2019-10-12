import * as _ from 'lodash';

let url = "/Employe";

creerEmploye();

const btnCreer = document.getElementById("btncreeremploye");
const btnAfficher = document.getElementById("btnchercheremploye")

btnCreer.addEventListener("click", async e => {
	const jsonEmp = {}
	jsonEmp.IDEmploye = creerEmploye();
	jsonEmp.NomEmploye = document.getElementById('nomemployeid');
	jsonEmp.PrenomEmploye = document.getElementById('prenomemployeid');
	jsonEmp.NBRHeuresMax = document.getElementById('nbheuresmaxid');
	jsonEmp.DateEmbauche = document.getElementById('dateembauche');
	jsonEmp.MotDePasse = document.getElementById('motdepasse');
        	  	
	const result = await fetch(url, {method: "POST", 
		headers: { "content-type": "application/json"}, body: JSON.stringify(jsonEmp) })
	const success = await result.json();
	if (succes)
		alert("Ajouter!");
})

function creerIDEmploye {
	let ID: String;
	let nomQuatre = document.getElementById('nomemployeid');
	nomquatre = nomQuatre.charAt(0);
	let prenomUn = document.getElementById('prenomemployeid');
	prenomUn = prenomUn.substring(0,3);
	ID = prenomUn.concat(nomQuatre);
	return ID;
}		

btn.addEventListener("click", async e => {
	const tableEmploye = document.getElementById("tableEmploye")
	const resultat = await fetch(url, {method: "GET"})
	const employes = await resultat,json();
	employes.forEach(t => {
		const tr = document.createElement("tr")
		const td1 = document.createElement("td")
		const td2 = document.createElement("td")
		const td3 = document.createElement("td")
		const td4 = document.createElement("td")
		const td5 = document.createElement("td")
		td1.textContent = t.IDEmploye;
		td2.textContent = t.NomEmploye;
		td3.textContent = t.PrenomEmploye;
		td4.textContent = t.NBRHeuresMax;
		td5.textContent = t.DatEmbauche;
	}
})	

async function readMembres() {
			try {
				const olMembre = document.getElementById("olMembre")
				while(olMembre.firstChild) olMembre.removeChild(olMembre.firstChild)
				const result = await fetch(url, {method: "GET"})
				const membres = await result.json();
				membres.forEach(t=>{
					const li = document.createElement("li")
	                li.textContent = t.nom;
	                li.id = t.id;
	                
	                li.addEventListener("click", async e => {
	                	const jsonRequest = {}
	                	jsonRequest.nom = e.target.textContent;
	                	const result = await fetch(url, {method: "DELETE", 
	                		headers: { "content-type": "application/json"}, body: JSON.stringify(jsonRequest) })
	                	const success = await result.json();
	                   readMembres();
	                    alert("Effacé!")
	                })
	                
	                olMembre.appendChild(li)
					})
				} catch(e) {
					console.log("Impossible de lire les membres")
				}
			}