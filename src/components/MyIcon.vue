<script setup>
const { src } = defineProps({
  src: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <img :src="src" alt="">
</template>
