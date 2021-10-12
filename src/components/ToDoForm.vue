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
            :inputValue="this.title"
        />
        <div class="error" v-if="$v.todo.title.$error">Field is required</div>
      </div>
      <ToDoInput
          type="text"
          placeholder="Description"
          class="description"
          v-model="todo.description"
          :label="'Description'"
          :inputValue="this.description"
      />
      <v-btn
          class="btn create"
          depressed
          elevation="2"
          outlined
          v-if="this.getTempTodo().hasOwnProperty('id')"
          @click="$emit('update', todo)"
      >
        Update
      </v-btn>
      <v-btn
          class="btn create"
          depressed
          elevation="2"
          outlined
          v-else
          @click="$emit('create', todo)"
      >
        Create
      </v-btn>
    </form>
  </div>
</template>

<script>
import ToDoInput from "@/components/UI/TodoInput";
import {required} from 'vuelidate/lib/validators'
import {mapGetters} from "vuex";

export default {
  name: "ToDoForm",
  components: {ToDoInput},
  props: {
    id: [Number],
    title: [String, Number],
    description: [String, Number],
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
    ...mapGetters(['getTempTodo']),
  },
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

input.form-group--error {
  border: 2px solid red;
}

.form-group {
  position: relative;
}

.invalid-feedback {
  color: white;
  background-color: red;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>