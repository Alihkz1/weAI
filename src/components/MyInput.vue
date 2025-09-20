<script setup>
import { ref, watch } from 'vue'
import { useFileStore } from '../../stores/files'
import editIcon from '@/assets/svgs/edit.svg'
import checkIcon from '@/assets/svgs/circle-check.svg'
import errorIcon from '@/assets/svgs/error.svg'

const props = defineProps({
    label: String,
    modelValue: String,
})

const value = ref(props.modelValue)

const valueIsValid = ref(null)

watch((value), (newValue) => {
    console.log(newValue);    
    valueIsValid.value = !sameNameExists(newValue)
})

const canEdit = ref(false)

const emit = defineEmits(['update:modelValue'])
const { sameNameExists } = useFileStore()

const handleInputChange = (e) => {
    const newValue = e.target.value
    value.value = newValue;
    valueIsValid.value = !sameNameExists(newValue)
    emit('update:modelValue', newValue)
}

const handleBlur = () => {
    canEdit.value = false
}

const handleEdit = () => {
    canEdit.value = true
}

</script>

<template>
    <div class="relative">
        <label for="myInput" class="text-[#DCDCE3] text-xs absolute top-[6px] left-4 font-semibold">
            {{ props.label }}
        </label>

        <input type="text" name="myInput" :disabled="!canEdit" :value="value" @keydown="handleInputChange"
            @blur="handleBlur"
            class="outline-none font-semibold text-white h-14 w-full rounded-lg ps-4 pe-12 pt-2 border border-gray-600 focus:border-sky-600" />

        <!-- Edit icon when not editing -->
        <img v-if="!canEdit" class="absolute right-4 top-4 z-20 cursor-pointer" :src="editIcon" alt=""
            @click="handleEdit" />

        <!-- Show check or error when editing -->
        <img v-else-if="valueIsValid === true" class="absolute right-4 top-4 z-20" :src="checkIcon" alt="Valid" />
        <img v-else-if="valueIsValid === false" class="absolute right-4 top-4 z-20 h-6" :src="errorIcon"
            alt="Invalid" />
    </div>
</template>
