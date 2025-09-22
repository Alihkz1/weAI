<script setup lang="ts">
import { ref, computed } from "vue"
import { useFileStore } from "../../stores/files"
import editIcon from "@/assets/svgs/edit.svg"
import checkIcon from "@/assets/svgs/circle-check.svg"
import errorIcon from "@/assets/svgs/error.svg"

const props = defineProps<{
    options?: (string | number)[];
    modelValue: string | number | null;
    label?: string;
}>()

const emit = defineEmits<{
    (e: "update:modelValue", value: string | number | null): void;
}>()

const { sameNameExists } = useFileStore()

const canEdit = ref(false)

const value = computed({
    get: () => props.modelValue,
    set: (newValue) => emit("update:modelValue", newValue),
})

const valueIsValid = computed(() => {
    if (value.value == null || value.value === "") return null
    return !sameNameExists(value.value)
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

        <input id="myInput" type="text" :disabled="!canEdit" :value="value"
            @input="(e) => (value = (e.target as HTMLInputElement).value)" @blur="handleBlur"
            class="outline-none font-semibold text-white h-14 w-full rounded-lg ps-4 pe-12 pt-2 border border-gray-600 focus:border-sky-600" />

        <img v-if="!canEdit" class="absolute right-4 top-4 z-20 cursor-pointer" :src="editIcon" alt="Edit"
            @click="handleEdit" />

        <img v-else-if="valueIsValid === true" class="absolute right-4 top-4 z-20" :src="checkIcon" alt="Valid" />
        <img v-else-if="valueIsValid === false" class="absolute right-4 top-4 z-20 h-6" :src="errorIcon"
            alt="Invalid" />
    </div>
</template>
