<template>
<!-- Modal -->
<div class="modal-wrapper">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
          <slot name="title"></slot>
        </h5>
        <button type="button" class="close">
          <span @click="onclose">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';

// 현재 컴포넌트 인스턴스 가져오기
const { emit } = getCurrentInstance();

const onclose = () => {
    emit('close')
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