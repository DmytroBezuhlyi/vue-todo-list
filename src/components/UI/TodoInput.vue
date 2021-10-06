<template>
  <div>
    <label>{{ label }}</label>
    <input
        :type="type"
        class="input"
        :placeholder="placeholder"
        :value="value"
        @input="updateInput"
        @keypress.enter="create"
    />
  </div>
</template>

<script>
export default {
  name: "ToDoInput",
  props: {
    value: [String, Number],
    label: {
      type: String
    },
    type: {
      type: String
    },
    placeholder: {
      type: String
    },
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

<style>
.input {
  margin-top: .25rem;
  width: 100%;
  border: 2px solid teal;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  margin-bottom: 1.65rem;
  outline: none;
}

.input:nth-last-of-type {
  margin-bottom: 0;
}

.form-group--error input {
  border-color: red;
}
</style>