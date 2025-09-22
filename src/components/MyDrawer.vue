<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'close', 'open'])

const drawerState = computed({
    get: () => props.modelValue,
    set: (val) => {
        emit('update:modelValue', val)
        val ? emit('open') : emit('close')
    }
})
</script>
<template>
    <transition enter-active-class="transition-transform duration-500 ease-out"
        leave-active-class="transition-transform duration-500 ease-in" enter-from-class="translate-y-full"
        enter-to-class="translate-y-0" leave-from-class="translate-y-0" leave-to-class="translate-y-full">
        <div v-show="drawerState"
            class="rounded-t-2xl bg-[#222225] fixed bottom-0 left-2 right-2 shadow-lg z-30 overflow-hidden">
            <div class="flex justify-center">
                <span class="h-[2px] w-9 bg-gray-400 my-4 rounded-full cursor-pointer" @click="drawerState = false">
                </span>
            </div>
            <slot></slot>
        </div>
    </transition>
</template>
