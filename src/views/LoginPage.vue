<template>
  <div>
    <div v-if="isLoading">
      <ToDoPreloader/>
    </div>
    <div v-else>
      <LoginForm v-if="!this.getIsAuth"/>
      <h1 v-else>Howdy, {{ this.getCurrentUser }}! You have already logged in</h1>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import preloaderMixin from "@/mixins/preloaderMixin";
import ToDoPreloader from "../components/UI/ToDoPreloader";
import {mapGetters} from "vuex";

export default {
  name: "LoginPage",
  components: {LoginForm, ToDoPreloader},
  mixins: [preloaderMixin],
  computed: {
    ...mapGetters(['getIsAuth', 'getCurrentUser'])
  }
}
</script>

<style scoped>

</style>