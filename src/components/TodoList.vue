<template>
  <div v-for="(todo) in todos" :key="todo.id" class="card mt-3">
      <div class="card-body p-2 d-flex align-items-center" @click=moveToPage(todo.id)>
        <div class="form-check flex-grow-1">
          <input type="checkbox" class="form-check-input" :checked="todo.completed" @change="toggleTodo(todo.id, $event)" @click.stop>
          <label class="form-check-label" :class="{ todo : todo.completed }">
              {{ todo.subject }}
          </label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click.stop="openModal(todo.id)">삭제</button>
        </div>
      </div>
    </div>
    <Teleport to="#modal">
      <Modal v-if="showModal" @close="closeModal" @delete="todoDelete"/>
    </Teleport>
</template>

<script>

import { useRouter } from 'vue-router'
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'

export default {
    components : {
      Modal
    },
    //부모에서 데이터 받기
    props : ['todos']
    , emits : ['toggle-todo', 'delete-todo']
    , setup(props, { emit }) {

        const router = useRouter()
        const showModal = ref(false)
        const todoDeleteId = ref(null)

        const toggleTodo = (id, event) => {
            //부모에게 데이터 보내기
            emit('toggle-todo', id, event.target.checked)
        }

        const openModal = (id) => {
          todoDeleteId.value = id
          showModal.value = true
        }

        const closeModal = () => {
          todoDeleteId.value = null
          showModal.value = false
        }

        const todoDelete = () => {
            emit('delete-todo', todoDeleteId.value)

            showModal.value = false
            todoDeleteId.value = null
        }

        const moveToPage = (id) => {
            //router.push('/todos/' + id) 이 방법은 권장하지 않음
            router.push({
              name : 'Todo',
              params : {
                id : id
              }
            })
        }

        return {
            toggleTodo,
            todoDelete,
            moveToPage,
            showModal,
            openModal,
            closeModal
        }
    }
}
</script>

<style>
  .todo {
    color : #acaaaa;
    text-decoration: line-through;
  }

  .card-body, .card-body label {
    cursor: pointer;
  }
</style>