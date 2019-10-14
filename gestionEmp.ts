import * as _ from 'lodash';

let url = "/Employe";


const btnCreer = document.getElementById("btncreeremploye");
const btnAfficher = document.getElementById("btnchercheremploye")

btnCreer.addEventListener("click", async e => {
	const jsonEmp: any = {}
	jsonEmp.IDEmploye = creerIDEmploye();
	jsonEmp.NomEmploye = document.getElementById('nomemployeid');
	jsonEmp.PrenomEmploye = document.getElementById('prenomemployeid');
	jsonEmp.NBRHeuresMax = document.getElementById('nbheuresmaxid');
	jsonEmp.DateEmbauche = document.getElementById('dateembauche');
	jsonEmp.MotDePasse = document.getElementById('motdepasse');
        	  	
	const result = await fetch(url, {method: "POST", 
		headers: { "content-type": "application/json"}, body: JSON.stringify(jsonEmp) })
	const success = await result.json();
	if (success)
		alert("Ajouter!");
})

function creerIDEmploye() {
	let ID: String;
	let nomQuatre = (<HTMLInputElement>document.getElementById('nomemployeid')).innerText;
	nomQuatre = nomQuatre.charAt(0);
	let prenomUn = (<HTMLInputElement>document.getElementById('prenomemployeid')).innerText;
	prenomUn = prenomUn.substring(0,3);
	ID = prenomUn.concat(nomQuatre);
	return ID;
}		

btnAfficher.addEventListener("click", async e => {
    try {
		const tableEmploye = document.getElementById("tableEmploye");
		const resultat = await fetch(url, {method: "GET"});
		const employes = await resultat.json();
		employes.forEach(t=>{
			const tr = document.createElement("tr");
			const td1 = document.createElement("td");
			const td2 = document.createElement("td");
			const td3 = document.createElement("td");
			const td4 = document.createElement("td");
			const td5 = document.createElement("td");
			td1.textContent = t.IDEmploye;
			td2.textContent = t.NomEmploye;
			td3.textContent = t.PrenomEmploye;
			td4.textContent = t.NBRHeuresMax;
			td5.textContent = t.DatEmbauche;
			tableEmploye.appendChild(tr);
			tableEmploye.appendChild(td1);
			tableEmploye.appendChild(td2);
			tableEmploye.appendChild(td3);
			tableEmploye.appendChild(td4);
			tableEmploye.appendChild(td5);
		})
    }catch (e) {
  		console.log("Impossible d'afficher les employes");
    }
});	
			