<script setup>
import { ref } from 'vue';

const props = defineProps({
    items: {
        default: () => [],
        type: Array,
        required: true,
    }
})

const selectedTab = ref(props.items[0])
const emit = defineEmits(['itemClick'])
const onItemClick = (item) => {
    selectedTab.value = item
    emit('itemClick', item)
}
</script>

<template>
    <ul class="w-full overflow-x-auto flex gap-3 py-3">
        <li v-for="item in items" @click="onItemClick(item)" :class="[
            'cursor-pointer transition-all duration-300 rounded-lg h-8 w-fit flex gap-1 items-center justify-center text-[#CBCBD6] text-nowrap text-xs font-semibold px-4',
            selectedTab === item ? 'bg-[#7878CD33] border border-transparent' : 'border border-[#656570]'
        ]">
            <img v-if="selectedTab === item" src="@/assets/svgs/check.svg" alt="">
            {{ item }}
        </li>
    </ul>
</template>