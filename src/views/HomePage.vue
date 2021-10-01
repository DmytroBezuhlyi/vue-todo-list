<template>
  <div v-if="isLoading">
    <ToDoPreloader/>
  </div>
  <div class="home" v-else>
    <h1>VUE.js TODO APP</h1>
    <img class="logo-img" :src="require('@/assets/checklist_106575.png')" alt="logo">
    <p class="text">To see your todo (or add one) go to the todos' list through link "TODOs"</p>
  </div>
</template>

<script>
import ToDoPreloader from "@/components/UI/ToDoPreloader";
import preloaderMixin from "@/mixins/preloaderMixin";

export default {
  components: {ToDoPreloader},
  mixins: [preloaderMixin]
}
</script>

<style scoped>
.logo-img {
  display: block;
  max-width: 300px;
  width: 100%;
  margin: 2.5rem auto;
}

.text {
  color: teal;
  font-size: 1.5rem;
  text-align: center;
}
</style>