<template>
  <div class="todo">
    <div>
      <h3><strong>{{ todo.title }}</strong></h3>
      <h4>{{ todo.description }}</h4>
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
.todo {
  margin: 1rem 0.545rem 1rem;
  padding: 1rem;
  border: 2px solid teal;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 235px;
}

.todo_btns {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

h4 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>