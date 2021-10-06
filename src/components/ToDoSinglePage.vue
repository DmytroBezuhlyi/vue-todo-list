<template>
  <div>
    <div v-if="isLoading">
      <ToDoPreloader/>
    </div>
    <div class="single-todo" v-else>
      <h1> {{ getTodoById.title }}</h1>
      <p v-if="getTodoById.description">{{ getTodoById.description }}</p>
    </div>
    <v-btn @click="goBack">Go Back</v-btn>
  </div>
</template>

<script>
import ToDoPreloader from "@/components/UI/ToDoPreloader";
import preloaderMixin from "@/mixins/preloaderMixin";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ToDoSinglePage",
  components: {ToDoPreloader},
  mixins: [preloaderMixin],
  data() {
    return {
      id: +this.$route.params.id
    }
  },
  methods: {
    ...mapActions({
      fetchTodoList: 'fetchList',
    }),
    goBack() {
      return this.$router.go(-1);
    }
  },
  computed: {
    ...mapGetters({
      getTodoList: 'getTodoList'
    }),
    getTodoById() {
      return this.$store.getters.getTodoById(this.id);
    }
  },
  created() {
    this.fetchTodoList();
  }
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

.single-todo {
  margin-bottom: 2rem;
}
</style>