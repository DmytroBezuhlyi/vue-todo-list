<template>
  <div id="nav">
    <div class="logo">
      <img :src="require('@/assets/logo.png')" alt="">
    </div>
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/todos">TODOs</router-link>
      <router-link to="/about">About</router-link>

      <v-btn
          class="auth-btn"
          v-if="this.$route.name !== 'LoginPage' && !this.$store.state.isAuth"
          @click="goToLogin"
      >
        Log In
      </v-btn>

      <v-btn
          class="auth-btn"
          v-if="this.$store.state.isAuth"
          @click="logout"
      >
        Log out
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  methods: {
    logout() {
      this.$store.commit('setIsAuth', false)
      this.$router.push('/');
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
#nav {
  position: relative;
  padding: 30px;
  background-color: teal;
  color: aliceblue;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

#nav a {
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  margin: 0 .5rem;
}

#nav a.router-link-exact-active {
  color: #fdb833;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.75);
}

.logo {
  position: absolute;
  max-width: 50px;
  flex-basis: auto;
  left: 2.5rem;
}

.logo img {
  width: 100%;
}

.auth-btn {
  height: 25px !important;
  margin: .25rem;
}

@media (max-width: 576px) {
  #nav {
    justify-content: flex-end;
  }

  .logo {
    left: 30px;
  }
}

@media (max-width: 375px) {
  #nav {
    padding: 30px 15px;
  }

  .logo {
    left: 15px;
  }
}
</style>