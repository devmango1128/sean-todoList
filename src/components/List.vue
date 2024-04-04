<template>
    <div v-for="(item) in items" :key="item.id" class="card mt-3">
        <slot :item="item"></slot>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';

    // props 정의
    defineProps({
        items: {
            type: Array,
            required: true
        }
    });
</script>

<style lang="scss" scoped>

</style>