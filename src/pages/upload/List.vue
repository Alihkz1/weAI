<script setup>
import MyIcon from '@/components/MyIcon.vue';
import MyTabs from '@/components/MyTabs.vue';
import { ROOM_TYPE_VALUES } from '@/enums/room-type.enum';
import { computed, watch } from 'vue';
import editIcon from '@/assets/svgs/edit.svg'
import trashIcon from '@/assets/svgs/trash.svg'
import { useFileStore } from '../../../stores/files';

const { uploadedFilesInStore } = useFileStore()
const displayingItems = computed(() => [...uploadedFilesInStore()])

watch(
    () => uploadedFilesInStore,
    (newItems) => {
        displayingItems.value = [...newItems]
    },
)

const fileDimension = (height, width) => {
    return `${height}*${width}`
}

const handleTabClick = (category) => {
    if (category === 'All') displayingItems.value = [...uploadedFilesInStore]
    else
        displayingItems.value = uploadedFilesInStore.filter((tab) => tab.data.category === category)
}

const imageName = (fileName) => {
    return fileName.length > 30 ? fileName.substring(0, 30) + ' ...' : fileName
}

</script>
<template>
    <MyTabs v-if="uploadedFilesInStore.length" :items="ROOM_TYPE_VALUES" @itemClick="handleTabClick" />
    <ul class="w-full flex flex-col gap-8 mt-4">
        <li v-for="file in displayingItems" :key="file.data.name" class="grid grid-cols-2 w-full text-white">
            <div class="flex gap-2">
                <MyIcon class="h-[90px] w-[90px] rounded-lg" :src="file.url" />
                <div class="flex flex-col gap-[5px] text-nowrap">
                    <p class="text-[15px] font-bold">{{ imageName(file.data.name) }}</p>
                    <span class="text-xs text-[#868695]">Size: {{ file.size }}KB</span>
                    <span class="text-xs text-[#868695]">Dimension: {{ fileDimension(file.height, file.width) }}</span>
                    <span class="text-xs text-[#868695]">Ratio: {{ file.ratio }}</span>
                </div>
            </div>
            <div class="flex items-center justify-end gap-2">
                <MyIcon class="h-6 w-6 rounded-lg cursor-pointer" :src="editIcon" />
                <MyIcon class="h-6 w-6 rounded-lg cursor-pointer" :src="trashIcon" />
            </div>
        </li>
    </ul>
</template>