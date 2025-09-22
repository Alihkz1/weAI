<script setup>
import MyButton from '@/components/MyButton.vue';
import { useTabStore } from '../../../stores/tab';
import { TAB_INDEX } from '@/enums/tab-index.enum';
const { setTabIndex } = useTabStore()
const back = () => {
    setTabIndex(TAB_INDEX.PREVIEW)
}
</script>

<template>
    <div class="w-full flex flex-col justify-center items-center gap-4">
        <div class="text-red-300">
            Masking is not available yet!
        </div>
        <MyButton @click="back">Back!</MyButton>
    </div>
</template>