<script setup>
const props = defineProps({
    label: '',
    options: []
})
</script>
<template>
    <div class="relative">
        <label for="myInput" class="text-[#DCDCE3] text-xs absolute top-[6px] left-4 font-semibold">
            {{ props.label }}
        </label>
        <select name="myInput"
            class="appearance-none outline-none font-semibold text-white h-14 w-full rounded-lg px-4 pt-4 border border-gray-600 focus:border-sky-600">
            <option value=""></option>
        </select>
        <img class="pointer-events-none absolute right-4 top-4 cursor-pointer" src="@/assets/chevron-down.svg" alt="">
    </div>
</template>