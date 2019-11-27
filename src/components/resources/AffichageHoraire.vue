<template>
    <div class="w3-main" style="margin-left:250px">
        <div class="w3-row w3-padding-64">
            <div class="w3-twothird w3-container">
                <h1 class="w3-text-teal">Affichage de L'horaire</h1></br>
                <h3>Choisissez l'horaire a afficher selon :</h3></br>

                <table id="choixpourafficherhoraire" style="width:100%">
                    <tr>
                        <th>Nom de l'horaire:</th>
                        <th>Date de l'horaire:</th>
                    </tr>
                    <tr>
                        <td>
                            <select id="listeSemaines"></select>
                        </td>
                        <td>
                            <input id='datesemaine' width="120">
                        </td>
                    </tr>
                </table>

                </br>
                </br>

                <table id="tabledesHoraire"></table>
            </div>
        </div>
    </div>
</template>
<script>
    $('#datesemaine').datepicker({
        disableDaysOfWeek: [0, 2, 3, 4, 5, 6],
        format: 'yyyy-mm-dd'
    });
    $('#datesemaine').change(async(event) => handleSelectChange2(event));
    async function chercherListeSemaine() {
        try {
            const resp = await fetch('https://testcalendrier.herokuapp.com/api/v1/semaines');
            const donnee = await resp.json();
            return JSON.parse(JSON.stringify(donnee));
        } catch (err) {
            console.log(err);
        }
    }
    async function chercherHoraire(choixsemaine) {
        console.log(choixsemaine)
        try {
            const resp = await fetch('https://testcalendrier.herokuapp.com/api/v1/horaires', {
                method: 'POST',
                body: JSON.stringify({
                    choixsemaine
                })
            });
            const donnee = await resp.json();
            return JSON.parse(JSON.stringify(donnee));
        } catch (err) {
            console.log(err);
        }
    }
    async function chercherHoraire2(choixdate) {
        console.log(choixdate)
        try {
            const resp = await fetch('https://testcalendrier.herokuapp.com/api/v1/horaires', {
                method: 'POST',
                body: JSON.stringify({
                    choixdate
                })
            });
            const donnee = await resp.json();
            return JSON.parse(JSON.stringify(donnee));
        } catch (err) {
            console.log(err);
        }
    }
    async function handleSelectChange(event) {
        console.log(event)
        const resp = await chercherHoraire(event.target.value);
        console.log(resp);
        GenerationTableau(resp)
    }
    async function handleSelectChange2(event) {
        console.log(event)
        const resp = await chercherHoraire2(event.target.value);
        console.log(resp);
        GenerationTableau(resp)
    }
    //Fonction de generation du tableau	
    function GenerationTableau(donnees) {
        const tabledesHoraire = document.getElementById("tabledesHoraire");
        if (donnees.horaires.length === 0) {
            tabledesHoraire.innerHTML = '';
            return;
        }
        const trametableau = ['LundiJour', 'LundiSoir', 'LundiNuit', 'MardiJour', 'MardiSoir', 'MardiNuit', 'MercrediJour', 'MercrediSoir', 'MercrediNuit', 'JeudiJour', 'JeudiSoir', 'JeudiNuit', 'VendrediJour', 'VendrediSoir', 'VendrediNuit']
        let lignes = `<tr>
    <th colspan="1">Employe</th>
    <th colspan="3">Lundi</th>
	<th colspan="3">Mardi</th>
	<th colspan="3">Mercredi</th>
	<th colspan="3">Jeudi</th>
	<th colspan="3">Vendredi</th>
  </tr>
  <tr>
    <td></td>
    <td>Jour</td>
    <td>Soir</td>
	<td>Nuit</td>
	<td>Jour</td>
    <td>Soir</td>
	<td>Nuit</td>
    <td>Jour</td>
    <td>Soir</td>
	<td>Nuit</td>
	<td>Jour</td>
    <td>Soir</td>
	<td>Nuit</td>
	<td>Jour</td>
    <td>Soir</td>
	<td>Nuit</td>
  </tr>`
        for (const d of donnees.horaires) {
            lignes = lignes + `<tr><td>${d.nomemploye}</td>`
            for (const t of trametableau) {
                if (t === d.joursemaine + d.typequart) {
                    lignes = lignes + '<td>✔️</td>';
                } else {
                    lignes = lignes + '<td></td>';
                }
            }
            lignes = lignes + '</tr>'
        }
        tabledesHoraire.innerHTML = lignes;
    }

    (async() => {
        const resp = await chercherListeSemaine();
        console.log(resp);
        const selectListeSemaines = document.getElementById("listeSemaines");
        selectListeSemaines.addEventListener("change", async(event) => handleSelectChange(event));
        const choix = resp.choixSemaines;
        let options = `<option value="000">000</option>`;
        for (const c of choix) {
            const nvelleOption = `<option value="${c['idtablehoraire']}">${c['idtablehoraire']}</option>`;
            options = options + nvelleOption;
        }
        const selectDateSemaine = document.getElementById("datesemaine");
        selectDateSemaine.addEventListener("change", async(event) => handleSelectChange2(event));
        console.log(options);
        selectListeSemaines.innerHTML = options;
    })()
</script>
