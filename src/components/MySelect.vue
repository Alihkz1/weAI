<script setup>
import { ref } from 'vue'

const props = defineProps({
    options: { type: Array, default: () => [] },
    modelValue: [String, Number],
    label: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])
const open = ref(false)

const selectOption = (option) => {
    emit('update:modelValue', option)
    open.value = false
}

const handleClickOutside = (event) => {
    if (!event.target.closest('#select-wrapper')) open.value = false
}

window.addEventListener('click', handleClickOutside)
</script>

<template>
    <div class="custom-select relative w-full" id="select-wrapper">
        <label class="text-[#DCDCE3] text-xs absolute top-[6px] left-4 font-semibold">
            {{ props.label }}
        </label>

        <!-- Select box -->
        <div class="border border-gray-600 text-white rounded-lg px-4 pt-[10px] cursor-pointer h-14 flex items-center justify-between"
            @click.stop="open = !open">
            <span>{{ props.modelValue }}</span>
            <img src="@/assets/svgs/chevron-down.svg" class="w-5 h-5" alt="">
        </div>

        <!-- Dropdown options -->
        <ul v-if="open"
            class="absolute left-0 w-full bg-[#222225] mt-2 rounded-2xl overflow-auto z-20 border border-[#868695]">
            <li v-for="option in props.options" :key="option" @click="selectOption(option)"
                class="h-[40px] px-[10px] text-[#868695] flex items-center justify-center cursor-pointer font-semibold my-2 hover:text-sky-600">
                {{ option }}
            </li>
        </ul>
    </div>
</template>
