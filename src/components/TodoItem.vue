<template>
  <li class="list-group-item list-group-item-action">
    <input
      class="form-check-input me-1"
      type="checkbox"
      v-model="todoCopy.completed"
      @change="doneEdit"
    />
    <label
      v-show="!todoCopy.editing"
      :class="{ 'text-decoration-line-through': todoCopy.completed }"
      @dblclick="editTodo($event)"
    >
      {{ todoCopy.title }}
    </label>
    <input
      type="text"
      class="border-0"
      v-show="todoCopy.editing"
      v-model="todoCopy.title"
      @blur="doneEdit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
    />
    <button
      type="button"
      class="btn-close float-end"
      aria-label="Close"
      @click="removeTodo(index)"
    ></button>
  </li>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
    },
    index: {
      type: Number,
    },
    checkAll: {
      type: Boolean,
    },
  },
  data() {
    return {
      beforeEdit: "",
      todoCopy: { ...this.todo },
    };
  },
  watch: {
    checkAll() {
      this.todoCopy.completed = this.checkAll ? true : this.todo.completed;
    },
  },
  methods: {
    removeTodo(index) {
      this.$emit("removedTodo", index);
    },
    editTodo(event) {
      this.todoCopy.editing = true;
      this.beforeEdit = this.todoCopy.title;
      setTimeout(() => event.target.nextElementSibling.focus(), 50);
    },
    doneEdit() {
      if (!this.todoCopy.title.trim()) this.removeTodo(this.index);
      this.todoCopy.editing = false;
      this.$emit("finishedEdit", { index: this.index, todo: this.todoCopy });
    },
    cancelEdit() {
      this.todoCopy.title = this.beforeEdit;
      this.doneEdit(this.todoCopy);
    },
  },
};
</script>
