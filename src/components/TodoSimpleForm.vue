<template>
    <form @submit.prevent = "todoAdd">
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <input :type="type" class="form-control " v-model="todo" placeholder="할일을 입력하세요.">
        </div>
        <div>
          <button class="btn btn-primary btn-success" type="submit">등록</button>
        </div>
      </div>
      <div v-show="hasError" class="text-danger mt-2">
        할일을 입력해주세요.
      </div>
    </form>
</template>
<script>

import { ref } from "vue";

export default {

    setup(props, context) {

        const todo = ref('')
        const hasError = ref(false)

        //todo 추가
        const todoAdd = () => {
            if(todo.value === '') {
                hasError.value = true
            } else {
                //부모로 데이터 보내기, emit
                context.emit('add-todo', {
                    id : Date.now(),
                    subject : todo.value,
                    completed: false 
                })
                todo.value = ''
                hasError.value = false
            }
        }

        return {
            todo,
            hasError,
            todoAdd
        }
    }
}
</script>

<style scoped>

</style>

