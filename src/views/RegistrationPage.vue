<template>
  <div>
    <div v-if="isLoading">
      <ToDoPreloader/>
    </div>
    <div v-else>
      <RegistrationForm/>
    </div>
  </div>
</template>

<script>
import RegistrationForm from "@/components/RegistartionForm";
import ToDoPreloader from "@/components/UI/ToDoPreloader";
import preloaderMixin from "../mixins/preloaderMixin";

export default {
  name: "RegistrationPage",
  components: {RegistrationForm, ToDoPreloader},
  mixins: [preloaderMixin],
}
</script>

<style scoped>

</style>