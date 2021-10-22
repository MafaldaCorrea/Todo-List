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
      :checkAll="!anyRemainingItems"
      @removedTodo="removeTodo"
      @finishedEdit="finishedEdit"
    ></todo-item>
  </ul>
  <div class="mt-3 pb-3 clearfix border-bottom">
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
    <div class="float-end">{{ remainingItems }} {{ itemsLabel }} left</div>
  </div>
  <div class="mt-3 pb-3 clearfix border-bottom">
    <div class="float-start">
      <button
        class="btn btn-sm btn-outline-secondary me-2"
        :class="{ active: filter == 'all' }"
        @click="filter = 'all'"
      >
        All
      </button>
      <button
        class="btn btn-sm btn-outline-secondary me-2"
        :class="{ active: filter == 'active' }"
        @click="filter = 'active'"
      >
        Active
      </button>
      <button
        class="btn btn-sm btn-outline-secondary me-2"
        :class="{ active: filter == 'completed' }"
        @click="filter = 'completed'"
      >
        Completed
      </button>
    </div>
    <div class="float-end">
      <button
        class="btn btn-sm btn-outline-secondary"
        @click="clearCompleted"
        v-if="anySelectedItems"
      >
        Clear completed
      </button>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";

export default {
  name: "todo-list",
  components: {
    TodoItem,
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
      this.todos.push({
        id: this.todoId,
        title: this.newTodo,
        completed: false,
        editing: false,
      });
      this.newTodo = "";
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    finishedEdit(data) {
      this.todos.splice(data.index, 1, data.todo);
    },
    checkAllTodos() {
      this.todos.map((m) => (m.completed = event.target.checked));
    },
    clearCompleted() {
      console.log("hi");
      this.todos = this.todos.filter((t) => !t.completed);
    },
  },
  computed: {
    remainingItems() {
      return this.todos.filter((t) => !t.completed).length;
    },
    itemsLabel() {
      return this.remainingItems == 1 ? "item" : "items";
    },
    anyRemainingItems() {
      return this.remainingItems > 0;
    },
    anySelectedItems() {
      return this.todos.filter((t) => t.completed).length > 0;
    },
    todoList() {
      switch (this.filter) {
        case "active":
          return this.todos.filter((t) => !t.completed);
        case "completed":
          return this.todos.filter((t) => t.completed);
        default:
          return this.todos;
      }
    },
  },
};
</script>
