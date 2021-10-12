<template>
  <div>
    <h1>Page with
      {{ this.$store.getters.getCurrentUser !== 'admin@gmail.com' ? this.$store.getters.getCurrentUser : 'yours' }}
      TODOS</h1>
    <v-btn
        class="create-todo"
        @click="showModal"
    >
      Create ToDo
    </v-btn>

    <ToDoDialog>
      <ToDoForm
          @create="createToDo"
          @update="updateToDo"
          :id="this.getTempTodo.id"
          :title="this.getTempTodo.title"
          :description="this.getTempTodo.description"
      />
    </ToDoDialog>

    <div v-if="isLoading">
      <ToDoPreloader/>
    </div>

    <ToDoList
        :todoList="todoListRestricted"
        @remove="removeToDo"
        v-else
    />
  </div>
</template>

<script>
import ToDoNav from "@/components/ToDoNav";
import ToDoList from "@/components/ToDoList";
import ToDoForm from "@/components/ToDoForm";
import ToDoDialog from "@/components/UI/ToDoDialog";
import ToDoPreloader from "@/components/UI/ToDoPreloader";
import ToDoInput from "@/components/UI/TodoInput";
import preloaderMixin from "@/mixins/preloaderMixin";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  components: {ToDoInput, ToDoPreloader, ToDoDialog, ToDoForm, ToDoList, ToDoNav},
  mixins: [preloaderMixin],
  data() {
    return {
      todo: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    ...mapMutations(['setTodoList', 'setIsModalShow', 'setTempToDo', "setIsLoading"]),
    ...mapActions(['updateLocalStorage']),
    createToDo(todo) {
      const newTodo = {
        id: Date.now(),
        title: todo.title,
        description: todo.description,
        user: this.getCurrentUser,
      }
      this.getTodoList.unshift(newTodo);
      this.setIsModalShow(false);
      this.updateLocalStorage();
    },
    updateToDo({title, description}) {
      this.getTodoList.find(td => {
        if (td.id === this.getTempTodo.id) {
          td.title = title || this.getTempTodo.title;
          td.description = description || this.getTempTodo.description;
        }
      })

      this.setIsModalShow(false);
      this.updateLocalStorage();
    },
    removeToDo(id) {
      this.setTodoList(this.getTodoList.filter(t => t.id !== id))
      this.updateLocalStorage();
    },
    showModal() {
      this.setIsModalShow(true);
      if (this.getTempTodo) {
        this.setTempToDo({});
      }
    },
  },
  computed: {
    ...mapGetters(['getTodoList', 'getIsLoading', 'getTempTodo', 'getCurrentUser']),
    todoListRestricted() {
      const currentUser = this.$store.getters.getCurrentUser;
      if (currentUser === 'admin@gmail.com') {
        return this.getTodoList
      } else {
        return this.getTodoList.filter(todo => todo.user === currentUser)
      }
    }
  },
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