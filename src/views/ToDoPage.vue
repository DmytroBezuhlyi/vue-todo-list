<template>
  <div>
    <h1>Page with yours TODOS</h1>
    <v-btn
        class="create-todo"
        @click="showDialog"
    >
      Create ToDo
    </v-btn>

    <ToDoDialog
        @update:show="dialogShow = $event"
        :show="dialogShow"
    >
      <ToDoForm @createToDo="createToDo"/>
    </ToDoDialog>

    <ToDoList
        :todoList="todoList"
        @remove="removeToDo"
        v-if="!isLoading"
        :is-loading="isLoading"
    />
    <div v-else>
      <ToDoPreloader/>
    </div>
  </div>
</template>

<script>
import ToDoNav from "@/components/ToDoNav";
import ToDoList from "@/components/ToDoList";
import ToDoForm from "@/components/ToDoForm";
import ToDoDialog from "@/components/UI/ToDoDialog";
import ToDoPreloader from "@/components/UI/ToDoPreloader";

export default {
  components: {ToDoPreloader, ToDoDialog, ToDoForm, ToDoList, ToDoNav},
  data() {
    return {
      todoList: [],
      dialogShow: false,
      isLoading: false
    }
  },
  methods: {
    createToDo(todo) {
      this.todoList.push(todo);
      this.dialogShow = false;
      this.updateLocalStorage();
    },
    removeToDo(todo) {
      this.todoList = this.todoList.filter(td => td.id !== todo.id);
      this.updateLocalStorage();
    },
    showDialog() {
      this.dialogShow = true;
    },
    fetchList() {
      this.isLoading = true;
      try {
        setTimeout(() => {
          if (localStorage.getItem('list') && localStorage.getItem('list') !== 'undefined') {
            this.todoList = JSON.parse(localStorage.getItem('list'));
            this.isLoading = false;
          }
        }, 1000);
      } catch (e) {
        console.error(e);
      } finally {
        setTimeout(() => {
            this.isLoading = false;
        }, 1500);
      }
    },
    updateLocalStorage() {
      localStorage.setItem('list', JSON.stringify(this.todoList));
    }
  },
  mounted() {
    this.fetchList();
    // this.updateLocalStorage();
  }
}
</script>

<style>
.create-todo {
  display: block;
  margin: 1.5rem auto;
  box-shadow: -1px -1px 5px rgba(96, 46, 46, 0.75);
}

.create-todo {
  font-weight: 600;
  color: #183f86;
}
</style>