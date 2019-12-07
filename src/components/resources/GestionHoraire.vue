<template>
    <div class="w3-main" style="margin-left:250px">
        <div class="w3-row w3-padding-64">
            <div class="w3-twothird w3-container">
                <br/>
                <br/>
                <h4 class="w3-text-teal">Entrer le nombre d'employé nécessaire par quart de travail: </h4>
                <b-form @submit.prevent="genererHoraire">
                    <b-form id="datehoraire" label="Date du lundi de la semaine:">
                        <datepicker v-model="datehoraire" name="datehoraire"></datepicker>
                    </b-form>
                    <br/>
                    <h6>Lundi:</h6>
                    <b-form inline id="lundi">
                        <label for="lundijour"> Jour:  </label>
                        <b-input id="lundijour" pattern='[0-9]' required='required' placeholder="1-9"></b-input>

                        <label for="lundisoir"> Soir:  </label>
                        <b-input id="lundisoir" pattern='[0-9]' required='required' placeholder="1-9"></b-input>

                        <label for="lundinuit"> Nuit:  </label>
                        <b-input id="lundinuit" pattern='[0-9]' required='required' placeholder="1-9"></b-input>
                    </b-form>
                    <br/>

                    <h6>Mardi:</h6>
                    <b-form inline id="mardi"> 
                        <label for="mardijour"> Jour:  </label>
                        <b-input id="mardijour" pattern='[0-9]' required='required' placeholder="1-9"></b-input>

                        <label for="mardisoir"> Soir:  </label>
                        <b-input id="mardisoir" pattern='[0-9]' required='required' placeholder="1-9"></b-input>

                        <label for="mardinuit"> Nuit:  </label>
                        <b-input id="mardinuit" pattern='[0-9]' required='required' placeholder="1-9"></b-input>
                    </b-form>
                    <br/>

                    <h6>Mercredi:</h6>
                    <b-form inline id="mercredi">
                        <label for="mercredijour"> Jour:  </label>
                        <b-input id="mercredijour" pattern='[0-9]' required='required' placeholder="1-9"></b-input>

                        <label for="mercredisoir"> Soir:  </label>
                        <b-input id="mercredisoir" pattern='[0-9]' required='required' placeholder="1-9"></b-input>

                        <label for="mercredinuit"> Nuit:  </label>
                        <b-input id="mercredinuit" pattern='[0-9]' required='required' placeholder="1-9"></b-input>
                    </b-form>
                    <br/>

                    <h6>Jeudi:</h6>
                    <b-form inline id="jeudi">
                        <label for="jeudijour"> Jour:  </label>
                        <b-input id="jeudijour" pattern='[0-9]' required='required' placeholder="1-9"></b-input>

                        <label for="jeudisoir"> Soir:  </label>
                        <b-input id="jeudisoir" pattern='[0-9]' required='required' placeholder="1-9"></b-input>

                        <label for="jeudinuit"> Nuit:  </label>
                        <b-input id="jeudinuit" pattern='[0-9]' required='required' placeholder="1-9"></b-input>
                    </b-form>
                    <br/>

                    <h6>Vendredi:</h6>
                    <b-form inline id="vendredi">
                        <label for="vendredijour"> Jour:  </label>
                        <b-input id="vendredijour" pattern='[0-9]' required='required' placeholder="1-9"></b-input>

                        <label for="vendredisoir"> Soir:  </label>
                        <b-input id="vendredisoir" pattern='[0-9]' required='required' placeholder="1-9"></b-input>

                        <label for="vendredinuit"> Nuit:  </label>
                        <b-input id="vendredinuit" pattern='[0-9]' required='required' placeholder="1-9"></b-input>
                    </b-form>
                    <br/>
                    <b-button type="submit" variant="primary">Générer l'horaire</b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>
<script>
  import Datepicker from 'vuejs-datepicker'
    export default {
        name: 'gestionHoraire',
        components: {
            Datepicker
        },
        data: function() {
            return {
                datehoraire: null,
                lundijour: null,
                lundisoir: null,
                lundinuit: null,
                mardijour: null,
                mardisoir: null,
                mardinuit: null,
                mercredijour: null,
                mercredisoir: null,
                mercredinuit: null,
                jeudijour: null,
                jeudisoir: null,
                jeudinuit: null,
                vendredijour: null,
                vendredisoir: null,
                vendredinuit: null,
                fields: [
                    {key: 'datehoraire', sortable: true},
                    {key: 'lundi', sortable: true},
                    {key: 'mardi', sortable: true},
                    {key: 'mercredi', sortable: true},
                    {key: 'jeudi', sortable: true},
                    {key: 'vendredi', sortable: true}
                ]
            }
        },
        methods: {
            genererHoraire() {
                var date = this.datehoraire;
                var dateHoraire = new Date(date);
                var jourDeLaSemaine = dateHoraire.getDay()
                if(jourDeLaSemaine != 1) {
                    alert("Veuillez choisir une date correspondant à un lundi ")
                }else{
                    const jsonExigences = {};
                    jsonExigences.horairedate = dateHoraire
                    jsonExigences.lundijour = this.lundijour;
                    jsonExigences.lundisoir = this.lundisoir;
                    jsonExigences.lundinuit = this.lundinuit;
                    jsonExigences.mardijour = this.mardijour;
                    jsonExigences.mardisoir = this.mardisoir;
                    jsonExigences.mardinuit = this.mardinuit;
                    jsonExigences.mercredijour = this.mercredijour;
                    jsonExigences.mercredisoir = this.mercredisoir;
                    jsonExigences.mercredinuit = this.mercredinuit;
                    jsonExigences.jeudijour = this.jeudijour
                    jsonExigences.jeudisoir = this.jeudisoir
                    jsonExigences.jeudinuit = this.jeudinuit;
                    jsonExigences.vendredijour = this.vendredijour
                    jsonExigences.vendredisoir = this.vendredisoir
                    jsonExigences.vendredinuit = this.vendredinuit;
                    console.log(jsonExigences)
                    fetch('/Horaire', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(jsonExigences)
                    })
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        console.log(data);
                    }).catch(error => {
                        console.log(error);
                    });
                }
                if(jourDeLaSemaine ==1) {
                const jsonHoraire = {}
                jsonHoraire.horairedate = dateHoraire
                console.log(jsonHoraire)
                fetch('/creationHoraire', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonHoraire)
                })
                .then((response) => {
                    return response.json()
                })
                 .then((data) => {
                    console.log(data);
                }).catch(error => {
                    console.log(error);
                });
                this.$router.push("/success")
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

