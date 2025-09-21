<script setup>
import Masking from './Masking.vue';
import Preview from './Preview.vue';
import Uploader from './Uploader.vue';
import Loading from '@/components/Loading.vue';
import MyTransition from '@/components/MyTransition.vue';

import { useTabStore } from '../../../stores/tab';

const { tabIndex } = useTabStore();

const tabComponents = {
    0: Uploader,
    1: Masking,
    2: Preview,
    3: Loading,
};

</script>

<template>
    <div class="h-full w-full flex justify-center">
        <div class="h-full w-full md:w-[620px] flex flex-col items-center">
            <MyTransition>
                <component :is="tabComponents[tabIndex()]" />
            </MyTransition>
        </div>
    </div>
</template>
