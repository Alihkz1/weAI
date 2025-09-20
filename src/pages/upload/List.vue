<script setup>
import MyIcon from '@/components/MyIcon.vue';
import MyTabs from '@/components/MyTabs.vue';
import { ROOM_TYPE_VALUES } from '@/constants/room-type.enum';
import { ref, watch } from 'vue';
import editIcon from '@/assets/svgs/edit.svg'
import trashIcon from '@/assets/svgs/trash.svg'

const props = defineProps({
    items: {
        default: () => [],
        type: Array,
        required: true,
    }
})

const displayingItems = ref([...props.items])

watch(
    () => props.items,
    (newItems) => {
        displayingItems.value = [...newItems]
    },
)

const fileDimension = (height, width) => {
    return `${height}*${width}`
}

const handleTabClick = (category) => {
    if (category === 'All') displayingItems.value = [...props.items]
    else
        displayingItems.value = props.items.filter((tab) => tab.data.category === category)
}

const imageName = (fileName) => {
    return fileName.length > 30 ? fileName.substring(0, 30) + ' ...' : fileName
}

</script>
<template>
    <MyTabs v-if="items.length" :items="ROOM_TYPE_VALUES" @itemClick="handleTabClick" />
    <ul class="w-full flex flex-col gap-8 mt-4">
        <li v-for="file in displayingItems" :key="file.data.name" class="grid grid-cols-2 w-full text-white">
            <div class="flex gap-2">
                <MyIcon class="h-[90px] w-[90px] rounded-lg" :src="file.url" />
                <div class="flex flex-col gap-[5px] text-nowrap">
                    <p>{{ imageName(file.data.name) }}</p>
                    <span class="text-xs text-stone-300">Size: {{ file.size }}KB</span>
                    <span class="text-xs text-stone-300">Dimension: {{ fileDimension(file.height, file.width) }}</span>
                    <span class="text-xs text-stone-300">Ratio: {{ file.ratio }}</span>
                </div>
            </div>
            <div class="flex items-center justify-end gap-2">
                <MyIcon class="h-6 w-6 rounded-lg cursor-pointer" :src="editIcon" />
                <MyIcon class="h-6 w-6 rounded-lg cursor-pointer" :src="trashIcon" />
            </div>
        </li>
    </ul>
</template>