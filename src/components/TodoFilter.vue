<template>
  <div class="float-start">
    <button
      class="btn btn-sm btn-outline-secondary me-2"
      :class="{ active: filter == 'all' }"
      @click="updateFilter('all')"
    >
      All
    </button>
    <button
      class="btn btn-sm btn-outline-secondary me-2"
      :class="{ active: filter == 'active' }"
      @click="updateFilter('active')"
    >
      Active
    </button>
    <button
      class="btn btn-sm btn-outline-secondary me-2"
      :class="{ active: filter == 'completed' }"
      @click="updateFilter('completed')"
    >
      Completed
    </button>
  </div>
</template>

<script>
export default {
  name: "todo-filter",
  computed: {
    filter() {
      return this.$store.state.filter;
    },
  },
  methods: {
    updateFilter(filter) {
      this.$store.commit("updateFilter", filter);
    },
  },
};
</script>
