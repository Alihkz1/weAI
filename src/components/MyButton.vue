<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    type?: "normal" | "transparent" | "danger";
    disabled?: boolean;
}>();

const buttonType = props.type ?? "normal";
const isDisabled = props.disabled ?? false;

const variantClasses: Record<typeof buttonType, string> = {
    normal: "text-white bg-[#4D4DBD] hover:bg-indigo-600",
    transparent: "bg-transparent text-[#A3A3DE] border border-[#A3A3DE] hover:border-indigo-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
};

const buttonClass = computed(() => {
    return `
    font-semibold
    flex items-center justify-center gap-2
    transition-colors duration-300
    rounded-full
    py-2 px-8
    ${isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
    ${variantClasses[buttonType]}
  `.trim();
});
</script>

<template>
    <button :disabled="isDisabled" :class="buttonClass">
        <slot></slot>
    </button>
</template>
