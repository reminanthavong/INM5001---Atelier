<template>
    <div class="w3-main" style="margin-left:250px">
        <div class="w3-row w3-padding-64">
            <div class="w3-twothird w3-container">
                <br/>
                <br/>
                <h1 class="w3-text-teal">Disponibilités</h1>
                <b-table responsive :items="dispos"></b-table>

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
                dispos: null,
                dateconge: null,
                formDataDispos: {
                    checked: []
                },
                formDataConge: {
                    checked: []
                }
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
                        //console.log(this.employes);
                }).catch(error => {
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
                        this.$router.push("/zoneEmploye")

                },
                demanderConge() {

                    var date = this.dateconge;
                    var dateAjustee = new Date(date);
                    dateAjustee.setMinutes(dateAjustee.getMinutes() + dateAjustee.getTimezoneOffset()); //Permet d'avoir la bonne date sans influence du fuseau horaire
                    const jsonEmp = {};
                    jsonEmp.dateconge = dateAjustee;
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
                        this.$router.push("/zoneEmploye")
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
