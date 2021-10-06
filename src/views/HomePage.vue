<template>
  <div v-if="isLoading">
    <ToDoPreloader/>
  </div>
  <div class="home" v-else>
    <h1>VUE.js TODO APP</h1>
    <img class="logo-img" :src="require('@/assets/checklist_106575.png')" alt="logo">
    <p class="text">
      <span>To see your todos (or add one)</span>&nbsp;<a
        v-if="!this.$store.getters.getIsAuth"
        class="login-btn"
        @click="sign"
    >login</a>&nbsp;<span>or/and go to the todos' list through link "TODOs"</span></p>
  </div>
</template>

<script>
import ToDoPreloader from "@/components/UI/ToDoPreloader";
import preloaderMixin from "@/mixins/preloaderMixin";

export default {
  components: {ToDoPreloader},
  mixins: [preloaderMixin],
  methods: {
    sign() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.logo-img {
  display: block;
  max-width: 200px;
  width: 100%;
  margin: 2.5rem auto;
}

.text {
  color: teal;
  font-size: 1.5rem;
  text-align: center;
}

.login-btn {
  font-weight: 600;
  cursor: pointer;
}

.login-btn:hover {
  text-decoration: underline;
}
</style>