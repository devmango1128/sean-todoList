<template>
  <div class="container">
    <h2 class="mt-5 d-inline-block">sean's todo-list</h2>
    <br>
    <form @submit.prevent = "todoAdd">
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <input :type="type" class="form-control " v-model="todo" placeholder="할일을 입력하세요.">
        </div>
        <div>
          <button class="btn btn-primary btn-success" type="submit">등록</button>
        </div>
      </div>
      <div v-show="hasError" class="text-danger mt-2">
        할일을 입력해주세요.
      </div>
    </form>
    <div v-for="todo in reversedItems" :key="todo.id" class="card mt-3">
      <div class="card-body p-2">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" v-model="todo.completed">
          <label class="form-check-label" :class="{ todo : todo.completed }">
              {{ todo.subject }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, computed } from 'vue';

export default {
  setup() {
    const type = 'text'
    const todo = ref('')
    const todos = ref([])
    const hasError = ref(false)

    const todoAdd = () => {
      if(todo.value === '') {
        hasError.value = true
      } else {
        todos.value.push({
          id : Date.now(),
          subject : todo.value,
          completed: false      
        })
        todo.value = ''
        hasError.value = false
      }
    }

    return {
      type,
      todo,
      todos,
      todoAdd,
      reversedItems: computed(() => {
        // 배열을 역순으로 반환
        return Array.isArray(todos.value) ? todos.value.slice().reverse() : [];
      }),
      hasError
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
