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
          <button class="btn btn-danger btn-sm" @click.stop="todoDelete(todo.id)">삭제</button>
        </div>
      </div>
    </div>
</template>

<script>

import { useRouter } from 'vue-router'

export default {
    //부모에서 데이터 받기
    props : ['todos']
    , emits : ['toggle-todo', 'delete-todo']
    , setup(props, { emit }) {

        const router = useRouter()

        const toggleTodo = (id, event) => {
            //부모에게 데이터 보내기
            emit('toggle-todo', id, event.target.checked)
        }

        const todoDelete = (id) => {
            emit('delete-todo', id)
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
            moveToPage
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