<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    type?: "normal" | "transparent" | "onlyText" | "danger";
    disabled?: boolean;
}>();

const buttonType = computed(() => props.type ?? "normal");
const isDisabled = computed(() => props.disabled ?? false);

const variantClasses: Record<"normal" | "transparent" | "onlyText" | "danger", string> = {
    normal: "text-white bg-buttonTextColor",
    transparent: "bg-transparent text-buttonTransparentColor border border-buttonTransparentColor",
    onlyText: 'bg-transparent text-buttonTransparentColor',
    danger: "bg-buttonDangerColor text-white",
};

const buttonClass = computed(() => {
    return `
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
