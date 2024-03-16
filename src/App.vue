<template>
  <div class="container">
    <h2 class="mt-5 d-inline-block">sean's todo-list</h2>
    <TodoSimpleForm @add-todo="addTodo"/>
    <br>
    <div v-if="!todos.length" class="mt-2">
      등록된 할일이 없습니다!
    </div>
    <TodoList :todos="todos"/>
  </div>
</template>

<script>

import { ref, computed } from 'vue';
import TodoSimpleForm  from './components/TodoSimpleForm.vue'
import TodoList from './components/TodoList.vue'

export default {
  components : {
    TodoSimpleForm,
    TodoList
  },
  setup() {
    const type = 'text'
    const todos = ref([])

    //todo 삭제
    const todoDelete = (index) => {
      todos.value.splice(index, 1)
    }

    //자식 컴포넌트에서 데이터 받아오기(TodoSimpleForm.vue)
    const addTodo = (todo) => {
      todos.value.push(todo);
    }

    return {
      type,
      todos: computed(() => {
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
