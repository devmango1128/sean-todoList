<template>
  <List :items="todos">   
    <template #default="{ item }"> 
      <div class="card-body p-2 d-flex align-items-center" @click=moveToPage(item.id)>
          <div class="form-check flex-grow-1">
            <input type="checkbox" class="form-check-input" :checked="item.completed" @change="toggleTodo(item.id, $event)" @click.stop>
            <label class="form-check-label" :class="{ todo : item.completed }">
                {{ item.subject }}
            </label>
          </div>
          <div>
            <button class="btn btn-danger btn-sm" @click.stop="openModal(item.id)">삭제</button>
          </div>
        </div>
      </template>
  </List> 
    <Teleport to="#modal">
      <Modal v-if="showModal" @close="closeModal" @delete="todoDelete" />
    </Teleport>
</template>

<script>

import { useRouter } from 'vue-router'
import Modal from '@/components/DeleteModal.vue'
import { ref } from 'vue'
import List from '@/components/List.vue'

export default {
    components : {
      Modal,
      List
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