<script setup lang="ts">
import { computed } from 'vue'
import MyButton from '@/components/MyButton.vue';
import MyModal from '@/components/MyModal.vue';

const emit = defineEmits(['update:modelValue', 'submit'])
const props = defineProps<{
    modelValue: boolean;
}>();

const modalState = computed({
    get: () => props.modelValue,
    set: (val) => {
        emit('update:modelValue', val);
    }
})

const handleCancel = () => {
    modalState.value = false
}

const handleDelete = () => {
    emit('submit')
    modalState.value = false
}
</script>
<template>
    <MyModal title="Delete Photo" v-if="modalState">
        <div class="grid grid-cols-2 gap-1 my-6">
            <MyButton class="h-12" type="onlyText" @click="handleCancel">Cancel</MyButton>
            <MyButton class="h-12" type="danger" @click="handleDelete">Delete</MyButton>
        </div>
    </MyModal>
</template>