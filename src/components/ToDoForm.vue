<template>
  <div>
    <form>
      <div class="input-title">
        <ToDoInput
            type="text"
            placeholder="What should you do"
            class="title form-group"
            v-model.trim="$v.todo.title.$model"
            :label="'Title *'"
            :class="{ 'form-group--error': !$v.todo.title.required }"
            :inputValue="editedTodo.title"
        />
        <div class="error" v-if="$v.todo.title.$error">Field is required</div>
      </div>
      <ToDoInput
          type="text"
          placeholder="Description"
          class="description"
          v-model="todo.description"
          :label="'Description'"
          :inputValue="editedTodo.description"
      />
      <v-btn
          class="btn create"
          depressed
          elevation="2"
          outlined
          v-if="edit"
          @click="updateToDo"
      >
        Update
      </v-btn>
      <v-btn
          class="btn create"
          depressed
          elevation="2"
          outlined
          v-if="!edit"
          @click="createToDo"
      >
        Create
      </v-btn>
    </form>
  </div>
</template>

<script>
import ToDoInput from "@/components/UI/TodoInput";
import {required} from 'vuelidate/lib/validators'

export default {
  name: "ToDoForm",
  components: {ToDoInput},
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    editedTodo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      todo: {
        title: '',
        description: ''
      }
    }
  },
  validations: {
    todo: {
      title: {
        required,
      }
    }
  },
  methods: {
    createToDo() {
      this.todo.id = Date.now();
      this.todo.user = this.$store.getters.getCurrentUser;

      if (this.todo.title.length > 0) {
        this.$emit('createToDo', this.todo);
        this.todo = {
          title: '',
          description: ''
        }
      }
    },
    updateToDo() {
      if (this.todo.title.length > 0) {
        this.$emit('updateToDo', this.todo);
        this.todo = {
          title: '',
          description: ''
        }
      }
    },
  },
  mounted() {
    if (this.edit) {
      this.todo = this.editedTodo
    }
  }
}
</script>

<style>
.input,
.form-group {
  position: relative;
}

.input-title {
  position: relative;
}

.form-group + .error,
.form-group .error {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}
</style>