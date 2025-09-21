<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import MyTransition from "./MyTransition.vue";

const props = defineProps<{
    options: (string | number)[];
    modelValue: string | number | null;
    label?: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string | number): void;
}>();

const open = ref(false);
const wrapperId = "select-wrapper";

const selectOption = (option: string | number) => {
    emit("update:modelValue", option);
    open.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(`#${wrapperId}`)) {
        open.value = false;
    }
};

window.addEventListener("click", handleClickOutside);
onBeforeUnmount(() => {
    window.removeEventListener("click", handleClickOutside);
});
</script>

<template>
    <div class="custom-select relative w-full" :id="wrapperId">
        <label v-if="label" class="text-[#DCDCE3] text-xs absolute top-[6px] left-4 font-semibold">
            {{ label }}
        </label>

        <!-- Select box -->
        <div class="border border-gray-600 text-white rounded-lg px-4 pt-[10px] cursor-pointer h-14 flex items-center justify-between"
            @click.stop="open = !open">
            <span>{{ modelValue }}</span>
            <img src="@/assets/svgs/chevron-down.svg" class="w-5 h-5 transition-transform duration-200"
                :class="{ 'rotate-180': open }" alt="" />
        </div>

        <!-- Dropdown options -->
        <MyTransition>
            <ul v-if="open"
                class="absolute left-0 w-full bg-[#222225] mt-2 rounded-2xl overflow-auto z-20 border border-[#868695] max-h-60">
                <li v-for="option in options" :key="option" @click="selectOption(option)"
                    class="h-[40px] px-[10px] text-[#868695] flex items-center justify-center cursor-pointer font-semibold my-2 hover:text-sky-600">
                    {{ option }}
                </li>
            </ul>
        </MyTransition>
    </div>
</template>
