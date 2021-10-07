<template>
  <div class="todo">
    <div class="todo-inner">
      <div class="inner-content">
        <h3 class="title"><strong>{{ todo.title }}</strong></h3>
        <h4 class="description">{{ todo.description }}</h4>
      </div>
      <div class="todo_btns">
        <v-btn
            class="create"
            @click="$router.push(`/todos/${todo.id}`)"
        >
          Open
        </v-btn>
        <v-btn
            class="error"
            @click="$emit('remove', todo)"
        >
          Remove
        </v-btn>
      </div>
      <h5 v-if="this.$store.getters.getCurrentUser === 'admin@gmail.com'">Author: {{ this.todo.user ? this.todo.user : 'unknown' }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToDoItem",
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
h5 {
  margin-top: .5rem;
}
.todo {
  padding: .25rem;
  width: 33.333%;
  min-height: 195px;
}

.todo-inner {
  margin: 1rem 0.67rem 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border: 2px solid teal;
  min-height: 180px;
  border-radius: 5px;
}

.todo_btns {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.title strong {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 990px) {
  .todo {
    width: 50%;
  }
}

@media (max-width: 576px) {
  .todo {
    width: 100%;
    height: auto;
  }
}
</style>