export default {
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    loading() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false
      }, 700);
    }
  },
  mounted() {
    this.loading()
  }
}