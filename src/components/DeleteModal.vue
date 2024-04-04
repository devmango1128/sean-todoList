<template>
    <Modal>
        <template #title>
          할일 삭제
        </template>
        <template #body>
          할일을 삭제하시겠습니까?
        </template>
        <template #footer>
          <button type="button" class="btn btn-secondary" @click="onClose">Close</button>
          <button type="button" class="btn btn-danger" @click="onDelete">삭제</button>
        </template>
    </Modal>
</template>

<script setup>
import Modal from '@/components/Modal.vue'
import { getCurrentInstance } from 'vue';

// 현재 컴포넌트 인스턴스 가져오기
const { emit } = getCurrentInstance();

const onClose = () => {
    emit('close')
}

const onDelete = () => {
    emit('delete')
}

</script>

<style scoped>

</style>