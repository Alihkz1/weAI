<script setup lang="ts">
import MyButton from '@/components/MyButton.vue';
import MyModal from '@/components/MyModal.vue';
import EditForm from './EditForm.vue';
import { computed } from 'vue';

const props = defineProps<{
    modelValue: { name: string; category: string };
    openState: boolean;
}>();
const emit = defineEmits(['update:modelValue', 'update:openState', 'submit'])

const form = computed({
    get: () => props.modelValue,
    set: (newValue) => emit('update:modelValue', newValue)
})

const modalState = computed({
    get: () => props.openState,
    set: (val) => {
        emit('update:openState', val);
    }
})

const handleSave = () => {
    emit('submit', form)
    modalState.value = false
}

const handleCancel = () => {
    modalState.value = false
}
</script>

<template>
    <MyModal title="Change Image Name" v-if="modalState">
        <EditForm v-model:modelValue="form" :isEditMode="true" />
        <div class="grid grid-cols-2 gap-1 my-6">
            <MyButton class="h-12" type="onlyText" @click="handleCancel">Cancel</MyButton>
            <MyButton class="h-12" @click="handleSave">Save</MyButton>
        </div>
    </MyModal>
</template>