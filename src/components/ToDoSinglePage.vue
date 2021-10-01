<template>
  <div>
    <div class="single-todo" v-if="!isLoading">
      <h1>ToDo's Page with id {{ $route.params.id }}</h1>
      <p></p>
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
  name: "ToDoSinglePage",
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