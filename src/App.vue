<template>
  <div class="container">
    <h2 class="mt-5 d-inline-block">sean's todo-list</h2>
    <br>
    <form class="d-flex" @submit.prevent = "todoAdd">
      <div class="mr-2">
        <input :type="type" class="form-control " v-model="todo" placeholder="todo list를 입력하세요.">
      </div>
      <div>
        <button class="btn btn-primary" type="submit">등록</button>
      </div>
    </form>
    <div class="card mt-3">
      <div class="card-body p-2">
          {{ todos }}
      </div>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue';

export default {
  setup() {
    const type = 'text'
    const todo = ref('')
    const todos = ref([])

    const todoAdd = () => {
      todos.value.push({
          id : Date.now(),
          subject : todo.value      
      })
    }

    return {
      type,
      todo,
      todos,
      todoAdd
    }
  }
}
</script>

<style>
</style>
