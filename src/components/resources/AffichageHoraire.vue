<template>
    <div class="w3-main" style="margin-left:250px">
        <div class="w3-row w3-padding-64">
            <div class="w3-twothird w3-container">
                <h1 class="w3-text-teal">Affichage de L'horaire</h1>
                <h3>Choisissez l'horaire a afficher selon :</h3>

                <table id="choixpourafficherhoraire" style="width:100%">
                    <tr>
                        <th>Nom de l'horaire:</th>
                        <th>Date de l'horaire:</th>
                    </tr>
                    <tr>
                        <td>
                        
                        
                        
                        </td>
                        <td>
                            <datepicker v-model="datehoraire" name="datehoraire"></datepicker>
                        </td>
                    </tr>
                    <tr>
                        <td>

                        </td>
                        <td>
    
                        </td>
                    </tr>
                </table>  
                <button @click="afficherHoraireSelonDate" class="btn btn-primary">Afficher</button>
                <p v-if="afficherHoraire">Voici l'horaire</p>
                <b-table striped hover :items="horaire" v-if="afficherEmployes">
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
            horaire: null,
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
        afficherHoraireDropdown(evt) {
        console.log(JSON.parse(evt.target.value))
        alert(JSON.parse(evt.target.value))
        },
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
                    body: JSON.stringify({date})
                })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    this.horaire = data
                })
                .catch(error => {
                    console.log(error);
                });
                  this.affichageHoraire = !this.affichageHoraire
            }
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
