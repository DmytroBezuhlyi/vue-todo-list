<template>
  <div>
    <form>
      <ToDoInput
          class="title"
          type="text"
          placeholder="Title"
          v-model="todo.title"
          v-on:keypress="logTitle"
      />
      <ToDoInput
          class="description"
          type="text"
          placeholder="Description"
          v-model="todo.description"
      />
      <v-btn
          class="btn create"
          depressed
          elevation="2"
          outlined
          @click="createToDo"
      >
        Create
      </v-btn>
    </form>
  </div>
</template>

<script>
import ToDoInput from "@/components/UI/TodoInput";

export default {
  name: "ToDoForm",
  components: {ToDoInput},
  data() {
    return {
      todo: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    createToDo() {
      this.todo.id = Date.now();

      if (this.todo.title.length === 0) {
        const titleInput = document.querySelector('.title');
        validateInput(titleInput);
      }
      if (this.todo.description.length === 0) {
        const descriptionInput = document.querySelector('.description');
        validateInput(descriptionInput);
      }

      function validateInput(selector) {
        selector.classList.add('error');
        const errorMsgHTML = `<p class="error-msg" style="color: red; text-align: center; font-weight: bold; margin: 0.25rem 0">Title field is empty, please fill the field</p>`

        selector.insertAdjacentHTML('afterend', errorMsgHTML);

        setTimeout(() => {
          selector.nextSibling.remove();
          selector.classList.remove('error');
        }, 2000)
      }

      if (this.todo.title.length > 0 && this.todo.description.length > 0) {
        this.$emit('createToDo', this.todo);
        this.todo = {
          title: '',
          description: ''
        }
      }
    },
    logTitle() {
      console.log('2wdqwd')
    }
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>