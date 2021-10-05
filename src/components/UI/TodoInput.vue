<template>
  <label>
    {{ label }}
    <input
        type="text"
        :value="value"
        @input="updateInput"
        class="input"
        @keypress.enter="create"
    /></label>
</template>

<script>
export default {
  name: "ToDoInput",
  props: {
    value: [String, Number],
    label: {
      type: String
    }
  },
  methods: {
    updateInput(ev) {
      this.$emit('input', ev.target.value);
    },
    create() {
      this.$emit('create');
    }
  }
}
</script>

<style scoped>
.input {
  margin-top: .25rem;
  width: 100%;
  border: 1px solid teal;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  margin-bottom: 1.65rem;
}

.input:nth-last-of-type {
  margin-bottom: 0;
}

.error {
  border-color: red;
  margin-bottom: 0;
}
</style>