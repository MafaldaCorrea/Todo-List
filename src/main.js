import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
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
            completed: true,
            editing: false,
          },
          {
            id: 3,
            title: "Print out proof of address",
            completed: false,
            editing: false,
          },
        ],
    }
  },
  mutations: {
    addTodo(state, todo) {
        state.todos.push(todo)
    },
    removeTodo(state, index) {
        state.todos.splice(index, 1);
    },
    updateTodo(state, payload) {
        state.todos.splice(payload.index, 1, payload.todo);
    },
    clearCompleted(state) {
        state.todos = state.todos.filter(
        (t) => !t.completed
        );
    },
    updateFilter(state, filter) {
        state.filter = filter;
    },
    checkAllTodos(state, isChecked) {
        state.todos.map((m) => (m.completed = isChecked));
    },
  },
  getters: {
    remainingItems(state) {
        return state.todos.filter((t) => !t.completed).length;
    },
    itemsLabel(state, getters) {
        return getters.remainingItems == 1 ? "item" : "items";
    },
    anyRemainingItems(state, getters) {
        return getters.remainingItems > 0;
    },
    anyCompletedTodos(state) {
        return state.todos.filter((t) => t.completed).length > 0;
    },
    todoList(state) {
        switch (state.filter) {
            case "active":
                return state.todos.filter((t) => !t.completed);
            case "completed":
                return state.todos.filter((t) => t.completed);
            default:
                return state.todos;
        }
    }
  },
})

const app = createApp(App)
app.use(store)
app.mount('#app')