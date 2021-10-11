<template>
  <div ref="login-form">
    <h1>Sign Up</h1>

    <form @submit.prevent="signUp">
      <div class="form-group">
        <label for="text">Email</label>
        <input
            type="email"
            v-model="$v.user.username.$model"
            id="text"
            name="text"
            class="form-control"
            :class="{ 'form-group--error': submitted && $v.user.username.$error || submitted && this.errors.userExistenceError }"
            @input="cleanExistingErr"
            @keypress.enter="signUp"
        />
        <div v-if="submitted && $v.user.username.$error || submitted && this.errors.userExistenceError"
             class="invalid-feedback">
          <span v-if="!$v.user.username.required">Email is required</span>
          <span v-if="!$v.user.username.email">Email is invalid</span>
          <span v-if="this.errors.userExistenceError">User has already existed</span>
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
            @keypress.enter="signUp"
        />
        <div v-if="submitted && $v.user.password.$error"
             class="invalid-feedback">
          <span v-if="!$v.user.password.required">Password is required</span>
          <span v-if="!$v.user.password.minLength">Password should be at least 8 characters</span>
        </div>
      </div>
      <div
          class="form-group"
          v-if="!$v.user.password.$error && this.user.password.length > 7"
      >
        <label for="password">Repeat Password</label>
        <input
            type="password"
            id="repeat-password"
            name="repeat-password"
            class="form-control"
            :class="{ 'form-group--error': submitted && $v.user.passwordRepeat.$error }"
            v-model="$v.user.passwordRepeat.$model"
            @input="cleanExistingErr"
            @keypress.enter="signUp"
        />
        <div v-if="submitted && $v.user.passwordRepeat.$error || submitted && this.errors.passwordNotMatch"
             class="invalid-feedback">
          <span v-if="!$v.user.passwordRepeat.required">Password is required | </span>
          <span v-if="!$v.user.passwordRepeat.sameAsPassword">Passwords doesn't match</span>
        </div>
      </div>

      <div class="form-group">
        <v-btn class="btn btn-primary" @click="signUp">Sign Up</v-btn>
      </div>
    </form>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import {email, minLength, required, sameAs} from "vuelidate/lib/validators";

export default {
  name: "RegistrationForm",
  data() {
    return {
      user: {
        username: '',
        password: '',
        passwordRepeat: ''
      },
      errors: {
        userExistenceError: false
      },
      submitted: false
    }
  },
  validations: {
    user: {
      username: {required, email},
      password: {required, minLength: minLength(8)},
      passwordRepeat: {required, minLength: minLength(8), sameAsPassword: sameAs('password')}
    }
  },
  methods: {
    ...mapActions({
      fetchUsers: 'fetchUserList',
      updateLSUsers: 'updateLocalStorageUsers'
    }),
    ...mapMutations(['setUserList', 'setIsAuth', 'setCurrentUser']),
    signUp() {
      this.submitted = true;

      const username = this.user.username;
      const password = this.user.password;
      const user = this.getUserList.find(user => user.id === username);

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      if (username === this.$store.state.admin.username || user) {
        this.errors.userExistenceError = true;
        return;
      }

      if (username && password) {
        const newUser = {
          id: username,
          password: password
        }

        const userList = this.getUserList;
        userList.push(newUser);

        this.setUserList(userList);

        if (!localStorage.getItem('users')) {
          localStorage.setItem('users', JSON.stringify(userList));
        } else {
          this.updateLSUsers();
        }

        this.setIsAuth(true);
        this.setCurrentUser(username);

        this.$cookies.set('token', username);

        this.$router.replace('/todos');
      }
    },
    cleanExistingErr() {
      this.errors.userExistenceError = false;
    }
  },
  computed: {
    ...mapGetters(['getUserList']),
  }
}
</script>

<style scoped>

</style>