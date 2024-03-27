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
    <button type="submit" class="btn btn-primary">
      저장
    </button>
    <button class="btn btn-outline-dark ml-2" @click="moveToTodoListPage">
      취소
    </button>
  </form>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ref } from '@vue/reactivity'

const route = useRoute()
const router = useRouter()
const todo = ref(null)
const loading = ref(true)

//todo 내용 불러오기
const getTodo = async() => {
  
  const res = await axios.get(`http://localhost:3000/todos/${route.params.id}`)
  todo.value = res.data
  loading.value = false
}

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
    await axios.put(`http://localhost:3000/todos/${route.params.id}`,{
      subject : todo.value.subject,
      completed : todo.value.completed
    })

    moveToTodoListPage()
    
  } catch (err) {
    alert('데이터 수정 중 error가 발생했습니다. 관리자에게 문의해주세요.');
    console.log(err);
  }  
}

getTodo()

</script>

<style>

</style>