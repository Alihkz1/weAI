<script setup>
import MyIcon from '@/components/MyIcon.vue';
import MyInput from '@/components/MyInput.vue';
import MySelect from '@/components/MySelect.vue';
import { ROOM_TYPES } from '@/constants/room-type.enum';
import { computed, reactive } from 'vue';
import MyButton from '@/components/MyButton.vue';
import Cancel from '@/components/Cancel.vue';
import { useFileStore } from '../../../stores/files';

const categories = ROOM_TYPES;
const { pushItem, sameNameExists } = useFileStore()

const props = defineProps({
    image: {
        required: true
    }
})
const file = props.image
const form = reactive({
    name: 'Image Item',
    category: 'Living room',
})

const formIsInvalid = computed(() => !form.name || !form.category || sameNameExists(form.name))

const emit = defineEmits(['previewCompletion'])

const handleCancel = () => {
    emit('previewCompletion')
}

const handleAdd = () => {
    const fileModel = {
        ...file,
        data: form
    }
    pushItem(fileModel)
    emit('previewCompletion')
}

</script>

<template>
    <div class="flex flex-col w-full gap-4 relative">
        <h1 class="text-2xl text-white">Mask Items</h1>
        <p class="text-stone-300">Select a object or brush on object you want to redesign</p>
        <div class="w-full flex justify-center relative">
            <Cancel class="absolute right-3 top-6" @click="handleCancel" />
            <MyIcon class="h-[250px] md:h-[452px] rounded-xl my-4" :src="file.url" />
        </div>
        <div class="grid md:grid-cols-2 gap-2">
            <MyInput :label="'Name'" v-model="form.name" />
            <MySelect :label="'Category'" v-model="form.category" :options="categories" />
        </div>
        <MyButton class="h-14 md:w-[171px] md:text-xs" :type="'transparent'" @click="$emit('manual-masking')">Manual
            Masking
        </MyButton>
        <div
            class="h-20 px-6 w-full bg-gray-900 flex items-center justify-center md:justify-around fixed bottom-0 left-0 right-0">
            <span></span>
            <MyButton :disabled="formIsInvalid" class="w-full md:w-[200px]" :type="primary" @click="handleAdd">Add
            </MyButton>
        </div>
    </div>
</template>