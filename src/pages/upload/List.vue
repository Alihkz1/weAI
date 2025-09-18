<script setup>
import MyIcon from '@/components/MyIcon.vue';
import MyTabs from '@/components/MyTabs.vue';
import { ROOM_TYPES } from '@/constants/room-type.const';
import { ref, watch } from 'vue';
import editIcon from '@/assets/edit.svg'
import trashIcon from '@/assets/trash.svg'
import homeSmallIcon from '@/assets/list-image-small.png'

const props = defineProps({
    items: {
        default: () => [],
        type: Array,
        required: true,
    }
})

const filtererItems = ref([...props.items])

watch(
    () => props.items,
    (newItems) => {
        filtererItems.value = [...newItems]
    },
    { immediate: true }
)


let tabs = ["All", ...ROOM_TYPES];
const handleTabClick = (category) => {
    if (category === 'All') filtererItems.value = [...props.items]
    else
        filtererItems.value = filtererItems.value.filter((tab) => tab.category === category)
}

</script>

<template>
    <MyTabs :items="tabs" @itemClick="handleTabClick" />
    <ul class="w-full flex flex-col gap-8 mt-4">
        <li v-for="value in filtererItems" class="grid grid-cols-2 w-full text-white">
            <!-- <li v-for="value in filtererItems" :key="value.title" class="grid grid-cols-2 w-full text-white"> -->
            <div class="flex gap-2">
                <MyIcon :src="homeSmallIcon" />
                <div class="flex flex-col gap-[5px]">
                    <p>Image Item</p>
                    <span class="text-xs text-stone-300">Size: 169KB</span>
                    <span class="text-xs text-stone-300">Dimension: 1080*720</span>
                    <span class="text-xs text-stone-300">Ratio: 16:9</span>
                </div>
            </div>
            <div class="flex items-center justify-end gap-2">
                <MyIcon class="h-6 w-6 rounded-lg cursor-pointer" :src="editIcon" />
                <MyIcon class="h-6 w-6 rounded-lg cursor-pointer" :src="trashIcon" />
            </div>
        </li>
    </ul>
</template>