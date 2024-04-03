<template>
<!-- Modal -->
<div class="modal-wrapper">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">할일 삭제</h5>
        <button type="button" class="close">
          <span @click="onclose">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        정말 삭제하시겠습니까?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="onClose">Close</button>
        <button type="button" class="btn btn-danger" @click="onDelete">삭제</button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
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

<style>
    .modal-wrapper {
        position : fixed;
        top: 0px;
        left : 0px;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }
</style>