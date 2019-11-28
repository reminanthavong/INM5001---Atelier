<template>
 <div class="w3-main" style="margin-left:250px">
    <div class="w3-row w3-padding-64">
    <div class="w3-twothird w3-container">
      <h1 class="w3-text-teal">Sign in</h1>
      <b-form @submit.prevent="login">
      <b-form-group
        id="input-group-1"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="input-1"
          v-model="username"
          type="username"
          required
          placeholder="Enter username"
        ></b-form-input>
      </b-form-group>
      
      <b-form-group
        id="input-group-2"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="input-1"
          v-model="password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    
	</div>
	</div> 
</div>
</template>
      <script>
      export default {
        data() {
          return {
            username: "",
            password: ""
          };
        },
        methods: {
          login: function() {
            let username = this.username;
            let password = this.password;
            this.$store
              .dispatch("login", { username, password })
              .then(() => this.$router.push("/"))
              .catch(function (error) {
                        /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
                        console.error(error.response);
		});
          }
        }
      };
      </script>
