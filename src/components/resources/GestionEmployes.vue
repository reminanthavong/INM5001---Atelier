<template>
    <div class="w3-main" style="margin-left:250px">
        <div class="w3-row w3-padding-64">
            <div class="w3-twothird w3-container">
                <br/>
                <br/>
                <h1 class="w3-text-teal">Rechercher des employés</h1>

                <button @click="toggleAfficherEmployes" class="btn btn-primary" id="testbouton1">Afficher tous les employés</button>
                <p class="bouton-affichage" v-if="afficherEmployes">Veuillez cliquer sur un employé pour le modifier</p>
                <b-table striped hover :items="employes" :fields="fields" v-if="afficherEmployes" @row-clicked="modifierEmploye" selectable>
                </b-table>

                <h1 class="w3-text-teal">Ajouter un employé</h1>
                <b-form @submit.prevent="ajouterEmploye">
                    <b-form-group id="nomemploye" label="Nom:" label-for="nom">
                        <b-form-input id="nomemploye" v-model="nomemploye" required pattern="[a-zA-Z]{4,20}" placeholder="Nom (entre 4 et 20 caractères)" />
                    </b-form-group>

                    <b-form-group id="prenomemploye" label="Prénom:" label-for="prenom">
                        <b-form-input id="prenomemploye" v-model="prenomemploye" required pattern="[a-zA-Z]{4,20}" placeholder="Prenom (entre 4 et 20 caractères)" />
                    </b-form-group>

                    <b-form-group id="nbrquartsmax" label="Nombre de quarts de travail maximum par semaine:" label-for="quarts">
                        <b-form-input id="nbrquartsmax" v-model="nbrquartsmax" required pattern='[0-9]{1,2}' placeholder="Un nombre entre 1 et 15" />
                    </b-form-group>

                    <b-form-group id="dateembauche" label="Date d'embauche:">
                        <datepicker v-model="dateembauche" name="dateembauche"></datepicker>
                    </b-form-group>

                    <b-form-group id="motdepasse" label="Veuillez créer un mot de passe:" label-for="motdepasse">
                        <b-form-input id="motdepasse" v-model="motdepasse" required pattern='[a-zA-Z0-9]{1,6}' placeholder="alphanumérique (entre 1 et 6 caractères)" />
                    </b-form-group>

                    <b-form-group id="dispo" label="Veuillez cocher les disponibilités de l'employé:">
                        <b-form-checkbox-group v-model="formDataAjouterDisponibilites.checked" id="dispo">
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
                            <b-form-checkbox value="32">Nuit</b-form-checkbox>
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

                    <b-button type="submit" variant="primary">Ajouter</b-button>
                </b-form>

                <h1 class="w3-text-teal">Congédier un employé</h1>
                <b-form @submit.prevent="congedierEmploye">
                    <b-form-group id="congedierEmploye" label="Identifiant de l'employé à congédier:" label-for="congedier">
                        <b-form-input id="identifiant" v-model="formDataCongediement" required placeholder="Identifiant à 5 lettres" />
                    </b-form-group>
                    <b-button type="submit" variant="primary">Congédier</b-button>
                </b-form>

            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker'
    export default {
        name: 'gestionEmployes',
        components: {
            Datepicker
        },
        data: function() {
            return {
                employes: null,
                afficherEmployes: false,
                formDataCongediement: null,
                idemploye: null,
                nomemploye: null,
                prenomemploye: null,
                nbrquartsmax: null,
                dateembauche: null,
                motdepasse: null,
                formDataAjouterDisponibilites: {
                    checked: []
                },
                fields: [
                    {key: 'idemploye', label: 'Identifiant', sortable: true},
                    {key: 'nomemploye', label: 'Nom', sortable: true},
                    {key: 'prenomemploye', label: 'Prenom', sortable: true},
                    {key: 'nbrquartsmax', label: 'Nombre de quarts de travail', sortable: true},
                    {key: 'dateembauche', label: 'Date de son embauche', sortable: true}
                ]
            }
        },
        mounted: function() {},
        methods: {
            toggleAfficherEmployes() {
                fetch('/Employe', {
                    method: 'GET'
                })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    this.employes = data
                }).catch(error => {
                    console.log(error);
                });
                this.afficherEmployes = !this.afficherEmployes;
            },
            congedierEmploye() {
                const jsonRequest = {};
                jsonRequest.idemploye = this.formDataCongediement.toUpperCase();
                fetch('/Employe', {
                    method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(jsonRequest)
                })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    console.log(data);
                })
                .catch(error => {
                    console.log(error);
                });
                this.$router.push("/success");
            },
                ajouterEmploye() {
                    var date = this.dateembauche;
                    var dateAjustee = new Date(date);
                    dateAjustee.setMinutes(dateAjustee.getMinutes() + dateAjustee.getTimezoneOffset()); //Permet d'avoir la bonne date sans influence du fuseau horaire
                    const jsonEmp = {};
                    jsonEmp.nomemploye = this.nomemploye.toUpperCase();
                    jsonEmp.prenomemploye = this.prenomemploye.toUpperCase();
                    jsonEmp.nbrquartsmax = this.nbrquartsmax;
                    jsonEmp.dateembauche = dateAjustee;
                    jsonEmp.motdepasse = this.motdepasse;
                    jsonEmp.dispo = this.formDataAjouterDisponibilites.checked;
                    fetch('/Employe', {
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
                modifierEmploye() {
                    alert("Fonctionnalité en cours de dévelopement");
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
</style>
