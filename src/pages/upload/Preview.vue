<script setup>
import MyIcon from '@/components/MyIcon.vue';
import editSvg from '@/assets/edit.svg'
import MyInput from '@/components/MyInput.vue';
import MySelect from '@/components/MySelect.vue';
import { ROOM_TYPES } from '@/constants/room-type.const';
import { reactive } from 'vue';
import MyButton from '@/components/MyButton.vue';

const props = defineProps({
    image: {
        required: true
    }
})
const file = props.image
const categories = ROOM_TYPES;

const form = reactive({
    name: file.name,
    category: '',
})

</script>

<template>
    <div class="flex flex-col w-full gap-4">
        <h1 class="text-2xl text-white">Mask Items</h1>
        <p class="text-stone-300">Select a object or brush on object you want to redesign</p>
        <MyIcon class="h-[250px] md:h-[452px] rounded-xl my-4" :src="file.url" />
        <div class="grid md:grid-cols-2 gap-2">
            <MyInput :icon-src="editSvg" :label="'Name'" v-model="form.name" :value="file.name" />
            <MySelect :label="'Category'" v-model="form.category" :options="categories" />
        </div>
        <MyButton class="h-14 md:w-[171px] md:text-xs" :type="'transparent'">Manual Masking</MyButton>
    </div>
</template>