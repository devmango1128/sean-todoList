<template>
    <div class="alert alert-success toast-box" :class="`alert-${type}`" :type ="ToastAlertType" role="alert">
        {{ message }}
    </div>
</template>

<script setup>
    // props는 객체 형태로 선언
    defineProps({
        message : {
            type : String,
            required : true
        },
        type : {
            type : String,
            default: 'success'
        }
            
    });
</script>
<style>
    .toast-box {
        position: fixed;
        top: 10px;
        right: 10px;
    }
</style>