<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
onMounted(() => {
  router.replace("upload")
})

</script>

<template>
  <div class="min-h-screen w-full bg-gray-950 p-4">
    <router-view />
  </div>
</template>
