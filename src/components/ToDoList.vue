<template>
  <div>
    <h2>TODOS' List</h2>
    <div v-if="todoList.length && !isLoading" class="list">
      <transition-group name="list" tag="p">
      <ToDoItem
          v-for="todo in todoList"
          :key="todo.id"
          :todo="todo"
          @remove="$emit('remove', todo)"
      />
      </transition-group>
    </div>
    <div class="empty" v-else-if="!todoList.length && !isLoading">
      <h4>There aren't any todos in your list</h4>
    </div>
  </div>
</template>

<script>
import ToDoItem from "@/components/ToDoItem";

export default {
  name: "ToDoList",
  components: {ToDoItem},
  props: {
    todoList: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.empty h4 {
  font-weight: 600;
  color: navy;
  text-shadow: 1px 1px 5px rgba(0,0,0,0.5);
  text-align: center;
}

.list,
.list > p {
  display: flex;
  flex-wrap: wrap;
  margin: 0.5rem 0 0;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>