const url = "/DispoEmploye";
		
//const btnModifDispo = document.getElementById("modifdispo");
//const btnConge = document.getElementById("conge");
		
//afficherDisponibilites();
		
//Affiche automatiquement les disponilites de l'employé
window.onload = async function {
	alert("bl");
	try{		
		const tableDeDispo = document.getElementById("tableDeDispo");
		const resultat = await fetch(url, {method: "GET"});
		const dispo = await resultat.json();
		dispo.forEach(t => {
			if(t.paramtype == 1) { //Seules les disponibilités par défaut sont affichées
				typequart = t.typequart;
				joursemaine = t.joursemaine;
				disponible = t.disponibilite;					
				if(joursemaine == 1){
					if(typequart == 'J'){
						var cellule = document.getElementById("dispoJ1");
						if(disponible == 1){
							cellule.textContent = 'Oui';
						}else{
							cellule.textContent = 'Non';
						}
					}else if(typequart == 'S'){
						var cellule = document.getElementById("dispoS1");
						if(disponible == 1){
							cellule.textContent = 'Oui';
						}else{
							cellule.textContent = 'Non';
						}
					}else if(typequart == 'N'){
						var cellule = document.getElementById("dispoN1");
						if(disponible == 1){
							cellule.textContent = 'Oui';
						}else{
							cellule.textContent = 'Non';
						}
					}
				}else if(joursemaine == 2){
					if(typequart == 'J'){
						var cellule = document.getElementById("dispoJ2");
						if(disponible == 1){
							cellule.textContent = 'Oui';
						}else{
							cellule.textContent = 'Non';
						}
					}else if(typequart == 'S'){
						var cellule = document.getElementById("dispoS2");
						if(disponible == 1){
							cellule.textContent = 'Oui';
						}else{
							cellule.textContent = 'Non';
						}
					}else if(typequart == 'N'){
						var cellule = document.getElementById("dispoN2");
						if(disponible == 1){
							cellule.textContent = 'Oui';
						}else{
							cellule.textContent = 'Non';
						}
					}
				}else if(joursemaine == 3){
					if(typequart == 'J'){
						var cellule = document.getElementById("dispoJ3");
						if(disponible == 1){
							cellule.textContent = 'Oui';
						}else{
							cellule.textContent = 'Non';
						}
					}else if(typequart == 'S'){
						var cellule = document.getElementById("dispoS3");
						if(disponible == 1){
							cellule.textContent = 'Oui';
						}else{
							cellule.textContent = 'Non';
						}
					}else if(typequart == 'N'){
						var cellule = document.getElementById("dispoN3");
						if(disponible == 1){
							cellule.textContent = 'Oui';
						}else{
							cellule.textContent = 'Non';
						}
					}
				}else if(joursemaine == 4){
					if(typequart == 'J'){
						var cellule = document.getElementById("dispoJ4");
						if(disponible == 1){
							cellule.textContent = 'Oui';
						}else{
							cellule.textContent = 'Non';
						}
					}else if(typequart == 'S'){
						var cellule = document.getElementById("dispoS4");
						if(disponible == 1){
							cellule.textContent = 'Oui';
						}else{
							cellule.textContent = 'Non';
						}
					}else if(typequart == 'N'){
						var cellule = document.getElementById("dispoN4");
						if(disponible == 1){
							cellule.textContent = 'Oui';
						}else{
							cellule.textContent = 'Non';
						}
					}
				}else if(joursemaine == 5){
					if(typequart == 'J'){
						var cellule = document.getElementById("dispoJ5");
						if(disponible == 1){
							cellule.textContent = 'Oui';
						}else{
							cellule.textContent = 'Non';
						}
					}else if(typequart == 'S'){
						var cellule = document.getElementById("dispoS5");
						if(disponible == 1){
							cellule.textContent = 'Oui';
						}else{
							cellule.textContent = 'Non';
						}
					}else if(typequart == 'N'){
						var cellule = document.getElementById("dispoN5");
						if(disponible == 1){
							cellule.textContent = 'Oui';
						}else{
							cellule.textContent = 'Non';
						}
					}
				}
			}
		});
	} catch(e) {
		console.log("Impossible d'afficher les disponibilites");
	}	
}

		
async function modifierDisponibilites() {
	supprimerDisponibilites();	//Les anciennes disponibilités par défaut sont supprimées
			
	//Les nouvelles disponibilité par défaut sont entrées dans la base de données
	if (document.getElementById("J1").checked) {
		modifierDisponibilite('J', '1', '1');
	}else {
		modifierDisponibilite('J', '1', '0');
	}				
	if (document.getElementById("S1").checked) {
		modifierDisponibilite('S', '1', '1');
	}else {
		modifierDisponibilite('S', '1', '0');
	}				
	if (document.getElementById("N1").checked) {
		modifierDisponibilite('N', '1', '1');
			}else {
				modifierDisponibilite('N', '1', '0');
			}				
			if (document.getElementById("J2").checked) {
				modifierDisponibilite('J', '2', '1');
			}else {
				modifierDisponibilite('J', '2', '0');
			}				
			if (document.getElementById("S2").checked) {
				modifierDisponibilite('S', '2', '1');
			}else {
				modifierDisponibilite('S', '2', '0');
			}				
			if (document.getElementById("N2").checked) {
				modifierDisponibilite('N', '2', '1');
			}else {
				modifierDisponibilite('N', '2', '0');
			}				
			if (document.getElementById("J3").checked) {
				modifierDisponibilite('J', '3', '1');
			}else {
				modifierDisponibilite('J', '3', '0');
			}	
			if (document.getElementById("S3").checked) {
				modifierDisponibilite('S', '3', '1');
			}else {
				modifierDisponibilite('S', '3', '0');
			}
			if (document.getElementById("N3").checked) {
			modifierDisponibilite('N', '3', '1');
			}else {
				modifierDisponibilite('N', '3', '0');
			}				
			if (document.getElementById("J4").checked) {
				modifierDisponibilite('J', '4', '1');
			}else {
				modifierDisponibilite('J', '4', '0');
			}				
			if (document.getElementById("S4").checked) {
				modifierDisponibilite('S', '4', '1');
			}else {
				modifierDisponibilite('S', '4', '0');
			}				
			if (document.getElementById("N4").checked) {
				modifierDisponibilite('N', '4', '1');
			}else {
				modifierDisponibilite('N', '4', '0');
			}				
			if (document.getElementById("J5").checked) {
				modifierDisponibilite('J', '5', '1');
			}else {
				modifierDisponibilite('J', '5', '0');
			}
			if (document.getElementById("S5").checked) {
				modifierDisponibilite('S', '5', '1');
			}else {
				modifierDisponibilite('S', '5', '0');
			}				
			if (document.getElementById("N5").checked) {
				modifierDisponibilite('N', '5', '1');
			}else {
				modifierDisponibilite('N', '5', '0');
			}
		}
		
async function supprimerDisponibilites(){
	const resultat = await fetch(url, {method: "DELETE", 
        headers: { "content-type": "application/json"} }); 
       const success = await resultat.json();
	if(success.success) {
		alert("Disponibilités supprimées avec succès!");
	} else {
		alert("Echec supression disponiblités");
	}
}
	
async function modifierDisponibilite(typequart, joursemaine, dispo) {
	const jsonDispo = {};	
	jsonDispo.typequart = typequart;
	jsonDispo.joursemaine = joursemaine;
	jsonDispo.dispo = dispo;
	console.log(jsonDispo)
	const result = await fetch(url, {
		method: 'POST', 
		headers: { 
			'Accept': 'application/json',
			'Content-Type': 'application/json'
	}, 
		body: JSON.stringify(jsonDispo) })
	const success = await result.json();
	if (!success.success){
		alert("Impossible d'entrer les disponiblités de l'employé dans la base de données")
	} else {
		alert("Les disponibilités ont été entrées")
	}
}	
		
		async function demanderConge() {
			var date = document.getElementById('dateconge').value; 
			var dateConge = new Date(date);
			dateConge.setMinutes(dateConge.getMinutes() + dateConge.getTimezoneOffset()); //Permet d'avoir la bonne date enregistrée 
			jourDeLaSemaine = dateConge.getDay();
			if(jourDeLaSemaine == 0 || jourDeLaSemaine == 6){
				alert("Impossible de demander un congé pour un jour de fin de semaine");
			}else {
				if(dateConge.getDay() == 1){
					alert("1");
					if(document.getElementById("congeJ").checked){
						ajouterConge(dateConge, '1', 'J');
					}
					if(document.getElementById("congeS").checked){
						ajouterConge(dateConge, '1', 'S');
					}
					if(document.getElementById("congeN").checked){
						ajouterConge(dateConge, '1', 'N');
					}				
				}else if(dateConge.getDay() == 2){
					dateAjuste = new Date(dateConge); 
					dateAjuste.setDate(dateAjuste.getDate() - 1);
					if(document.getElementById("congeJ").checked){
					ajouterConge(dateAjuste, '2', 'J');
					}
					if(document.getElementById("congeS").checked){
						ajouterConge(dateAjuste, '2', 'S');
					}
					if(document.getElementById("congeN").checked){
						ajouterConge(dateAjuste, '2', 'N');
					}
				}else if(dateConge.getDay() == 3){
					dateAjuste = new Date(dateConge); 
					dateAjuste.setDate(dateAjuste.getDate() - 2);
					if(document.getElementById("congeJ").checked){
						ajouterConge(dateAjuste, '3', 'J');
					}
					if(document.getElementById("congeS").checked){
						ajouterConge(dateAjuste, '3', 'S');
					}
					if(document.getElementById("congeN").checked){
						ajouterConge(dateAjuste, '3', 'N');
					}
				}else if(dateConge.getDay() == 4){
					dateAjuste = new Date(dateConge); 
					dateAjuste.setDate(dateAjuste.getDate() - 3);
					if(document.getElementById("congeJ").checked){
						ajouterConge(dateAjuste, '4', 'J');
					}
					if(document.getElementById("congeS").checked){
						ajouterConge(dateAjuste, '4', 'S');
					}
					if(document.getElementById("congeN").checked){
						ajouterConge(dateAjuste, '4', 'N');
					}
				}else if(dateConge.getDay() == 5){
					dateAjuste = new Date(dateConge); 
					dateAjuste.setDate(dateAjuste.getDate() - 4);
					if(document.getElementById("congeJ").checked){
						ajouterConge(dateAjuste, '5', 'J');
					}
					if(document.getElementById("congeS").checked){
						ajouterConge(dateAjuste, '5', 'S');
					}
					if(document.getElementById("congeN").checked){
						ajouterConge(dateAjuste, '5', 'N');
					}
				}
			}
		}

async function ajouterConge(date, joursemaine, typequart){
	const jsonConge = {};
	jsonConge.dateconges = date;
	jsonConge.joursemaine = joursemaine;
	jsonConge.typequart = typequart;
	console.log(jsonConge);
	const result = await fetch('/Conge', {
		method: 'POST', 
		headers: { 
		'Accept': 'application/json',
			'Content-Type': 'application/json'
	}, 
	body: JSON.stringify(jsonConge) })
	const success = await result.json();
	if (!success.success){
		alert("Impossible d'entrer le congé dans la base de données")
	} else {
		alert("Le congé a été entré avec succès!")
	}
}
		