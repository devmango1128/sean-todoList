<template>
  <h1>TO-DO Page</h1>
  <div v-if="loading">Loading...</div>
  <form v-else @submit.prevent="onUpdate">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>할일</label>
          <input type="text" class="form-control" v-model="todo.subject">
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>상태</label>
          <div>
            <button type="button" class="btn btn-success" :class="todo.completed ? 'btn-success' : 'btn-danger'" @click="toggleTodoStatus">
              {{ todo.completed ? '완료' : '미완료' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
      저장
    </button>
    <button class="btn btn-outline-dark ml-2" @click="moveToTodoListPage">
      취소
    </button>
  </form>
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType"/>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ref, computed } from 'vue'
import _ from 'lodash' //데이터 비교하는 라이브러리
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/toast.js'

const route = useRoute()
const router = useRouter()
const todo = ref(null)
const originalTodo = ref(null)
const loading = ref(true)

//todo 내용 불러오기
const getTodo = async() => {

  try{
    
    const res = await axios.get(`http://localhost:3000/todos/${route.params.id}`)
    todo.value = { ...res.data }
    originalTodo.value = { ...res.data }
    loading.value = false
  
  } catch(err) {

    triggerToast('데이터 조회 중 error가 발생했습니다. 관리자에게 문의해주세요.','danger');
    console.log(err);
  }
  
}

//내용 변경사항 있는지 확인(변경 사항 있을때만 수정)
const todoUpdated = computed(() => {
  return !_.isEqual(todo.value, originalTodo.value)
})

//완료, 미완료 상태 변경
const toggleTodoStatus = () => {
  todo.value.completed = !todo.value.completed
}

//TODOLIST 페이지로 이동
const moveToTodoListPage = () => {
  router.push({
    name: 'Todos'
  })
}

//데이터 수정
const onUpdate = async () => {

  try{

    const res = await axios.put(`http://localhost:3000/todos/${route.params.id}`,{
      subject : todo.value.subject,
      completed : todo.value.completed
    })

    originalTodo.value = {...res.data}

    triggerToast('데이터 수정이 완료되었습니다.')
    
  } catch (err) {
    triggerToast('데이터 수정 중 error가 발생했습니다. 관리자에게 문의해주세요.', 'danger');
    console.log(err);
  }  
}

//Toast로 알림 표시
//Toast

const {
  toastMessage,
  toastAlertType,
  showToast,
  triggerToast,
} = useToast(true);

//Todo 내용 불러오기
getTodo()

</script>

<style>

</style>