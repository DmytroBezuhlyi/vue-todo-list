<template>
  <div ref="login-form">
    <h1>Sign In</h1>
    <form>
      <div class="form-group">
        <label>Login</label>
        <input
            type="text"
            placeholder="email@email.com"
            class="input"
            v-model.trim="username"
            @keypress.enter="signIn"
        />
        <div
            class="error"
            v-if="usernameErr"
        >
          Username is required
        </div>

        <div
            class="error"
            v-if="usernameExistence"
        >
          Users doesn't exist
        </div>
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
            type="password"
            class="input"
            v-model.trim="password"
            @keypress.enter="signIn"
        />
        <div
            class="error"
            v-if="passwordErr"
        >
          Password is required
        </div>
        <div
            class="error"
            v-if="passwordIncorrect"
        >
          Password is invalid
        </div>
      </div>

      <v-btn @click="signIn">Sign In</v-btn>
    </form>

    <hr>

    <h2>Don't have an account yet?</h2>
    <h3>Press <button @click="goToSignUp">Sign Up</button> button to open registration page</h3>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "LoginForm",
  data() {
    return {
      username: '',
      password: '',
      showErr: false,
      usernameErr: false,
      usernameExistence: false,
      passwordErr: false,
      passwordIncorrect: false
    }
  },
  methods: {
    signIn() {
      if (!this.username.length) {
        this.usernameErr = true;
        return;
      } else {
        this.usernameErr = false;
      }

      if (!this.password.length) {
        this.passwordErr = true;
      } else {
        this.passwordErr = false;

        if (this.username === this.$store.state.admin.username && this.password === this.$store.state.admin.password) {
          this.$store.commit('setIsAuth', true);
          this.$store.commit('setCurrentUser', this.username);
          this.$router.push({name: 'ToDosPage'});
        }

        const auth = this.getUsers.find(u => u.id === this.username);

        if (auth) {
          if (auth.password === this.password) {
            this.$store.commit('setIsAuth', true);
            this.$store.commit('setCurrentUser', this.username);
            this.$router.push({name: 'ToDosPage'});
          } else {
            this.passwordIncorrect = true;
          }
        } else {
          this.usernameExistence = true;
        }
      }
    },
    goToSignUp() {
      this.$router.push('/registration');
    }
  },
  computed: {
    ...mapGetters({
      getUsers: 'getUserList'
    })
  }
}
</script>

<style scoped>
hr {
  margin: 1rem 0;
}

h2 {
  margin-bottom: 1rem;
}

button {
  border: 1px solid teal;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
  padding: 0.25rem .5rem;
}
</style>