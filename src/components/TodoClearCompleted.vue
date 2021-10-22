<template>
  <div class="float-end">
    <button
      class="btn btn-sm btn-outline-secondary"
      @click="clearCompleted"
      v-if="anyCompletedTodos"
    >
      Clear completed
    </button>
  </div>
</template>

<script>
export default {
  name: "todo-clear-completed",
  methods: {
    clearCompleted() {
      this.$store.commit("clearCompleted");
    },
  },
  computed: {
    anyCompletedTodos() {
      return this.$store.getters.anyCompletedTodos;
    },
  },
};
</script>
