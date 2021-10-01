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
        :isLoading="isLoading"
        v-if="!isLoading"
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
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  components: {ToDoPreloader, ToDoDialog, ToDoForm, ToDoList, ToDoNav},
  data() {
    return {
      dialogShow: false,
    }
  },
  methods: {
    ...mapMutations({
      setLoading: "todosModule/setIsLoading",
      setTodoList: "todosModule/setTodoList"
    }),
    ...mapActions({
      fetchTodoList: 'todosModule/fetchList',
      updateLS: 'todosModule/updateLocalStorage',
    }),
    createToDo(todo) {
      this.todoList.push(todo);
      this.dialogShow = false;
      this.updateLS();
    },
    removeToDo(todo) {
      this.setTodoList(this.todoList.filter(t => t.id !== todo.id))
      this.updateLS();
    },
    showDialog() {
      this.dialogShow = true;
    }
  },
  computed: {
    ...mapState({
      todoList: state => state.todosModule.todoList,
      isLoading: state => state.todosModule.isLoading
    })
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