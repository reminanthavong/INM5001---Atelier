<template>
    <div class="w3-main" style="margin-left:250px">
        <div class="w3-row w3-padding-64">
            <div class="w3-twothird w3-container">
                <h1 class="w3-text-teal">Création d'un horaire</h1>
                <br/>
                <br/>
                <h4 class="w3-text-teal">Entrez le nombre d'employés nécessaire par quart de travail: </h4>
                <b-form @submit.prevent="genererHoraire">
                    <b-form-group id="datehoraire" label="Date du lundi de la semaine:">
                        <datepicker v-model="datehoraire" name="datehoraire"></datepicker>
                    </b-form-group>
                    <br/>

                    <h6>Lundi:</h6>
                    <b-form-row inline id="lundi">
                        <b-col>
                            <label for="lundijour"> Jour:  </label>
                            <b-form-input inline id="lundijour" v-model="lundijour" pattern='[0-9]' required='required' placeholder="1-9"></b-form-input>
                        </b-col>
                        <b-col>
                            <label for="lundisoir"> Soir:  </label>
                            <b-form-input inline id="lundisoir" v-model="lundisoir"  pattern='[0-9]' required='required' placeholder="1-9"></b-form-input>
                        </b-col>
                        <b-col>
                            <label for="lundinuit"> Nuit:  </label>
                            <b-form-input inline id="lundinuit" v-model="lundinuit" pattern='[0-9]' required='required' placeholder="1-9"></b-form-input>
                        </b-col>
                    </b-form-row>
                    <br/>

                    <h6>Mardi:</h6>
                    <b-form-row inline id="mardi">
                        <b-col>
                            <label for="mardijour"> Jour:  </label>
                            <b-form-input id="mardijour" v-model="mardijour" pattern='[0-9]' required='required' placeholder="1-9"></b-form-input>
                        </b-col>
                        <b-col>
                            <label for="mardisoir"> Soir:  </label>
                            <b-form-input id="mardisoir" v-model="mardisoir" pattern='[0-9]' required='required' placeholder="1-9"></b-form-input>
                        </b-col>
                        <b-col>
                            <label for="mardinuit"> Nuit:  </label>
                            <b-form-input id="mardinuit" v-model="mardinuit" pattern='[0-9]' required='required' placeholder="1-9"></b-form-input>
                        </b-col>
                    </b-form-row>
                    <br/>

                    <h6>Mercredi:</h6>
                    <b-form-row inline id="mercredi">
                        <b-col>
                            <label for="mercredijour"> Jour:  </label>
                            <b-form-input id="mercredijour" v-model="mercredijour" pattern='[0-9]' required='required' placeholder="1-9"></b-form-input>
                        </b-col>
                        <b-col>
                            <label for="mercredisoir"> Soir:  </label>
                            <b-form-input id="mercredisoir" v-model="mercredisoir" pattern='[0-9]' required='required' placeholder="1-9"></b-form-input>
                        </b-col>
                        <b-col>
                            <label for="mercredinuit"> Nuit:  </label>
                            <b-form-input id="mercredinuit" v-model="mercredinuit" pattern='[0-9]' required='required' placeholder="1-9"></b-form-input>
                        </b-col>
                    </b-form-row>
                    <br/>

                    <h6>Jeudi:</h6>
                    <b-form-row inline id="jeudi">
                        <b-col>
                            <label for="jeudijour"> Jour:  </label>
                            <b-form-input id="jeudijour" v-model="jeudijour" pattern='[0-9]' required='required' placeholder="1-9"></b-form-input>
                        </b-col>
                        <b-col>
                            <label for="jeudisoir"> Soir:  </label>
                            <b-form-input id="jeudisoir" v-model="jeudisoir" pattern='[0-9]' required='required' placeholder="1-9"></b-form-input>
                        </b-col>
                        <b-col>
                            <label for="jeudinuit"> Nuit:  </label>
                            <b-form-input id="jeudinuit" v-model="jeudinuit" pattern='[0-9]' required='required' placeholder="1-9"></b-form-input>
                        </b-col>
                    </b-form-row>
                    <br/>

                    <h6>Vendredi:</h6>
                    <b-form-row inline id="vendredi">
                        <b-col>
                            <label for="vendredijour"> Jour:  </label>
                            <b-form-input id="vendredijour" v-model="vendredijour" pattern='[0-9]' required='required' placeholder="1-9"></b-form-input>
                        </b-col>
                        <b-col>
                            <label for="vendredisoir"> Soir:  </label>
                            <b-form-input id="vendredisoir" v-model="vendredisoir" pattern='[0-9]' required='required' placeholder="1-9"></b-form-input>
                        </b-col>
                        <b-col>
                            <label for="vendredinuit"> Nuit:  </label>
                            <b-form-input id="vendredinuit" v-model="vendredinuit" pattern='[0-9]' required='required' placeholder="1-9"></b-form-input>
                        </b-col>
                    </b-form-row>
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
                lundijour: 0,
                lundisoir: 0,
                lundinuit: 0,
                mardijour: 0,
                mardisoir: 0,
                mardinuit: 0,
                mercredijour: 0,
                mercredisoir: 0,
                mercredinuit: 0,
                jeudijour: 0,
                jeudisoir: 0,
                jeudinuit: 0,
                vendredijour: 0,
                vendredisoir: 0,
                vendredinuit: 0
            }
        },
        methods: {
            genererHoraire() {
                var date = this.datehoraire;
                var dateHoraire = new Date(date);
                var jourDeLaSemaine = dateHoraire.getDay();
                if(jourDeLaSemaine != 1) {
                    alert("Veuillez choisir une date correspondant à un lundi ");
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
                if(jourDeLaSemaine == 1) {
                    const jsonHoraire = {};
                    jsonHoraire.horairedate = dateHoraire;
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
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    this.$router.push("/success");
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
    b-form-input {
        width: 32%;
    }
</style>

