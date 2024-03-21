<template>
  <div class="container">
    <h2 class="mt-5 d-inline-block">sean's todo-list</h2>
    <input type="text" class="form-control" :value="searchText" @input="handleInput" placeholder="검색어를 입력해주세요.">
    <hr/>
    <TodoSimpleForm @add-todo="addTodo"/>
    <br>
    <div class="red"> {{ error }}</div>
    <div v-if="!filterTodos.length" class="mt-2">
      할일이 없습니다.
    </div>
    <TodoList :todos="filterTodos" @toggle-todo="toggleTodo" @delete-todo="todoDelete"/>
  </div>
</template>

<script>

import { ref, computed } from 'vue';
import TodoSimpleForm  from './components/TodoSimpleForm.vue'
import TodoList from './components/TodoList.vue'
import axios from 'axios'

export default {
  components : {
    TodoSimpleForm,
    TodoList
  },
  setup() {
    const type = 'text'
    const todos = ref([])
    const error = ref('')

    //todo 삭제
    const todoDelete = (id) => {
      //삭제할 데이터의 id로 index를 구해온다.
      const todoDeleteIndex = todos.value.findIndex((todo) => todo.id === id)
      todos.value.splice(todoDeleteIndex, 1)
    }

    //자식 컴포넌트에서 데이터 받아오기(TodoSimpleForm.vue)
    //async을 사용하여 비동기로 수정
    const addTodo = async (todo) => {
      
      error.value = ''
      
      try {
        //axios를 이용하여 데이터 db.json에 저장
        const res = await axios.post('http://localhost:3000/todos', {
          subject : todo.subject,
          completed: todo.completed 
        })

        todos.value.unshift(res.data)

      } catch (err) {
        error.value = 'error가 발생했습니다. 관리자에게 문의해주세요.'
        console.log(err);
      }

      
    }

    //체크박스 선택 시 할일 완료/미완료 
    const toggleTodo = (id) => {
      //id로 할일/미완료 할 데이터의 정보를 들고온다.
      const todoCompleted = todos.value.find((todo) => todo.id === id)
      todoCompleted.completed = !todoCompleted.complete
    }

    const searchText= ref('');
    //검색필터
    const filterTodos = computed(() => {
      //검색어가 있으면
      if(searchText.value) {
        //검색어가 todo.subject에 포함된게 있으면
         return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value)
        })
      }

      return todos.value;
    })

     // 입력 이벤트 핸들러
    const handleInput = (e) => {
      searchText.value = e.target.value;
    };

    return {
      type,
      todos,
      addTodo,
      todoDelete,
      toggleTodo,
      searchText,
      filterTodos,
      handleInput
    }
  }
}
</script>

<style scoped>
  .red {
    color : red
  }
</style>
