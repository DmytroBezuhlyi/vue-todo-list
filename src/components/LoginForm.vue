<template>
  <div ref="login-form">
    <h1>Sign In</h1>

    <form @submit.prevent="signIn">
      <div class="form-group">
        <label for="text">Email</label>
        <input
            type="email"
            v-model="$v.user.username.$model"
            id="text"
            name="text"
            class="form-control"
            :class="{ 'form-group--error': submitted && $v.user.username.$error }"
            @input="cleanExistingErr"
            @keypress.enter="signIn"
        />
        <div v-if="submitted && $v.user.username.$error || submitted && this.errors.userNotExist"
             class="invalid-feedback">
          <span v-if="!$v.user.username.required">Email is required</span>
          <span v-if="!$v.user.username.email">Email is invalid</span>
          <span v-if="this.errors.userNotExist">User doesn't exist</span>
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
            type="password"
            v-model="$v.user.password.$model"
            id="password"
            name="password"
            class="form-control"
            :class="{ 'form-group--error': submitted && $v.user.password.$error }"
            @input="cleanExistingErr"
            @keypress.enter="signIn"
        />
        <div v-if="submitted && $v.user.password.$error || submitted && this.errors.passwordNotMatch"
             class="invalid-feedback">
          <span v-if="!$v.user.password.required">Password is required</span>
          <span v-if="this.errors.passwordNotMatch">Password is incorrect</span>
        </div>
      </div>

      <div class="form-group">
        <v-btn class="btn btn-primary" @click="signIn">Sign In</v-btn>
      </div>
    </form>

    <hr>

    <h2>Don't have an account yet?</h2>
    <h3>Press
      <button @click="goToSignUp">Sign Up</button>
      button to open registration page
    </h3>
  </div>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";
import {email, required} from "vuelidate/lib/validators";

export default {
  name: "LoginForm",
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      errors: {
        userNotExist: false,
        passwordNotMatch: false
      },
      submitted: false
    };
  },
  validations: {
    user: {
      username: {
        required,
        email,
      },
      password: {
        required,
      }
    },
  },
  methods: {
    ...mapMutations(['setCurrentUser', 'setIsAuth']),
    signIn() {
      this.submitted = true;

      const username = this.user.username;
      const password = this.user.password;
      const user = this.getUsers.find(u => u.id === username);

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      if ((username === this.$store.state.admin.username) || (user && username === user.id)) {
        if ((username === this.$store.state.admin.username)) {
          if (password === this.$store.state.admin.password) {
            this.setIsAuth(true);
            this.setCurrentUser(username);

            this.$cookies.set('token', username, 60 * 30);

            this.$router.replace({name: 'ToDosPage'});
          } else {
            this.errors.passwordNotMatch = true;
          }
        } else {
          if (password === user.password) {
            this.setIsAuth(true);
            this.setCurrentUser(username);

            this.$cookies.set('token', username, 60 * 30);

            this.$router.replace({name: 'ToDosPage'});
          } else {
            this.errors.passwordNotMatch = true;
          }
        }
      } else {
        this.errors.userNotExist = true;
      }
    },
    goToSignUp() {
      this.$router.push('/registration');
    },
    cleanExistingErr() {
      this.errors.userNotExist = false;
      this.errors.passwordNotMatch = false;
    }
  },
  computed: {
    ...mapGetters({
      getUsers: 'getUserList',
      getCurrentUser: 'getCurrentUser'
    }),
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
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  padding: 0.25rem .5rem;
}
</style>