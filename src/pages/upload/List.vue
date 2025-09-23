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
import EditModal from './EditModal.vue';
import { useIsMobile } from '@/composables/useIsMobile';
import DeleteModal from './DeleteModal.vue';
import { FileDimension, FileSize, ImageName, FileRatio } from '@/utilities/file-display.utility';

const { uploadedFilesInStore, removeItemByName, editFileByName } = useFileStore();
const { isMobile } = useIsMobile()

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
        <li v-for="(file, index) in displayingItems" :key="index" class="grid grid-cols-2 w-full text-white">
            <div class="flex gap-2">
                <MyIcon class="h-[90px] w-[90px] rounded-lg" :src="file.url" />
                <div class="flex flex-col gap-[5px] text-nowrap">
                    <p class="text-[15px] font-bold">{{ ImageName(file.data.name) }}</p>
                    <span class="text-xs text-[#868695]">{{ FileSize(file.size) }}</span>
                    <span class="text-xs text-[#868695]">
                        {{ FileDimension(file.height, file.width) }}
                    </span>
                    <span class="text-xs text-[#868695]">{{ FileRatio(file.ratio) }}</span>
                </div>
            </div>
            <div class="flex items-center justify-end gap-2">
                <MyIcon class="h-6 w-6 rounded-lg cursor-pointer" :src="editIcon" @click="() => handleEditFile(file)" />
                <MyIcon class="h-6 w-6 rounded-lg cursor-pointer" :src="trashIcon"
                    @click="() => handleDeleteFile(file.name)" />
            </div>
        </li>
    </ul>

    <!-- Delete File Action -->
    <DeleteDrawer v-if="isMobile" class="h-63" v-model="deleteDrawerIsOpen" @submit="handleDeleteFileConfirm" />
    <DeleteModal v-else class="w-94 h-35" v-model="deleteDrawerIsOpen" @submit="handleDeleteFileConfirm" />

    <!-- Edit File Action -->
    <EditDrawer v-if="isMobile" class="h-103" v-model:openState="editDrawerIsOpen" v-model:modelValue="editForm"
        @submit="handleEditFileConfirm" />
    <EditModal v-else class="w-94 h-75" v-model:openState="editDrawerIsOpen" v-model:modelValue="editForm"
        @submit="handleEditFileConfirm" />
</template>
