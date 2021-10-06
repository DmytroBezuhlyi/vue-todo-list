<template>
  <div id="app">
    <ToDoNav/>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ToDoNav from "@/components/ToDoNav";
import {mapActions} from "vuex";

export default {
  components: {ToDoNav},
  methods: {
    ...mapActions({
      fetchUsers: 'fetchUserList',
      fetchTodos: 'fetchList'
    })
  },
  created() {
    this.fetchUsers();
    this.fetchTodos();
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1 {
  color: teal;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
  margin: 0.5rem;
  text-align: center;
}

h3 {
  margin-bottom: 1rem;
  font-weight: 500;
  word-break: break-word;
}

h4 {
  font-weight: 500;
  word-break: break-word;
}

.container {
  max-width: 1040px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
}

.error {
  color: white !important;
  background-color: red !important;
  transition: background-color .2s ease-in;
}

.error:hover {
  background-color: #d70000 !important;
}

.create {
  align-self: flex-end;
  background-color: cornflowerblue !important;
  color: aliceblue !important;
  font-weight: 500;
  text-shadow: 0 0 4px #000;
}
</style>
