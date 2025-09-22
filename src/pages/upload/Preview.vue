<script setup>
import MyIcon from '@/components/MyIcon.vue';
import MyInput from '@/components/MyInput.vue';
import MySelect from '@/components/MySelect.vue';
import { ROOM_TYPE_VALUES } from '@/enums/room-type.enum';
import { computed, reactive } from 'vue';
import MyButton from '@/components/MyButton.vue';
import Cancel from '@/components/Cancel.vue';
import { useFileStore } from '../../../stores/files';
import { usePreviewImage } from '../../../stores/preview-image';
import { useTabStore } from '../../../stores/tab';
import { TAB_INDEX } from '@/enums/tab-index.enum';

const categories = [...ROOM_TYPE_VALUES].filter((_, i) => i)
console.log(categories);
const { pushItem, sameNameExists } = useFileStore()
const { setTabIndex } = useTabStore()
const previewImageStore = usePreviewImage()
const file = previewImageStore.getImageForPreview()

const form = reactive({
    name: 'Image Item',
    category: 'Living room',
})

const formIsInvalid = computed(() => {
    return !form.name || !form.category || sameNameExists(form.name)
})

const handleCancel = () => {
    setTabIndex(TAB_INDEX.UPLOADER)
    previewImageStore.reset()
}

const handleAdd = () => {
    const fileModel = {
        ...file,
        data: form
    }
    pushItem(fileModel)
    setTabIndex(TAB_INDEX.UPLOADER)
    previewImageStore.reset()
}

const handleManualMasking = () => {
    setTabIndex(TAB_INDEX.MASKING)
}

</script>

<template>
    <div class="flex flex-col w-full gap-4 relative">
        <h1 class="text-2xl font-bold text-white">Mask Items</h1>
        <p class="text-[#A8A8BA] text-sm">Select a object or brush on object you want to redesign</p>
        <div class="w-full flex justify-center relative">
            <Cancel class="absolute right-3 top-6" @click="handleCancel" />
            <MyIcon class="h-[250px] md:h-[452px] rounded-xl my-4" :src="file.url" />
        </div>
        <div class="grid md:grid-cols-2 gap-2">
            <MyInput :label="'Name'" v-model="form.name" />
            <MySelect :label="'Category'" v-model="form.category" :options="categories" />
        </div>
        <MyButton class="h-14 md:w-[171px] md:text-xs" :type="'transparent'" @click="handleManualMasking">Manual
            Masking
        </MyButton>
        <div
            class="h-20 px-6 w-full bg-gray-900 flex items-center justify-center md:justify-around fixed bottom-0 left-0 right-0">
            <span></span>
            <MyButton :disabled="formIsInvalid" class="w-full md:w-[200px] h-12" @buttonClick="handleAdd">
                Add
            </MyButton>
        </div>
    </div>
</template>