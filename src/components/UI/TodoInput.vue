<template>
  <div>
    <label>{{ label }}</label>
    <input
        :type="type"
        class="input"
        :placeholder="placeholder"
        :value="this.inputValue"
        @input="updateInput"
    />
  </div>
</template>

<script>
export default {
  name: "ToDoInput",
  props: {
    inputValue: [String, Number],
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
    }
  }
}
</script>

<style>
input {
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

input.form-group--error {
  border: 2px solid red;
}

.form-group {
  position: relative;
}

.invalid-feedback {
  color: white;
  background-color: red;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>