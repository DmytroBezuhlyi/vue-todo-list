<template>
  <div>
    <h1>Page with
      {{ this.$store.getters.getCurrentUser !== 'admin@gmail.com' ? this.$store.getters.getCurrentUser : 'yours' }}
      TODOS</h1>
    <v-btn
        class="create-todo"
        @click="showDialog"
    >
      Create ToDo
    </v-btn>

    <ToDoDialog
        :show.sync="dialogShow"
        :edit.sync="todoEditing"
        :editedTodo="todo"
    >
      <ToDoForm
          @createToDo="createToDo"
          @editToDo="updateToDo"
          @updateToDo="updateToDo"
          :edit.sync="todoEditing"
          :editedTodo="todo"
      />
    </ToDoDialog>

    <div v-if="isLoading">
      <ToDoPreloader/>
    </div>

    <ToDoList
        :todoList="todoListRestricted"
        @remove="removeToDo"
        :isLoading="isLoading"
        v-else
        @edit="edit"
    />
  </div>
</template>

<script>
import ToDoNav from "@/components/ToDoNav";
import ToDoList from "@/components/ToDoList";
import ToDoForm from "@/components/ToDoForm";
import ToDoDialog from "@/components/UI/ToDoDialog";
import ToDoPreloader from "@/components/UI/ToDoPreloader";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  components: {ToDoPreloader, ToDoDialog, ToDoForm, ToDoList, ToDoNav},
  data() {
    return {
      dialogShow: false,
      todoEditing: false,
      todo: {},
    }
  },
  methods: {
    ...mapMutations({
      setLoading: "setIsLoading",
      setTodoList: "setTodoList"
    }),
    ...mapActions({
      fetchTodoList: 'fetchList',
      updateLS: 'updateLocalStorage',
    }),
    createToDo(todo) {
      this.todoList.unshift(todo);
      this.dialogShow = false;
      this.updateLS();
    },
    removeToDo(todo) {
      this.setTodoList(this.todoList.filter(t => t.id !== todo.id))
      this.updateLS();
    },
    edit(todo) {
      this.todoEditing = true;
      this.dialogShow = true;
      this.todo = todo;
    },
    updateToDo(todo) {
      this.$store.getters.getTodoList.forEach(td => {
        if (td.id === todo.id) {
          td.title = todo.title;
          td.description = todo.description;
        }
      });

      this.todoEditing = false;
      this.dialogShow = false;
      this.updateLS();
    },
    showDialog() {
      this.dialogShow = true;
      if (!this.todoEditing) {
        this.todo = {}
      }
    },
  },
  computed: {
    ...mapState({
      todoList: state => state.todoList,
      isLoading: state => state.isLoading
    }),
    todoListRestricted() {
      const currentUser = this.$store.getters.getCurrentUser;
      if (currentUser === 'admin@gmail.com') {
        return this.$store.getters.getTodoList
      } else {
        return this.$store.getters.getTodoList.filter(todo => todo.user === currentUser)
      }
    }
  },
  mounted() {
    this.fetchTodoList();
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