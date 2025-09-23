<script setup lang="ts">
import { ref } from "vue";

const { items } = defineProps<{
    items: string[];
}>();

const emit = defineEmits<{
    (e: "itemClick", item: string): void;
}>();

const selectedTab = ref(items[0]);

const handleItemClick = (item: string) => {
    selectedTab.value = item;
    emit("itemClick", item);
};
</script>

<template>
    <ul class="w-full overflow-x-auto flex gap-3 py-3">
        <li v-for="item in items" :key="item" @click="handleItemClick(item)" :class="[
            'cursor-pointer transition-all duration-300 rounded-lg h-8 w-fit flex gap-1 items-center justify-center text-tabTextColor text-nowrap text-xs font-semibold px-4',
            selectedTab === item
                ? 'bg-selectedTabBgColor border border-transparent'
                : 'border border-tabBorderColor'
        ]">
            <img v-if="selectedTab === item" src="@/assets/svgs/check.svg" alt="" />
            {{ item }}
        </li>
    </ul>
</template>
