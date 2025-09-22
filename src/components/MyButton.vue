<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    type?: "normal" | "transparent" | "danger";
    disabled?: boolean;
}>();

const buttonType = computed(() => props.type ?? "normal");
const isDisabled = computed(() => props.disabled ?? false);

const variantClasses: Record<"normal" | "transparent" | "danger", string> = {
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
    ${isDisabled.value ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
    ${variantClasses[buttonType.value]}
  `.trim();
});
</script>

<template>
    <button :disabled="isDisabled" :class="buttonClass" @click="$emit('buttonClick')">
        <slot></slot>
    </button>
</template>
