<template>
  <div id="nav">
    <div class="logo">
      <img :src="require('@/assets/logo.png')" alt="">
    </div>
    <div class="nav">
      <router-link to="/home">Home</router-link>
      |
      <router-link to="/">TODOs (VueX)</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav"
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
}

#nav a.router-link-exact-active {
  color: #fdb833;
  text-shadow: 1px 1px 5px rgba(0,0,0,0.75);
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
</style>