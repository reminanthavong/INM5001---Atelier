<template>
    <div class="w3-main" style="margin-left:250px">
        <div class="w3-row w3-padding-64">
            <div class="w3-twothird w3-container">
                <h1 class="w3-text-teal">Affichage de L'horaire</h1>
                <h3>Choisissez l'horaire a afficher selon :</h3>

                <p><b>Choisir par nom:</b></p>
                <select v-model="selectionne">
                    <option v-for="nom in nomsHoraire" v-bind:key="nom.idtablehoraire">
                        {{ nom.idtablehoraire }}
                     </option>
                </select>
                <button @click="afficherHoraireSelonID" class="btn btn-primary">Afficher</button>
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
                            <td>
                                <p v-for="employe in lundiJour" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p>
                                <p v-if="J1Manquants !== 0" class="manquant">ATTENTION! Il manque {{J1Manquants}} employé(s) pour combler ce quart de travail.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Lundi soir</td>
                            <td>
                                <p v-for="employe in lundiSoir" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p>
                                <p v-if="S1Manquants !== 0" class="manquant">ATTENTION! Il manque {{S1Manquants}} employé(s) pour combler ce quart de travail.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Lundi nuit</td>
                            <td>
                                <p v-for="employe in lundiNuit" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p>
                                <p v-if="N1Manquants !== 0" class="manquant">ATTENTION! Il manque {{N1Manquants}} employé(s) pour combler ce quart de travail.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Mardi jour</td>
                            <td>
                                <p v-for="employe in mardiJour" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p>
                                <p v-if="J2Manquants !== 0" class="manquant">ATTENTION! Il manque {{J2Manquants}} employé(s) pour combler ce quart de travail.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Mardi soir</td>
                            <td>
                                <p v-for="employe in mardiSoir" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p>
                                <p v-if="S2Manquants !== 0" class="manquant">ATTENTION! Il manque {{S2Manquants}} employé(s) pour combler ce quart de travail.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Mardi nuit</td>
                            <td>
                                <p v-for="employe in mardiNuit" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p>
                                <p v-if="N2Manquants !== 0" class="manquant">ATTENTION! Il manque {{N2Manquants}} employé(s) pour combler ce quart de travail.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Mercredi jour</td>
                            <td>
                                <p v-for="employe in mercrediJour" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p>
                                <p v-if="J3Manquants !== 0" class="manquant">ATTENTION! Il manque {{J3Manquants}} employé(s) pour combler ce quart de travail.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Mercredi soir</td>
                            <td>
                                <p v-for="employe in mercrediSoir" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p>
                                <p v-if="S3Manquants !== 0" class="manquant">ATTENTION! Il manque {{S3Manquants}} employé(s) pour combler ce quart de travail.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Mercredi nuit</td>
                            <td>
                                <p v-for="employe in mercrediNuit" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p>
                                <p v-if="N3Manquants !== 0" class="manquant">ATTENTION! Il manque {{N3Manquants}} employé(s) pour combler ce quart de travail.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Jeudi jour</td>
                            <td>
                                <p v-for="employe in jeudiJour" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p>
                                <p v-if="J4Manquants !== 0" class="manquant">ATTENTION! Il manque {{J4Manquants}} employé(s) pour combler ce quart de travail.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Jeudi soir</td>
                            <td>
                                <p v-for="employe in jeudiSoir" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p>
                                <p v-if="S4Manquants !== 0" class="manquant">ATTENTION! Il manque {{S4Manquants}} employé(s) pour combler ce quart de travail.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Jeudi nuit</td>
                            <td>
                                <p v-for="employe in jeudiNuit" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p>
                                <p v-if="N4Manquants !== 0" class="manquant">ATTENTION! Il manque {{N4Manquants}} employé(s) pour combler ce quart de travail.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Vendredi jour</td>
                            <td>
                                <p v-for="employe in vendrediJour" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p>
                                <p v-if="J5Manquants !== 0" class="manquant">ATTENTION! Il manque {{J5Manquants}} employé(s) pour combler ce quart de travail.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Vendredi soir</td>
                            <td>
                                <p v-for="employe in vendrediSoir" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p>
                                <p v-if="S5Manquants !== 0" class="manquant">ATTENTION! Il manque {{S5Manquants}} employé(s) pour combler ce quart de travail.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Vendredi nuit</td>
                            <td>
                                <p v-for="employe in vendrediNuit" v-bind:key="employe.nomemploye">{{employe.nomemploye}}</p>
                                <p v-if="N5Manquants !== 0" class="manquant">ATTENTION! Il manque {{N5Manquants}} employé(s) pour combler ce quart de travail.</p>
                            </td>
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
        },
        J1Manquants : function () {
            return this.exigencesEmployeur[0].nbremployes
                 - (this.horaire.filter(function(emp) {return emp.joursemaine == "Lundi" && emp.typequart == "Jour"})).length
        },
        S1Manquants : function () {
            return this.exigencesEmployeur[1].nbremployes
                 - (this.horaire.filter(function(emp) {return emp.joursemaine == "Lundi" && emp.typequart == "Soir"})).length
        },
        N1Manquants : function () {
            return this.exigencesEmployeur[2].nbremployes
                 - (this.horaire.filter(function(emp) {return emp.joursemaine == "Lundi" && emp.typequart == "Nuit"})).length
        },
        J2Manquants : function () {
            return this.exigencesEmployeur[3].nbremployes
                 - (this.horaire.filter(function(emp) {return emp.joursemaine == "Mardi" && emp.typequart == "Jour"})).length
        },
        S2Manquants : function () {
            return this.exigencesEmployeur[4].nbremployes
                 - (this.horaire.filter(function(emp) {return emp.joursemaine == "Mardi" && emp.typequart == "Soir"})).length
        },
        N2Manquants : function () {
            return this.exigencesEmployeur[5].nbremployes
                 - (this.horaire.filter(function(emp) {return emp.joursemaine == "Mardi" && emp.typequart == "Nuit"})).length
        },
        J3Manquants : function () {
            return this.exigencesEmployeur[6].nbremployes
                - (this.horaire.filter(function(emp) {return emp.joursemaine == "Mercredi" && emp.typequart == "Jour"})).length
        },
        S3Manquants : function () {
            return this.exigencesEmployeur[7].nbremployes
                - (this.horaire.filter(function(emp) {return emp.joursemaine == "Mercredi" && emp.typequart == "Soir"})).length
        },
        N3Manquants : function () {
            return this.exigencesEmployeur[8].nbremployes
                - (this.horaire.filter(function(emp) {return emp.joursemaine == "Mercredi" && emp.typequart == "Nuit"})).length
        },
        J4Manquants : function () {
            return this.exigencesEmployeur[9].nbremployes
                - (this.horaire.filter(function(emp) {return emp.joursemaine == "Jeudi" && emp.typequart == "Jour"})).length
        },
        S4Manquants : function () {
            return this.exigencesEmployeur[10].nbremployes
                - (this.horaire.filter(function(emp) {return emp.joursemaine == "Jeudi" && emp.typequart == "Soir"})).length
        },
        N4Manquants : function () {
            return this.exigencesEmployeur[11].nbremployes
                - (this.horaire.filter(function(emp) {return emp.joursemaine == "Jeudi" && emp.typequart == "Nuit"})).length
        },
        J5Manquants : function () {
            return this.exigencesEmployeur[12].nbremployes
                - (this.horaire.filter(function(emp) {return emp.joursemaine == "Vendredi" && emp.typequart == "Jour"})).length
        },
        S5Manquants : function () {
            return this.exigencesEmployeur[13].nbremployes
                - (this.horaire.filter(function(emp) {return emp.joursemaine == "Vendredi" && emp.typequart == "Nuit"})).length
        },
        N5Manquants : function () {
            return this.exigencesEmployeur[14].nbremployes
                - (this.horaire.filter(function(emp) {return emp.joursemaine == "Vendredi" && emp.typequart == "Nuit"})).length
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
        
            fetch('/exigencesEmployeur', {
                method: 'POST',
                headers: {
                     'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                 body: JSON.stringify({'default'})
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
    },
    methods: {
        afficherHoraireSelonDate() {
            var date = this.datehoraire;
            var dateHoraire = new Date(date)
            var jourDeLaSemaine = dateHoraire.getDay();
            if(jourDeLaSemaine != 1) {
                alert("Veuillez choisir une date correspondant à un lundi ")
            } else {
                fetch('/exigencesEmployeur', {
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
                        this.exigencesEmployeur = data
                        
                        console.log(this.exigencesEmployeur)
                    })
                    .catch(error => {
                        console.log(error);
                    
                });

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
            fetch('/exigencesEmployeur', {
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
                    this.exigencesEmployeur = data
                    console.log(this.exigencesEmployeur)
                })
                .catch(error => {
                    console.log(error);
            });
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
    p.manquant {
        color: red;
    }
</style>
