<script setup>
import MyTransition from '@/components/MyTransition.vue';

import { useTabStore } from '../../../stores/tab';
import { defineAsyncComponent } from 'vue';

const tabStore = useTabStore();

const tabComponents = {
    0: defineAsyncComponent(() => import('./Uploader.vue')),
    1: defineAsyncComponent(() => import('./Masking.vue')),
    2: defineAsyncComponent(() => import('./Preview.vue')),
    3: defineAsyncComponent(() => import('@/components/Loading.vue')),
}
</script>

<template>
    <div class="h-full w-full flex justify-center">
        <div class="h-full w-full md:w-[620px] flex flex-col items-center">
            <MyTransition>
                <component :is="tabComponents[tabStore.index]" />
            </MyTransition>
        </div>
    </div>
</template>
