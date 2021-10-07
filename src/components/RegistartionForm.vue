<template>
  <div ref="login-form">
    <h1>Sign Up</h1>
    <form>
      <div
          class="form-group"
          :class="{'form-group--error': errors.usernameValidation }"
      >
        <label>Login</label>
        <input
            type="text"
            placeholder="email@email.com"
            class="input"
            v-model.trim="username"
            @input="validateEmail"
        />
        <div
            class="error"
            v-if="errors.usernameValidation"
        >
          Username is invalid
        </div>
        <div
            class="error"
            v-else-if="errors.usernameExisting"
        >
          Username is already exists
        </div>
      </div>

      <div
          class="form-group"
          :class="{'form-group--error': errors.password }"
      >
        <label>Password</label>
        <input
            type="password"
            class="input"
            v-model.trim="password"
            @input="validatePassword"
        />
        <div
            class="error"
            v-if="errors.password"
        >
          Password should contains 8 characters at least
        </div>
      </div>

      <div
          class="form-group"
          v-if="this.password.length > 7 && !this.errors.password"
          :class="{'form-group--error': errors.passwordRepeat }"
      >
        <label>Repeat Password</label>
        <input
            type="password"
            class="input"
            v-model.trim="passwordRepeat"
            @input="validatePasswordRepeat"
        />
        <div
            class="error"
            v-if="errors.passwordRepeat"
        >
          Passwords doesn't match
        </div>
      </div>

      <v-btn @click="signUp">Sign Up</v-btn>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RegistrationForm",
  data() {
    return {
      username: '',
      password: '',
      passwordRepeat: '',
      errors: {
        common: true,
        usernameValidation: false,
        usernameExisting: false,
        password: false,
        passwordRepeat: false
      }
    }
  },
  methods: {
    signUp() {
      if (this.$store.getters.getUserList.find(u => u.id === this.username)) {
        this.errors.usernameExisting = true;
        setTimeout(() => {
          this.errors.usernameExisting = false;
        }, 1500)
      }

      if (this.password !== this.passwordRepeat) {
        this.errors.passwordRepeat = true;
      }

      this.check();

      if (this.errors.common) {
        this.check();
        this.validateEmail();
        this.validatePassword();
        this.validatePasswordRepeat()
      } else {
        const user = {
          id: this.username,
          password: this.password,
        };

        const userList = this.getUsersList;
        userList.push(user);

        this.$store.commit('setUserList', userList);

        if (!localStorage.getItem('users')) {
          localStorage.setItem('users', JSON.stringify(userList))
        } else {
          this.$store.dispatch('updateLocalStorageUsers');
        }

        this.$store.commit('setIsAuth', true);
        this.$store.commit('setCurrentUser', this.username)
        this.$router.push({name: 'ToDosPage'})
      }
    },
    validateEmail() {
      this.errors.usernameValidation = !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.username));
    },
    validatePassword() {
      this.errors.password = this.password.length < 8;
    },
    validatePasswordRepeat() {
      this.errors.passwordRepeat = !(this.password === this.passwordRepeat);
    },
    check() {
      this.errors.common = Object.entries(this.errors).filter(err => err[0] !== 'common').some(err => err[1] === true)
    },
    ...mapActions({
      fetchUsers: 'fetchUserList'
    })
  },
  computed: {
    ...mapGetters({
      getUsersList: 'getUserList'
    })
  },
  created() {
    this.fetchUsers();
  }
}
</script>

<style scoped>

</style>