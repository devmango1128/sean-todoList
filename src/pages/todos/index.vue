<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>sean's todo-list</h2>
      <button class="btn btn-primary btn-success" @click="moveToCreatePage">할일 등록</button>
    </div>
    <input type="text" class="form-control" :value="searchText" @input="handleInput" placeholder="검색어를 입력해주세요." @keyup.enter="searchTodo">
    <hr/>
    <br>
    <div class="red"> {{ error }}</div>
    <div v-if="!todos.length" class="mt-2">
      할일이 없습니다.
    </div>
    <TodoList :todos="todos" @toggle-todo="toggleTodo" @delete-todo="todoDelete"/>
    <hr>
    <Pagination v-if="todos.length" :numberOfPages="numberOfPages" :currentPage="currentPage" @click="getTodos"/>
  </div>
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType"/>
</template>

<script>

import { ref, computed, watch } from 'vue';
import TodoList from '@/components/TodoList.vue'
import axios from 'axios'
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/toast.js'
import { useRouter } from 'vue-router'
import Pagination from '@/components/Pagination.vue'

export default {
  components : {
    TodoList,
    Toast,
    Pagination
  },
  setup() {
    const router = useRouter()
    const type = 'text'
    const todos = ref([])
    const error = ref('')
    //pages
    const numberOfTodos = ref(0)
    const limit = 5
    const currentPage = ref(1)

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit)
    })

    //Toast
    const {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast
    } = useToast(false);

    //search
    const searchText = ref('')

    //todo 삭제
    //axios를 이용하여 데이터 삭제
    const todoDelete = async (id) => {

      error.value = ''
      
      try{
        
        await axios.delete(`http://localhost:3000/todos/${id}`)
        //삭제할 데이터의 id로 index를 구해온다.
        const todoDeleteIndex = todos.value.findIndex((todo) => todo.id === id)
        todos.value.splice(todoDeleteIndex, 1)
      
        getTodos()

      } catch (err) {
        triggerToast('데이터 삭제 중 error가 발생했습니다. 관리자에게 문의해주세요.', 'danger')
        console.log(err);
      }
      
    }

    //axios를 이용하여 데이터 조회해오기
    const getTodos = async (page = currentPage.value) => {
      
      currentPage.value = page

      error.value = ''

      try {
      
        const res = await axios.get(`http://localhost:3000/todos?_sort=id&_order=DESC&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);
        numberOfTodos.value = res.headers['x-total-count']
        todos.value = res.data
      
      } catch (err) {
        triggerToast('데이터 조회 중 error가 발생했습니다. 관리자에게 문의해주세요.', 'danger')
        console.log(err);
      }
    }

    //데이터 조회
    getTodos()

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

        getTodos()

      } catch (err) {
        triggerToast('데이터 등록 중 error가 발생했습니다. 관리자에게 문의해주세요.', 'danger')
        console.log(err);
      }
    }

    const moveToCreatePage = () => {
       router.push({
        name: 'TodoCreate'
       })
    }

    //체크박스 선택 시 할일 완료/미완료
    //axios 적용 
    const toggleTodo = async (id, checked) => {

      error.value = ''

      try {
        
        const complete = todos.value.find((todo) => todo.id === id)
      
        //id로 할일/미완료 할 데이터의 정보를 들고온다.
        await axios.patch(`http://localhost:3000/todos/${id}`, { 
            completed : checked
        })
        
        complete.completed = checked

      } catch ( err ) {
        triggerToast('데이터 수정 중 error가 발생했습니다. 관리자에게 문의해주세요.', 'danger')
        console.log(err);
      }
      
    }

    let timeout = null

    const searchTodo = () => {
      clearTimeout(timeout)
      getTodos();
    }

    //페이징 후 검색 필터 변경(watch 사용)
    watch(searchText, () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        getTodos(1)
      }, 1000)
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
      handleInput,
      error,
      numberOfPages,
      currentPage,
      getTodos,
      searchTodo,
      toastMessage,
      toastAlertType,
      showToast,
      moveToCreatePage
    }
  }
}
</script>

<style scoped>
  .red {
    color : red
  }

  a {
    cursor:pointer
  }
</style>
