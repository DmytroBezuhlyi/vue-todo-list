export default {
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    loading() {
      setTimeout(() => {
        this.isLoading = true;
      }, 1000);
    }
  },
  beforeMount() {
    this.loading()
  }
}