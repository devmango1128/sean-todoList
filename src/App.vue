<template>
  <div class="container">
    <h2 class="mt-5 d-inline-block">sean's todo-list</h2>
    <TodoSimpleForm @add-todo="addTodo"/>
    <br>
    <div v-if="!todos.length" class="mt-2">
      등록된 할일이 없습니다!
    </div>
    <div v-for="(todo, index) in reversedItems" :key="todo.id" class="card mt-3">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input type="checkbox" class="form-check-input" v-model="todo.completed">
          <label class="form-check-label" :class="{ todo : todo.completed }">
              {{ todo.subject }}
          </label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click="todoDelete(index)">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, computed } from 'vue';
import  TodoSimpleForm  from './components/TodoSimpleForm.vue'

export default {
  components : {
    TodoSimpleForm
  },
  setup() {
    const type = 'text'
    const todos = ref([])

    //todo 삭제
    const todoDelete = (index) => {
      todos.value.splice(index, 1)
    }

    const addTodo = (todo) => {
      todos.value.push(todo);
    }

    return {
      type,
      todos,
      reversedItems: computed(() => {
        // 배열을 역순으로 반환
        return Array.isArray(todos.value) ? todos.value.slice().reverse() : [];
      }),
      addTodo,
      todoDelete
    }
  }
}
</script>

<style scoped>
  .todo {
    color : #acaaaa;
    text-decoration: line-through;
  }
</style>
