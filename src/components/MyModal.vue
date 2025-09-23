<script setup lang="ts">
import { ref } from "vue";

const open = ref(true);

const props = defineProps<{
    title: string;
}>();

</script>

<template>
    <div>
        <a-modal v-model:open="open" :title="props.title" :footer="null" centered>
            <slot></slot>
        </a-modal>
    </div>
</template>

<style>
.ant-modal-title {
    background: #222225 !important;
    font-size: 1.5rem !important;
    font-weight: 700 !important;
    color: #fff !important;
}

.ant-modal-content {
    background: #222225 !important;
    border-radius: 16px !important;
    color: #fff !important;
}
</style>