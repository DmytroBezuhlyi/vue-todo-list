<template>
  <div ref="login-form">
    <h1>Sign In</h1>
    <form>
      <div class="form-group">
        <label>Login</label>
        <input
            type="text"
            placeholder="password"
            class="input"
            v-model.trim="username"
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
            type="password"
            class="input"
            placeholder="password"
            v-model.trim="password"
        />
      </div>

      <v-btn @click="signIn">Sign In</v-btn>
    </form>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";

export default {
  name: "LoginForm",
  data() {
    return {
      username: 'qwerty',
      password: '',
      showErr: false,
    }
  },
  validations: {
    username: {
      required,
    },
    password: {
      required
    }
  },
  methods: {
    signIn() {
      if (this.username === this.$store.state.admin.username && this.password === this.$store.state.admin.password) {
        this.$store.commit('setIsAuth', true)
        this.$router.push({name: 'ToDosPage'})
      } else {
        this.showErr = true;
        setTimeout(() => {
          this.showErr = false;
        }, 2000)
      }
    }
  }
}
</script>

<style scoped>
.login-fail {
  color: red;
  font-weight: 800;
}
</style>