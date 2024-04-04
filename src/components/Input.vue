<template>
    <div class="form-group">
        <label>{{ label }}</label>
        <input type="text" class="form-control" :value="subject" @input="onInput">
        <div v-if="subjectError" class="text-red">
            {{ subjectError }}
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue' 

        // props 정의
        defineProps({
            label: {
                type: String,
                required: true
            },
            subjectError : {
                type : String,
                required: true
            },
            subject: {
                type: String,
                required: true
            }
    });

    const emits = defineEmits(['updateSubject']);

    const onInput = (e) => {
         emits('update:subject', e.target.value);

    }
</script>

<style scoped>
   .text-red {
        color: red;
    }
</style>