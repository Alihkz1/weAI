<script setup>
const props = defineProps({
    iconSrc: '',
    label: '',
})
</script>

<template>
    <div class="relative">
        <label for="myInput" class="text-[#DCDCE3] text-xs absolute top-[6px] left-4 font-semibold">
            {{ props.label }}
        </label>
        <input type="text" name="myInput"
            class="outline-none font-semibold text-white h-14 w-full rounded-lg px-4 pt-2 border border-gray-600 focus:border-sky-600">
        <img class="absolute right-4 top-4" :src="iconSrc" alt="" v-on:click="$emit('iconClick')">
    </div>
</template>