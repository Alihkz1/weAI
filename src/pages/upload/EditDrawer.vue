<script setup lang="ts">
import MyButton from '@/components/MyButton.vue';
import MyDrawer from '@/components/MyDrawer.vue';
import { computed } from 'vue';
import EditForm from './EditForm.vue';

const emit = defineEmits(['update:modelValue', 'update:openState', 'submit'])
const props = defineProps<{
    modelValue: { name: string; category: string };
    openState: boolean;
}>();
const drawerState = computed({
    get: () => props.openState,
    set: (val: boolean) =>
        emit('update:openState', val)

})
const form = computed({
    get: () => props.modelValue,
    set: (newValue) => emit('update:modelValue', newValue)
})

const handleClose = () => {
    drawerState.value = false
}

const handleSave = () => {
    emit('submit', form)
    handleClose()
}

</script>

<template>
    <MyDrawer v-model="drawerState" @close="handleClose">
        <div class="w-full flex flex-col items-center gap-6 px-6">
            <h1 class="text-2xl font-bold text-white">Change Image Name</h1>
            <EditForm class="w-full" v-model="form" :isEditMode="true" />
            <MyButton class="w-full h-12" type="normal" @click="handleSave">Save</MyButton>
            <MyButton class="w-full h-12" type="onlyText" @click="handleClose">Cancel</MyButton>
        </div>
    </MyDrawer>
</template>