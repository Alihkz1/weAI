<script setup>
import { ref } from 'vue';
import List from './List.vue';
import Masking from './Masking.vue';
import Preview from './Preview.vue';
import Uploader from './Uploader.vue';

const tabIndex = ref(0);

const uploadedItems = [
    {

    },
    {

    },
    {

    }
]

</script>
<template>
    <div class="w-full flex justify-center">
        <div class="min-h-screen w-full md:w-[620px] flex flex-col gap-2 items-center">
            <Uploader />
            <List :items="uploadedItems" />
        </div>
        <Masking v-if="tabIndex === 1" />
        <Preview v-if="tabIndex === 2" />
    </div>
</template>