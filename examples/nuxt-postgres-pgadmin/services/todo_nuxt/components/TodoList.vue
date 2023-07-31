<template>
  <div class="todo-app">
    <h1 class="app-header">Todo List</h1>

    <form @submit.prevent="addTodo" class="add-todo-form">
      <input v-model="newTodo" type="text" placeholder="Enter your todo..." class="todo-input" />
      <button type="submit" class="add-btn">Add Todo</button>
    </form>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <span
          @click="editTodo(todo.id)"
          :class="{ completed: todo.completed, editable: todo.editing }"
          v-if="!todo.editing"
        >
          {{ todo.title }}
        </span>
        <input
          v-else
          v-model="todo.title"
          type="text"
          class="todo-input"
          @keyup.enter="updateTodo(todo)"
          @blur="updateTodo(todo)"
        />
        <div>
          <button @click="toggleTodoStatus(todo.id)" class="complete-btn">
            {{ todo.completed ? 'Incomplete' : 'Complete' }}
          </button>
          <button @click="deleteTodo(todo.id)" class="delete-btn">Delete</button>
        </div>
      </li>
    </ul>
    <p v-if="showError" class="error-message">Please write a todo before adding.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      newTodo: '',
      showError: false,
    };
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await fetch('/api/todos');
        const data = await response.json();
        this.todos = data.map(todo => ({
          ...todo,
          editing: false,
        }));
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async addTodo() {
      if (this.newTodo.trim() === '') {
        this.showError = true;
        return;
      }
      try {
        const response = await fetch('/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: this.newTodo,
            completed: false,
          }),
        });

        const data = await response.json();
        this.todos.push({ ...data, editing: false });
        this.newTodo = '';
        this.showError = false;
      } catch (error) {
        console.error('Error creating todo:', error);
      }
    },
    async toggleTodoStatus(id) {
      try {
        const todoToUpdate = this.todos.find(todo => todo.id === id);
        const updatedTodo = {
          ...todoToUpdate,
          completed: !todoToUpdate.completed,
        };

        await fetch(`/api/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTodo),
        });

        this.todos = this.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    },
    async deleteTodo(id) {
      try {
        await fetch(`/api/todos/${id}`, {
          method: 'DELETE',
        });

        this.todos = this.todos.filter(todo => todo.id !== id);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    },
    editTodo(id) {
      this.todos = this.todos.map(todo =>
        todo.id === id ? { ...todo, editing: true } : { ...todo, editing: false }
      );
    },
    async updateTodo(todo) {
      try {
        const { id, title, completed } = todo;
        const updatedTodo = {
          ...todo,
          editing: false,
        };

        await fetch(`/api/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, completed }),
        });

        this.todos = this.todos.map(t =>
          t.id === id ? { ...t, title, editing: false } : t
        );
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    },
  },
  mounted() {
    this.fetchTodos();
  },
};
</script>


<style>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom right, #f9fafb, #e6eef3);
}
.app-header {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}

.todo-app {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-image: linear-gradient(to bottom, #FDE0D9, #FFF2CC);
}

.todo-list {
  list-style: none;
  padding: 0;
}


.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.delete-btn,
.complete-btn {
  padding: 8px 12px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color:#FF5976;
}

.complete-btn {
  background-color: #c76b98;
  margin-right: 5px;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.editable {
  cursor: pointer;
}

.add-todo-form {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.todo-input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-btn {
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 5px;
}

.add-btn:hover,
.delete-btn:hover,
.complete-btn:hover {
  opacity: 0.8;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
