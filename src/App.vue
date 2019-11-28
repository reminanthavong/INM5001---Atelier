<template>
<div>
<div class="w3-top">
    <div class="w3-bar w3-theme w3-top w3-left-align w3-large">
    <a class="w3-bar-item w3-button w3-right w3-hide-large w3-hover-white w3-large w3-theme-l1" href="javascript:void(0)" onclick="w3_open()"><i class="fa fa-bars"></i></a>
      <router-link class="w3-bar-item w3-button w3-theme-l1" to="/">Home</router-link> 
      <router-link class="w3-bar-item w3-button w3-hide-small w3-hover-white" to="/affichageHoraire">Afficher Horaire</router-link> 
      <router-link class="w3-bar-item w3-button w3-hide-small w3-hover-white" to="/gestionHoraire">Gestion Horaire</router-link> 
      <router-link class="w3-bar-item w3-button w3-hide-small w3-hover-white" to="/gestionEmployes">Gestion Employes</router-link> 
      <router-link class="w3-bar-item w3-button w3-hide-small w3-hover-white" to="/zoneEmploye">Zone Employes</router-link>
      <span v-if="isUser">  <a class="w3-bar-item w3-button w3-hide-small w3-hover-white" to="/login">TRUE USER</a></span>
      <span v-else>  <router-link class="w3-bar-item w3-button w3-hide-small w3-hover-white" to="/login">FALSE USER</router-link></span>
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
      computed: {
        isLoggedIn: function() {
          return this.$store.getters.isLoggedIn;
        },
        isUser: function() {
          return this.$store.getters.userStatus;
        }
      },
      methods: {
        logout: function() {
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        }
      }
    };
    </script>
