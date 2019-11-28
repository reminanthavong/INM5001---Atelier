<template>
<div>
<div class="w3-top">
    <div class="w3-bar w3-theme w3-top w3-left-align w3-large">
    <a class="w3-bar-item w3-button w3-right w3-hide-large w3-hover-white w3-large w3-theme-l1" href="javascript:void(0)" onclick="w3_open()"><i class="fa fa-bars"></i></a>
      <router-link class="w3-bar-item w3-button w3-theme-l1" to="/">Home</router-link> 
      <router-link class="w3-bar-item w3-button w3-hide-small w3-hover-white" to="/affichageHoraire">Afficher Horaire</router-link> 
      <router-link class="w3-bar-item w3-button w3-hide-small w3-hover-white" to="/gestionHoraire">Gestion Horaire</router-link> 
      <router-link class="w3-bar-item w3-button w3-hide-small w3-hover-white" to="/gestionEmployes">Gestion Employes</router-link> 
      //<router-link class="w3-bar-item w3-button w3-hide-small w3-hover-white" @click="zoneEmploye">Zone Employes</router-link>
      <span v-if="isLoggedIn">  <a class="w3-bar-item w3-button w3-hide-small w3-hover-white" @click="zoneEmploye">Zone Employes</a></span>
      <span v-else> </span>
      <span v-if="isLoggedIn">  <a class="w3-bar-item w3-button w3-hide-small w3-hover-white" @click="logout">Logout</a></span>
      <span v-else>  <router-link class="w3-bar-item w3-button w3-hide-small w3-hover-white" to="/login">Login</router-link></span>
    </div>
    </div>
    <router-view/>
    </div>
</template>

<style src="./assets/w3.css"></style>
<style src="./assets/w3-theme-black.css"></style>
<script>
    export default {
      data() {
            return {
                isAdmin: false
          }
        },
      computed: {
        isLoggedIn: function() {
          return this.$store.getters.isLoggedIn;
        }
      },
      methods: {
        logout: function() {
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        },
        zoneEmploye: function(){
                    fetch('/userStatus', {
                            method: 'GET'
                        })
                        .then((response) => {
                            return response.json()
                        })
                        .then((data) => {
                            this.isAdmin = data
                        }).catch(error => {
                            console.log(error);
                        });
                if(!this.isAdmin){
                this.$router.push("/zoneEmploye")
                }else{
                this.$router.push("/unauthorized")
                }
                
            }
      }
    };
    </script>
