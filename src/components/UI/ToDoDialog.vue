<template>
  <div>
    <div
        class="dialog"
        v-if="this.getIsModalShow"
        @click="hideModal"
    >
      <div
          class="dialog-content"
          @click.stop
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "ToDoDialog",
  methods: {
    ...mapMutations(['setIsModalShow']),
    hideModal() {
      this.setIsModalShow(false);
    }
  },
  computed: {
    ...mapGetters(['getIsModalShow']),
  },
}
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 1;
}

.dialog-content {
  margin: auto;
  padding: 0.5rem;
  background: #ffffff;
  border-radius: 12px;
  min-height: 150px;
  min-width: 305px;
}
</style>