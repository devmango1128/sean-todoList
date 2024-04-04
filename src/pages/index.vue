<template>
  <div>sean's Main Page</div>
  <div>{{ count }}</div>
  <button @click="count++">Add</button>
</template>

<script>
import { useCount } from '@/composables/count.js'
export default {
  setup() {
    const { count} = useCount()

    return {
      count
    }
  }
}
</script>

<style>

</style>