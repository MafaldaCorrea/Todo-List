<template>
  <div class="float-start">
    <input
      id="checkAll"
      class="form-check-input"
      type="checkbox"
      :checked="!anyRemainingItems"
      @change="checkAllTodos"
    />
    <label for="checkAll" class="ms-2">Check all</label>
  </div>
</template>

<script>
export default {
  name: "todo-check-all",
  methods: {
    checkAllTodos() {
      this.$store.commit("checkAllTodos", event.target.checked);
    },
  },
  computed: {
    anyRemainingItems() {
      return this.$store.getters.anyRemainingItems;
    },
  },
};
</script>
