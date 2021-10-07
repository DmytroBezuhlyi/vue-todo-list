<template>
  <div>
    <div v-if="isLoading">
      <ToDoPreloader/>
    </div>
    <div v-else>
      <LoginForm/>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import preloaderMixin from "@/mixins/preloaderMixin";
import ToDoPreloader from "../components/UI/ToDoPreloader";

export default {
  name: "LoginPage",
  components: {LoginForm, ToDoPreloader},
  mixins: [preloaderMixin],
}
</script>

<style scoped>

</style>