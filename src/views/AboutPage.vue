<template>
  <div>
    <div class="content" v-if="isLoading">
      <h1>Vue.js TODO APP</h1>
      <p>App provides you to note some tasks you need todo in future</p>
      <p>This App developed using Vue.js 2.x.x, VueX store, Vuetify lib, Vue Ui PreLoader and LocalStorage as a DataBase
        to store you notes permanently</p>
      <p>App Consists of 3 pages {Home Page, About Page, Page with Todos}. Each task has title and description. You
        could
        remove or add new one whenever you want</p>
    </div>
    <div v-else>
      <ToDoPreloader/>
    </div>
  </div>
</template>

<script>
import ToDoPreloader from "@/components/UI/ToDoPreloader";
import preloaderMixin from "@/mixins/preloaderMixin";

export default {
  name: "AboutPage",
  components: {ToDoPreloader},
  mixins: [preloaderMixin]
}
</script>

<style scoped>
p {
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #2c3e50;
  font-weight: 500;
  text-align: justify;
  box-shadow: 1px 1px 3px rgba(0, 0, 255, 0.5);
  padding: 0.5rem;
}
</style>