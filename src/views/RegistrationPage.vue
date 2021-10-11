<template>
  <div>
    <div v-if="isLoading">
      <ToDoPreloader/>
    </div>
    <div v-else>
      <RegistrationForm v-if="!this.getIsAuth"/>
      <h1 v-else>Howdy, {{ this.getCurrentUser }}! You have already logged in</h1>
    </div>
  </div>
</template>

<script>
import RegistrationForm from "@/components/RegistartionForm";
import ToDoPreloader from "@/components/UI/ToDoPreloader";
import preloaderMixin from "../mixins/preloaderMixin";
import {mapGetters} from "vuex";

export default {
  name: "RegistrationPage",
  components: {RegistrationForm, ToDoPreloader},
  mixins: [preloaderMixin],
  computed: {
    ...mapGetters(['getIsAuth', 'getCurrentUser']),
  }
}
</script>

<style scoped>

</style>