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
                <p></p>
                <p><b>Choisir par date:</b></p>
                <datepicker v-model="datehoraire" name="datehoraire"></datepicker>
                <button @click="afficherHoraireSelonDate" class="btn btn-primary">Afficher</button>

                <p></p>
                <p v-if="afficherHoraire">Voici l'horaire</p>
                <table id="horaire" v-if="afficherHoraire">
                    <thead>
                        <th>Type de quart de travail</th>
                        <th>Employés</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Lundi jour</td>
                            <td><p v-for="employe in lundiJour" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p></td>
                        </tr>
                        <tr>
                            <td>Lundi soir</td>
                            <td><p v-for="employe in lundiSoir" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p></td>
                        </tr>
                        <tr>
                            <td>Lundi nuit</td>
                            <td><p v-for="employe in lundiNuit" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p></td>
                        </tr>
                        <tr>
                            <td>Mardi jour</td>
                            <td><p v-for="employe in mardiJour" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p></td>
                        </tr>
                        <tr>
                            <td>Mardi soir</td>
                            <td><p v-for="employe in mardiSoir" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p></td>
                        </tr>
                        <tr>
                            <td>Mardi nuit</td>
                            <td><p v-for="employe in mardiNuit" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p></td>
                        </tr>
                        <tr>
                            <td>Mercredi jour</td>
                            <td><p v-for="employe in mercrediJour" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p></td>
                        </tr>
                        <tr>
                            <td>Mercredi soir</td>
                            <td><p v-for="employe in mercrediSoir" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p></td>
                        </tr>
                        <tr>
                            <td>Mercredi nuit</td>
                            <td><p v-for="employe in mercrediNuit" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p></td>
                        </tr>
                        <tr>
                            <td>Jeudi jour</td>
                            <td><p v-for="employe in jeudiJour" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p></td>
                        </tr>
                        <tr>
                            <td>Jeudi soir</td>
                            <td><p v-for="employe in jeudiSoir" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p></td>
                        </tr>
                        <tr>
                            <td>Jeudi nuit</td>
                            <td><p v-for="employe in jeudiNuit" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p></td>
                        </tr>
                        <tr>
                            <td>Vendredi jour</td>
                            <td><p v-for="employe in vendrediJour" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p></td>
                        </tr>
                        <tr>
                            <td>Vendredi soir</td>
                            <td><p v-for="employe in vendrediSoir" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p></td>
                        </tr>
                        <tr>
                            <td>Vendredi nuit</td>
                            <td><p v-for="employe in vendrediNuit" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p></td>
                        </tr>
                    </tbody>
                </table>

                <b-table striped hover :items="exigencesEmployeur" v-if="afficherHoraire">
                </b-table>
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
            exigencesEmployeur: []
        }
    },
    computed: {
        lundiJour: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Lundi" && emp.typequart == "Jour"
            })
        },
        lundiSoir: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Lundi" && emp.typequart == "Soir"
            })
        },
        lundiNuit: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Lundi" && emp.typequart == "Nuit"
            })
        },
        mardiJour: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Mardi" && emp.typequart == "Jour"
            })
        },
        mardiSoir: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Mardi" && emp.typequart == "Soir"
            })
        },
        mardiNuit: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Mardi" && emp.typequart == "Nuit"
            })
        } ,
        mercrediJour: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Mercredi" && emp.typequart == "Jour"
            })
        },
        mercrediSoir: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Mercredi" && emp.typequart == "Soir"
            })
        },
        mercrediNuit: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Mercredi" && emp.typequart == "Nuit"
            })
        },
        jeudiJour: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Jeudi" && emp.typequart == "Jour"
            })
        },
        jeudiSoir: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Jeudi" && emp.typequart == "Soir"
            })
        },
        jeudiNuit: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Jeudi" && emp.typequart == "Nuit"
            })
        },
        vendrediJour: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Vendredi" && emp.typequart == "Jour"
            })
        },
        vendrediSoir: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Vendredi" && emp.typequart == "Soir"
            })
        },
        vendrediNuit: function() {
            return this.horaire.filter(function(emp) {
                return emp.joursemaine == "Vendredi" && emp.typequart == "Nuit"
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
            fetch('/exigencesEmployeur', {
                method: 'GET',
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
                    this.exigencesEmployeur = data
                    console.log(this.exigencesEmployeur)
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