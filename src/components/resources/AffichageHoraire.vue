<template>
    <div class="w3-main" style="margin-left:250px">
        <div class="w3-row w3-padding-64">
            <div class="w3-twothird w3-container">
                <h1 class="w3-text-teal">Affichage de L'horaire</h1>
                <h3>Choisissez l'horaire a afficher selon :</h3>

                <p><b>Choisir par nom:</b></p>
                <select v-model="selectionne" @change="afficherHoraireSelonID()">
                    <option v-for="nom in nomsHoraire" v-bind:key="nom.idtablehoraire">
                        {{ nom.idtablehoraire }}
                     </option>
                </select>
                <br/>
                <p><b>Choisir par date:</b></p>
                <datepicker v-model="datehoraire" name="datehoraire"></datepicker>
                <br/>
                <button @click="afficherHoraireSelonDate" class="btn btn-primary">Afficher</button>

                <br/>
                <p v-if="afficherHoraire">Voici l'horaire</p>
                <table id="horaire" v-if="afficherHoraire">
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
                        <tr>
                                <td>Lundi soir</td>
                                <td v-for="employe in lundiSoir">{{employe.nomemploye}}</td>
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
                        </tr>
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
    computed: {
        lundiSoir: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Lundi" && emp.typequart == "Soir"
            })
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
    th, td {
      border-bottom: 1px solid #ddd;
      padding: 5px;
      text-align: left;
    }
    table#horaire {
        width: 100%;
    }
</style>
