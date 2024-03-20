<template>
  <div v-for="(todo) in todos" :key="todo.id" class="card mt-3">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input type="checkbox" class="form-check-input" :value="todo.completed" @change="toggleTodo(todo.id)">
          <label class="form-check-label" :class="{ todo : todo.completed }">
              {{ todo.subject }}
          </label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click="todoDelete(todo.id)">삭제</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    //부모에서 데이터 받기
    props : ['todos']
    , emits : ['toggle-todo', 'delete-todo']
    , setup(props, { emit }) {
        const toggleTodo = (id) => {
            //부모에게 데이터 보내기
            emit('toggle-todo', id)
        }

        const todoDelete = (id) => {
            emit('delete-todo', id)
        }

        return {
            toggleTodo,
            todoDelete,
        }
    }
}
</script>

<style>
  .todo {
    color : #acaaaa;
    text-decoration: line-through;
  }
</style>