<template>
    <div class="w3-main" style="margin-left:250px">
        <div class="w3-row w3-padding-64">
            <div class="w3-twothird w3-container">
                <br/>
                <h1 class="w3-text-teal">Disponibilités</h1>

                <button @click="toggleAfficherDispos" class="btn btn-primary">Afficher mes disponibilités</button>
                <table v-if="afficherDispos">
                    <thead>
                        <th>Type de quart de travail</th>
                        <th>Jour</th>
                        <th>Soir</th>
                        <th>Nuit</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="journee">Lundi</td>
                            <td> <p v-if="dispoJ1 === '1'">Oui</p> <p v-else>Non</p> </td>
                            <td> <p v-if="dispoS1 === '1'">Oui</p> <p v-else>Non</p> </td>
                            <td> <p v-if="dispoN1 === '1'">Oui</p> <p v-else>Non</p> </td>
                        </tr>
                        <tr>
                            <td class="journee">Mardi</td>
                            <td> <p v-if="dispoJ2 === '1'">Oui</p> <p v-else>Non</p> </td>
                            <td> <p v-if="dispoS2 === '1'">Oui</p> <p v-else>Non</p> </td>
                            <td> <p v-if="dispoN2 === '1'">Oui</p> <p v-else>Non</p> </td>
                        </tr>
                        <tr>
                            <td class="journee">Mercredi</td>
                            <td> <p v-if="dispoJ3 === '1'">Oui</p> <p v-else>Non</p> </td>
                            <td> <p v-if="dispoS3 === '1'">Oui</p> <p v-else>Non</p> </td>
                            <td> <p v-if="dispoN3 === '1'">Oui</p> <p v-else>Non</p> </td>
                        </tr>
                        <tr>
                            <td class="journee">Jeudi</td>
                            <td> <p v-if="dispoJ4 === '1'">Oui</p> <p v-else>Non</p> </td>
                            <td> <p v-if="dispoS4 === '1'">Oui</p> <p v-else>Non</p> </td>
                            <td> <p v-if="dispoN4 === '1'">Oui</p> <p v-else>Non</p> </td>
                        </tr>
                        <tr>
                            <td class="journee">Vendredi</td>
                            <td> <p v-if="dispoJ5 === '1'">Oui</p> <p v-else>Non</p> </td>
                            <td> <p v-if="dispoS5 === '1'">Oui</p> <p v-else>Non</p> </td>
                            <td> <p v-if="dispoN5 === '1'">Oui</p> <p v-else>Non</p> </td>
                        </tr>
                    </tbody>
                </table>
                <b-table striped hover :items="heuresmax" v-if="afficherDispos"></b-table>
                <h1 class="w3-text-teal">Modifier mes disponibilités</h1>
                <b-form @submit.prevent="changerDispos">
                    <b-form-group id="dispo" label="Veuillez cocher vos nouvelles disponibilités:">
                        <b-form-checkbox-group v-model="formDataDispos.checked" id="dispo">
                            Lundi:
                            <br/>
                            <b-form-checkbox value="J1">Jour</b-form-checkbox>
                            <b-form-checkbox value="S1">Soir</b-form-checkbox>
                            <b-form-checkbox value="N1">Nuit</b-form-checkbox>
                            <br/>Mardi:
                            <br/>
                            <b-form-checkbox value="J2">Jour</b-form-checkbox>
                            <b-form-checkbox value="S2">Soir</b-form-checkbox>
                            <b-form-checkbox value="N2">Nuit</b-form-checkbox>
                            <br/>Mercredi:
                            <br/>
                            <b-form-checkbox value="J3">Jour</b-form-checkbox>
                            <b-form-checkbox value="S3">Soir</b-form-checkbox>
                            <b-form-checkbox value="N3">Nuit</b-form-checkbox>
                            <br/>Jeudi:
                            <br/>
                            <b-form-checkbox value="J4">Jour</b-form-checkbox>
                            <b-form-checkbox value="S4">Soir</b-form-checkbox>
                            <b-form-checkbox value="N4">Nuit</b-form-checkbox>
                            <br/>Vendredi:
                            <br/>
                            <b-form-checkbox value="J5">Jour</b-form-checkbox>
                            <b-form-checkbox value="S5">Soir</b-form-checkbox>
                            <b-form-checkbox value="N5">Nuit</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                    <b-button type="submit" variant="primary">Modifier</b-button>
                </b-form>

                <h1 class="w3-text-teal">Demander un congé</h1>
                <b-form @submit.prevent="demanderConge">
                    <b-form-group id="dateconge" label="Date du congé:">
                        <datepicker v-model="dateconge" name="dateconge"></datepicker>
                    </b-form-group>
                    <b-form-group id="quart" label="Veuillez cocher le(s) quart(s) pour lequel(lesquels) vous n'êtes pas disponible cette date-là:">
                        <b-form-checkbox-group v-model="formDataConge.checked" id="dispo">
                            <b-form-checkbox value="J">Jour</b-form-checkbox>
                            <b-form-checkbox value="S">Soir</b-form-checkbox>
                            <b-form-checkbox value="N">Nuit</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                    <b-button type="submit" variant="primary">Faire la demande</b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker'
    export default {
        components: {
            Datepicker
        },
        data() {
            return {
                afficherDispos: false,
                heuresmax: null,
                dispos: null,
                dateconge: null,
                formDataDispos: {
                    checked: []
                },
                formDataConge: {
                    checked: []
                },
                fields: [
                    {key: 'joursemaine', label: 'Jour de la semaine', sortable: true},
                    {key: 'typequart', label: 'Type de quart', sortable: true},
                    {key: 'disponibilite', label: 'Disponibilité', sortable: true}
                ]
            }
        },
        computed: {
            dispoJ1: function() {
                return (this.dispos.filter(function(dispo) {return dispo.joursemaine == 1 && dispo.typequart == "J"}))[0].disponibilite;
            },
            dispoS1: function() {
                return (this.dispos.filter(function(dispo) {return dispo.joursemaine == 1 && dispo.typequart == "S"}))[0].disponibilite;
            },
            dispoN1: function() {
                return (this.dispos.filter(function(dispo) {return dispo.joursemaine == 1 && dispo.typequart == "N"}))[0].disponibilite;
            },
            dispoJ2: function() {
                return (this.dispos.filter(function(dispo) {return dispo.joursemaine == 2 && dispo.typequart == "J"}))[0].disponibilite;
            },
            dispoS2: function() {
                return (this.dispos.filter(function(dispo) {return dispo.joursemaine == 2 && dispo.typequart == "S"}))[0].disponibilite;
            },
            dispoN2: function() {
                return (this.dispos.filter(function(dispo) {return dispo.joursemaine == 2 && dispo.typequart == "N"}))[0].disponibilite;
            },
            dispoJ3: function() {
                return (this.dispos.filter(function(dispo) {return dispo.joursemaine == 3 && dispo.typequart == "J"}))[0].disponibilite;
            },
            dispoS3: function() {
                return (this.dispos.filter(function(dispo) {return dispo.joursemaine == 3 && dispo.typequart == "S"}))[0].disponibilite;
            },
             dispoN3: function() {
                 return (this.dispos.filter(function(dispo) {return dispo.joursemaine == 3 && dispo.typequart == "N"}))[0].disponibilite;
             },
            dispoJ4: function() {
                return (this.dispos.filter(function(dispo) {return dispo.joursemaine == 4 && dispo.typequart == "J"}))[0].disponibilite;
            },
            dispoS4: function() {
                return (this.dispos.filter(function(dispo) {return dispo.joursemaine == 4 && dispo.typequart == "S"}))[0].disponibilite;
            },
            dispoN4: function() {
                return (this.dispos.filter(function(dispo) {return dispo.joursemaine == 4 && dispo.typequart == "N"}))[0].disponibilite;
            },
            dispoJ5: function() {
                return (this.dispos.filter(function(dispo) {return dispo.joursemaine == 5 && dispo.typequart == "J"}))[0].disponibilite;
            },
            dispoS5: function() {
                return (this.dispos.filter(function(dispo) {return dispo.joursemaine == 5 && dispo.typequart == "S"}))[0].disponibilite;
            },
            dispoN5: function() {
                return (this.dispos.filter(function(dispo) {return dispo.joursemaine == 5 && dispo.typequart == "N"}))[0].disponibilite;
            }
        },
        mounted: function() {
            fetch('/DispoEmploye', {
                    method: 'GET'
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.dispos = data
            })
            .catch(error => {
                console.log(error);
            });
            fetch('/HeureEmploye', {
                    method: 'GET'
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.heuresmax = data
            })
            .catch(error => {
                console.log(error);
            });
        },
        methods: {
              changerDispos() {
                const jsonEmp = {};
                jsonEmp.dispo = this.formDataDispos.checked;
                fetch('/DispoEmploye', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonEmp)
                })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    console.log(data);
                }).catch(error => {
                    console.log(error);
                });
                this.$router.push("/success");
            },
            demanderConge() {
                var date = this.dateconge;
                var dateConge = new Date(date);
                var jourDeLaSemaine = dateConge.getDay();
                if(jourDeLaSemaine == 0 || jourDeLaSemaine == 6){
                    alert("Impossible de demander un congé pour un jour de fin de semaine");
                    dateConge = null;
                }else {
                    if(jourDeLaSemaine == 2) {
                        dateConge.setDate(dateConge.getDate() - 1); //La date enregistré est toujours le lundi de cette semaine là
                    }else if(jourDeLaSemaine == 3) {
                        dateConge.setDate(dateConge.getDate() - 2); //La date enregistré est toujours le lundi de cette semaine là
                    }else if(jourDeLaSemaine == 4) {
                        dateConge.setDate(dateConge.getDate() - 3); //La date enregistré est toujours le lundi de cette semaine là
                    }else if(jourDeLaSemaine == 5) {
                        dateConge.setDate(dateConge.getDate() - 4); //La date enregistré est toujours le lundi de cette semaine là
                    }
                }
                console.log(dateConge + ", " + dateConge.getDay());
                if(dateConge != null) {
                    const jsonEmp = {};
                    jsonEmp.dateconge = dateConge;
                    jsonEmp.joursemaine = jourDeLaSemaine;
                    jsonEmp.dispo = this.formDataConge.checked;
                    fetch('/Conge', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(jsonEmp)
                    })
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        console.log(data);
                    }).catch(error => {
                        console.log(error);
                    });
                    this.$router.push("/success");
                }
            },
            toggleAfficherDispos() {
                this.afficherDispos = !this.afficherDispos;
            }
        }
    }
</script>

<style scoped>
    .btn {
        background-color: grey;
        border: none;
        margin: 5px 0;
    }
    th, td {
      border-bottom: 1px solid #ddd;
      padding: 5px;
      text-align: left;
    }
    table {
        width: 100%;
    }
    .journee {
        font-weight: bold;
    }
</style>
