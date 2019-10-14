import * as _ from 'lodash';

let url = "/Employe";


const btnCreer = <HTMLButtonElement>document.getElementById("btncreeremploye");
const btnAfficher = <HTMLButtonElement>document.getElementById("btnchercheremploye");
const btnCongedier = document.getElementById("btncongediement"); 


btnCreer.addEventListener("click", async (e:Event) => {
	
	const jsonEmp: any = {};
	jsonEmp.IDEmploye = creerIDEmploye();
	jsonEmp.NomEmploye = (<HTMLInputElement>document.getElementById('nomemployeid')).innerText;
	jsonEmp.PrenomEmploye = (<HTMLInputElement>document.getElementById('prenomemployeid')).innerText;
	let nbrHeures = (<HTMLInputElement>document.getElementById('nbheuresmaxid')).innerText;
	jsonEmp.NBRHeuresMax = +nbrHeures;
	jsonEmp.DateEmbauche = (<HTMLInputElement>document.getElementById('dateembauche')).innerText;
	jsonEmp.MotDePasse = (<HTMLInputElement>document.getElementById('motdepasse')).innerText;
    
      	  	
		const result = await fetch(url, {method: "POST", 
			headers: { "content-type": "application/json"}, body: JSON.stringify(jsonEmp) })
		const success = await result.json();
		if (success) {
			alert("L'employé a été ajouté!");
		} else {
			console.log("impossible d'afficher les employés")
		}	
})

function creerIDEmploye() {
	let ID: String;
	let nom = (<HTMLInputElement>document.getElementById('nomemployeid')).innerText;
	let nomQuatre = nom.substring(0,3);
	let prenom = (<HTMLInputElement>document.getElementById('prenomemployeid')).innerText;
	let prenomUn = prenom.charAt(0);
	ID = prenomUn.concat(nomQuatre);
	return ID;
}		

btnAfficher.addEventListener("click", async (e:Event) => {
    try {
    	alert("B");
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
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);
		})
    }catch (e) {
  		console.log("Impossible d'afficher les employes");
    }
});	


btnCongedier.onclick = function(event) {
	alert("Message d'alerte");
}

		