<template>
  <div class="container">
    <h2 class="mt-5 d-inline-block">sean's todo-list</h2>
    <TodoSimpleForm @add-todo="addTodo"/>
    <br>
    <div v-if="!todos.length" class="mt-2">
      등록된 할일이 없습니다!
    </div>
    <TodoList :todos="todos" @toggle-todo="toggleTodo" @delete-todo="todoDelete"/>
  </div>
</template>

<script>

import { ref } from 'vue';
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
    const todoDelete = (id) => {
      //삭제할 데이터의 id로 index를 구해온다.
      const todoDeleteIndex = todos.value.findIndex((todo) => todo.id === id)
      todos.value.splice(todoDeleteIndex, 1)
    }

    //자식 컴포넌트에서 데이터 받아오기(TodoSimpleForm.vue)
    const addTodo = (todo) => {
      //첫번째에 데이터 넣어서 등록한 todo가 최상단으로 올라오게 하기
      todos.value.unshift(todo);
    }

    //체크박스 선택 시 할일 완료/미완료 
    const toggleTodo = (id) => {
      //id로 할일/미완료 할 데이터의 정보를 들고온다.
      const todoCompleted = todos.value.find((todo) => todo.id === id)
      todoCompleted.completed = !todoCompleted.complete
    }

    return {
      type,
      todos,
      addTodo,
      todoDelete,
      toggleTodo
    }
  }
}
</script>

<style scoped>
  
</style>
