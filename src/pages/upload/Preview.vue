<script setup>
import MyIcon from '@/components/MyIcon.vue';
import listLarge from '@/assets/list-image-large.png'
import editSvg from '@/assets/edit.svg'
import MyInput from '@/components/MyInput.vue';
import MySelect from '@/components/MySelect.vue';
</script>
<template>
    <div class="flex flex-col w-full gap-4">
        <h1 class="text-2xl text-white">Mask Items</h1>
        <p class="text-stone-300">Select a object or brush on object you want to redesign</p>
        <MyIcon class="h-[250px] rounded-xl my-4" :src="listLarge" />
        <MyInput :icon-src="editSvg" :label="'Name'"/>
        <MySelect :label="'Category'"/>
    </div>
</template>