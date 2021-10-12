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
      }, 1000);
    }
  },
  mounted() {
    this.loading()
  }
}