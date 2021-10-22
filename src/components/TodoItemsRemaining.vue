<template>
  <div class="float-end">{{ remainingItems }} {{ itemsLabel }} left</div>
</template>

<script>
export default {
  name: "todo-remaining",
  computed: {
    remainingItems() {
      return this.$store.getters.remainingItems;
    },
    itemsLabel() {
      return this.$store.getters.itemsLabel;
    },
  },
};
</script>
