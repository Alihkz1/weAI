<script setup>
import MyIcon from '@/components/MyIcon.vue';
import MyTabs from '@/components/MyTabs.vue';
import { ROOM_TYPE_VALUES } from '@/enums/room-type.enum';
import { computed, reactive, ref } from 'vue';
import editIcon from '@/assets/svgs/edit.svg';
import trashIcon from '@/assets/svgs/trash.svg';
import { useFileStore } from '../../../stores/files';
import DeleteDrawer from './DeleteDrawer.vue';
import EditDrawer from './EditDrawer.vue';

const { uploadedFilesInStore, removeItemByName, editFileByName } = useFileStore();

const selectedCategory = ref("All");
const deleteDrawerIsOpen = ref(false);
const editDrawerIsOpen = ref(false);

const removingFileName = ref('');
const editingFileName = ref('');

const editForm = reactive({
    name: '',
    category: '',
})

const displayingItems = computed(() => {
    const files = uploadedFilesInStore();
    if (selectedCategory.value === "All") return [...files];
    return files.filter((tab) => tab.data.category === selectedCategory.value);
});

const handleTabClick = (category) => {
    selectedCategory.value = category;
};

const fileDimension = (height, width) => `${height}*${width}`;

const imageName = (fileName) =>
    fileName.length > 30 ? fileName.substring(0, 30) + " ..." : fileName;

const handleDeleteFile = (fileName) => {
    removingFileName.value = fileName
    deleteDrawerIsOpen.value = true
}
const handleDeleteFileConfirm = () => {
    removeItemByName(removingFileName.value);
}

const handleEditFile = (file) => {
    editingFileName.value = file.name;
    editForm.name = file.data.name;
    editForm.category = file.data.category;
    editDrawerIsOpen.value = true;
};

const handleEditFileConfirm = (model) => {
    editFileByName(editingFileName.value, model)
};

</script>

<template>
    <MyTabs v-if="uploadedFilesInStore().length" :items="ROOM_TYPE_VALUES" @itemClick="handleTabClick" />
    <ul class="w-full flex flex-col gap-8 mt-4">
        <li v-for="file in displayingItems" :key="file.data.name" class="grid grid-cols-2 w-full text-white">
            <div class="flex gap-2">
                <MyIcon class="h-[90px] w-[90px] rounded-lg" :src="file.url" />
                <div class="flex flex-col gap-[5px] text-nowrap">
                    <p class="text-[15px] font-bold">{{ imageName(file.data.name) }}</p>
                    <span class="text-xs text-[#868695]">Size: {{ file.size }}KB</span>
                    <span class="text-xs text-[#868695]">
                        Dimension: {{ fileDimension(file.height, file.width) }}
                    </span>
                    <span class="text-xs text-[#868695]">Ratio: {{ file.ratio }}</span>
                </div>
            </div>
            <div class="flex items-center justify-end gap-2">
                <MyIcon class="h-6 w-6 rounded-lg cursor-pointer" :src="editIcon" @click="() => handleEditFile(file)" />
                <MyIcon class="h-6 w-6 rounded-lg cursor-pointer" :src="trashIcon"
                    @click="() => handleDeleteFile(file.name)" />
            </div>
        </li>
    </ul>
    <DeleteDrawer v-model="deleteDrawerIsOpen" class="h-63" @deleteClicked="handleDeleteFileConfirm" />
    <EditDrawer v-model:openState="editDrawerIsOpen" v-model:modelValue="editForm" class="h-103"
        @editClicked="handleEditFileConfirm" />
</template>
