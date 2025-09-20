<script setup lang="ts">
import { computed, ComputedRef } from 'vue';

const props = defineProps({
    type: {
        default: "normal",
        required: false,
    },
    disabled: {
        default: false,
    }
})
const disableButton = computed(() => props.disabled)

const buttonClass: ComputedRef<string> = computed(() => {
    let buttonClass = `
     font-semibold 
     flex items-center justify-center gap-2 
     cursor-pointer 
     transition-colors duration-300 
     rounded-full 
     py-2 px-8`
        .trim();
    switch (props.type) {
        case "transparent":
            buttonClass += ' bg-transparent !text-[#A3A3DE] border border-[#A3A3DE] hover:border-indigo-600';
        case "danger":
            buttonClass += ' bg-red-500';
        case "normal":
            buttonClass += ' text-white bg-indigo-500 hover:bg-indigo-600';
    }
    return buttonClass
})

</script>
<template>
    <button class="disabled:cursor-not-allowed" :disabled="disableButton" :class="buttonClass">
        <slot></slot>
    </button>
</template>