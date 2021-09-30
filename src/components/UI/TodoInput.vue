<template>
  <input
      class="input"
      type="text"
      :value="value"
      @input="updateInput"
  />
</template>

<script>
export default {
  name: "ToDoInput",
  props: {
    value: [String, Number]
  },
  methods: {
    updateInput(ev) {
      this.$emit('input', ev.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid teal;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  margin-bottom: 1.65rem;
}

.input:last-child {
  margin-bottom: 0;
}

.error {
  border-color: red;
  margin-bottom: 0;
}
</style>