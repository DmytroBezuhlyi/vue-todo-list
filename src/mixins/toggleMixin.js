export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false);
      this.$emit('update:edit', false);
    }
  }
}