<template>
  <div id="nav">
    <div class="logo">
      <img :src="require('@/assets/logo.png')" alt="">
    </div>
    <div
        class="nav"
        :class="{
                  'nav-mobile': this.$store.getters.getIsMobile,
                  'open': isNavOpen
        }"
        @click="toggleMobileNav"
    >
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
          v-if="this.$route.name !== 'RegistrationPage' && !this.$store.state.isAuth"
          @click="goToRegistration"
      >
        Sign Up
      </v-btn>

      <span v-if="this.getCurrentUser ">|</span>

      <a>{{ this.getCurrentUser }}</a>

      <v-btn
          class="auth-btn"
          v-if="this.$store.state.isAuth"
          @click="logout"
      >
        Log out
      </v-btn>
    </div>

    <div
        class="burger"
        :class="{'open': isNavOpen}"
        v-if="this.$store.getters.getIsMobile"
        @click="toggleMobileNav"
    >
      <span></span><span></span><span></span>
    </div>

  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "Nav",
  data() {
    return {
      isNavOpen: false
    }
  },
  methods: {
    ...mapMutations(['setIsAuth', 'setCurrentUser']),
    logout() {
      this.$cookies.remove('token');

      this.setIsAuth(false);
      this.setCurrentUser('');

      this.$router.push('/');
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegistration() {
      this.$router.push('/registration');
    },
    toggleMobileNav() {
      if (this.$store.getters.getIsMobile) {
        this.isNavOpen = !this.isNavOpen;
      }
    }
  },
  computed: {
    ...mapGetters(['getCurrentUser'])
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

#nav a,
#nav button {
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  margin: 0 .75rem;
}

#nav button {
  color: #000;
  font-weight: normal;
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

.nav {
  display: flex;
  align-items: center;
}

.nav-mobile {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: teal;
  z-index: 1;
  transition: all .5s ease-in-out;
  transform: translateY(-100%);
}

#nav .nav-mobile a {
  margin: .75rem;
}

.nav-mobile.open {
  transform: unset;
}

.burger {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 30px;
  height: 15px;
  right: 20px;
  z-index: 1;
  transition: all .5s ease-in-out;
}

.burger span {
  display: block;
  position: relative;
  width: 30px;
  height: 2px;
  background-color: aliceblue;
  transition: all .5s ease-in-out;
}

.burger.open span {
  position: absolute;
  top: 5px;
  transform: rotate(45deg);
}

.burger.open span:last-of-type {
  transform: rotate(-45deg);
}

.burger span:nth-of-type(2) {
  margin: .35rem 0;
}

.burger.open span:nth-of-type(2) {
  opacity: 0;
  transform: none;
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