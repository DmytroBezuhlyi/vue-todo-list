<template>
  <div>
    <form>
      <div class="input-title">
        <ToDoInput
            type="text"
            placeholder="Title"
            class="title form-group"
            v-model.trim="$v.todo.title.$model"
            :label="'Title *'"
            :class="{ 'form-group--error': $v.todo.title.$error }"
            @create="createToDo"
        />
        <div class="error" v-if="!$v.todo.title.required">Field is required</div>
      </div>
      <ToDoInput
          type="text"
          placeholder="Description"
          class="description"
          v-model="todo.description"
          :label="'Description'"
          @create="createToDo"
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
import {required} from 'vuelidate/lib/validators'

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

      if (this.todo.title.length > 0) {
        this.$emit('createToDo', this.todo);
        this.todo = {
          title: '',
          description: ''
        }
      }
    }
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.input-title {
  position: relative;
}

.error {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}
</style>