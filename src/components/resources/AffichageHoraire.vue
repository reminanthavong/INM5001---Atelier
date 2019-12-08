<template>
    <div class="w3-main" style="margin-left:250px">
        <div class="w3-row w3-padding-64">
            <div class="w3-twothird w3-container">
                <h1 class="w3-text-teal">Affichage de L'horaire</h1>
                <h3>Choisissez l'horaire a afficher selon :</h3>

                <table id="choixpourafficherhoraire" style="width:100%">
                    <tr>
                        <th>Nom de l'horaire:</th>
                    </tr>
                    <tr>
                        <td>
                            <select v-model="selectionne" @change="afficherHoraireSelonID()">
                                <option v-for="nom in nomsHoraire" v-bind:key="nom.idtablehoraire">
                                    {{ nom.idtablehoraire }}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Date de l'horaire:</th>
                    </tr>
                    <tr>
                        <td>
                            <datepicker v-model="datehoraire" name="datehoraire"></datepicker>
                        </td>
                        <td>
                            <button @click="afficherHoraireSelonDate" class="btn btn-primary">Afficher</button>
                        </td>
                    </tr>
                </table>
                <br/>
                <p v-if="afficherHoraire">Voici l'horaire</p>
                <b-table striped hover :items="horaire" v-if="afficherHoraire">
                </b-table>

                <p v-if="afficherHoraire">Tentative d'affichage différent</p>
                <table v-if="afficherHoraire">
                    <thead>
                        <th>Type de quart de travail</th>
                        <th>Employés</th>
                    </thead>
                    <tbody>
                        <tr v-for="employe in horaire" v-bind:key="employe.nomemploye">
                            <template v-if="employe.joursemaine === 'Lundi' && employe.typequart === 'Jour'">
                                <td>Lundi jour</td>
                                <td>{{employe.nomemploye}}</td>
                            </template>
                        </tr>
                        <tr v-for="employe in horaire" v-bind:key="employe.nomemploye">
                            <template v-if="employe.joursemaine === 'Lundi' && employe.typequart === 'Soir'">
                                <td>Lundi soir</td>
                                <td>{{employe.nomemploye}}</td>
                            </template>
                        </tr>
                        <tr v-for="employe in horaire" v-bind:key="employe.nomemploye">
                            <template v-if="employe.joursemaine === 'Lundi' && employe.typequart === 'Nuit'">
                                <td>Lundi nuit</td>
                                <td>{{employe.nomemploye}}</td>
                            </template>
                        </tr>
                        <tr v-for="employe in horaire" v-bind:key="employe.nomemploye">
                            <template v-if="employe.joursemaine === 'Mardi' && employe.typequart === 'Jour'">
                                <td>Mardi jour</td>
                                <td>{{employe.nomemploye}}</td>
                            </template>
                        </tr>
                        <tr v-for="employe in horaire" v-bind:key="employe.nomemploye">
                            <template v-if="employe.joursemaine === 'Mardi' && employe.typequart === 'Soir'">
                                <td>Mardi soir</td>
                                <td>{{employe.nomemploye}}</td>
                            </template>
                        </tr>
                        <tr v-for="employe in horaire" v-bind:key="employe.nomemploye">
                            <template v-if="employe.joursemaine === 'Mardi' && employe.typequart === 'Nuit'">
                                <td>Mardi nuit</td>
                                <td>{{employe.nomemploye}}</td>
                            </template>
                        </tr>
                        <tr v-for="employe in horaire" v-bind:key="employe.nomemploye">
                            <template v-if="employe.joursemaine === 'Mercredi' && employe.typequart === 'Jour'">
                                <td>Mercredi jour</td>
                                <td>{{employe.nomemploye}}</td>
                            </template>
                        </tr>
                        <tr v-for="employe in horaire" v-bind:key="employe.nomemploye">
                            <template v-if="employe.joursemaine === 'Mercredi' && employe.typequart === 'Soir'">
                                <td>Mercredi soir</td>
                                <td>{{employe.nomemploye}}</td>
                            </template>
                        </tr>
                        <tr v-for="employe in horaire" v-bind:key="employe.nomemploye">
                            <template v-if="employe.joursemaine === 'Mercredi' && employe.typequart === 'Nuit'">
                                <td>Mercredi nuit</td>
                                <td>{{employe.nomemploye}}</td>
                            </template>
                        </tr>
                        <tr v-for="employe in horaire" v-bind:key="employe.nomemploye">
                            <template v-if="employe.joursemaine === 'Jeudi' && employe.typequart === 'Jour'">
                                <td>Jeudi jour</td>
                                <td>{{employe.nomemploye}}</td>
                            </template>
                        </tr> ***
                        <tr v-for="employe in horaire" v-bind:key="employe.nomemploye">
                            <template v-if="employe.joursemaine === 'Jeudi' && employe.typequart === 'Soir'">
                                <td>Jour soir</td>
                                <td>{{employe.nomemploye}}</td>
                            </template>
                        </tr>
                        <tr v-for="employe in horaire" v-bind:key="employe.nomemploye">
                            <template v-if="employe.joursemaine === 'Jeudi' && employe.typequart === 'Nuit'">
                                <td>Jeudi nuit</td>
                                <td>{{employe.nomemploye}}</td>
                            </template>
                        </tr>
                        <tr v-for="employe in horaire" v-bind:key="employe.nomemploye">
                            <template v-if="employe.joursemaine === 'Vendredi' && employe.typequart === 'Jour'">
                                <td>Vendredi jour</td>
                                <td>{{employe.nomemploye}}</td>
                            </template>
                        </tr>
                        <tr v-for="employe in horaire" v-bind:key="employe.nomemploye">
                            <template v-if="employe.joursemaine === 'Vendredi' && employe.typequart === 'Soir'">
                                <td>Vendredi soir</td>
                                <td>{{employe.nomemploye}}</td>
                            </template>
                        </tr>
                        <tr v-for="employe in horaire" v-bind:key="employe.nomemploye">
                            <template v-if="employe.joursemaine === 'Vendredi' && employe.typequart === 'Nuit'">
                                <td>Vendredi nuit</td>
                                <td>{{employe.nomemploye}}</td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
    name: 'affichageHoraire',
    components: {
        Datepicker
    },
    data: function() {
        return {
            selectionne: '',
            datehoraire: null,
            nomsHoraire: null,
            horaire: [],
            afficherHoraire: false,
        }
    },
    mounted: function() {
        fetch('/choixHoraire', {
             method: 'GET'
        })
        .then((response) => {
            console.log(response)
            return response.json()
        })
        .then((data) => {
            this.nomsHoraire = data
            console.log(this.nomsHoraire)
        })
        .catch(error => {
            console.log(error)
        })
    },
    methods: {
        afficherHoraireSelonDate() {
            var date = this.datehoraire;
            var dateHoraire = new Date(date)
            var jourDeLaSemaine = dateHoraire.getDay();
            if(jourDeLaSemaine != 1) {
                alert("Veuillez choisir une date correspondant à un lundi ")
            } else {
                fetch('/affichageHoraire', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({dateHoraire})
                })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    this.horaire = data
                    console.log(this.horaire)
                })
                .catch(error => {
                    console.log(error);
                });
                
            }
             this.afficherHoraire = !this.afficherHoraire
        },
        afficherHoraireSelonID() {
            var choixsemaine = this.selectionne
            fetch('/affichageHoraire', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({choixsemaine})
                })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    this.horaire = data
                    console.log(this.horaire)
                })
                .catch(error => {
                    console.log(error);
            });
            this.afficherHoraire = !this.afficherHoraire
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
