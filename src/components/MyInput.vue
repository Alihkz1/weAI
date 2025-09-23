<script setup lang="ts">
import { ref, computed } from "vue"
import editIcon from "@/assets/svgs/edit.svg"
import checkIcon from "@/assets/svgs/circle-check.svg"
import errorIcon from "@/assets/svgs/error.svg"

const props = defineProps<{
    options?: (string | number)[];
    modelValue: string | number | null;
    label?: string;
    isValid: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const canEdit = ref(false)

const inputValue = computed({
    get: () => props.modelValue,
    set: (newValue) => emit("update:modelValue", newValue),
})

const handleBlur = () => {
    canEdit.value = false
}

const handleEdit = () => {
    canEdit.value = true
}

</script>

<template>
    <div class="relative">
        <label v-if="label" for="myInput" class="text-[#DCDCE3] text-xs absolute top-[6px] left-4 font-semibold">
            {{ label }}
        </label>

        <input id="myInput" type="text" :disabled="!canEdit && isValid" :value="inputValue"
            @input="(e) => (inputValue = (e.target as HTMLInputElement).value)" @blur="handleBlur"
            class="outline-none font-semibold text-white h-14 w-full rounded-lg ps-4 pe-12 pt-2 border border-gray-600 focus:border-sky-600" />

        <img v-if="isValid && !canEdit" class="absolute right-4 top-4 z-20 cursor-pointer" :src="editIcon"
            @click="handleEdit" />

        <img v-else-if="isValid === true" class="absolute right-4 top-4 z-20" :src="checkIcon" />
        <img v-else-if="isValid === false" class="absolute right-4 top-4 z-20 h-6" :src="errorIcon" />
    </div>
</template>
