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
        console.log(auth)

        if (auth) {
          console.log(auth.password)
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

</style>