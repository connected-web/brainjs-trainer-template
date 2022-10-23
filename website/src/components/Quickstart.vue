<script setup>
import { ref } from 'vue'

defineProps({
  title: String
})

</script>

<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>
