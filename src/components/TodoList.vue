<template>
  <div>
    <input
      type="text"
      class="form-control form-control-lg"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
  </div>
  <ul class="list-group mt-3">
    <todo-item
      v-for="(todo, index) in todoList"
      :key="todo.id"
      :todo="todo"
      :index="index"
    ></todo-item>
  </ul>
  <div class="mt-3 pb-3 clearfix border-bottom">
    <TodoCheckAll />
    <TodoItemsRemaining />
  </div>
  <div class="mt-3 pb-3 clearfix border-bottom">
    <TodoFilter />
    <TodoClearCompleted />
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import TodoItemsRemaining from "./TodoItemsRemaining.vue";
import TodoCheckAll from "./TodoCheckAll.vue";
import TodoFilter from "./TodoFilter.vue";
import TodoClearCompleted from "./TodoClearCompleted.vue";

export default {
  name: "todo-list",
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFilter,
    TodoClearCompleted,
  },
  data() {
    return {
      newTodo: "",
      todoId: 3,
      filter: "all",
      todos: [
        {
          id: 1,
          title: "Get Dutch Bank Account",
          completed: true,
          editing: false,
        },
        {
          id: 2,
          title: "Get Dutch phone number",
          completed: false,
          editing: false,
        },
        {
          id: 3,
          title: "Print out proof of address",
          completed: false,
          editing: false,
        },
      ],
    };
  },
  methods: {
    addTodo() {
      if (!this.newTodo.trim()) return;
      this.todoId++;

      this.$store.commit("addTodo", {
        id: this.todoId,
        title: this.newTodo,
        completed: false,
        editing: false,
      });

      this.newTodo = "";
    },
  },
  computed: {
    todoList() {
      return this.$store.getters.todoList;
    },
  },
};
</script>
