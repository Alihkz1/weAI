<script setup lang="ts">
import MyButton from '@/components/MyButton.vue';
import MyDrawer from '@/components/MyDrawer.vue';
import { computed } from 'vue';
import EditForm from './EditForm.vue';

const emit = defineEmits(['update:modelValue', 'update:openState', 'editClicked'])
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

const onClose = () => {
    drawerState.value = false
}

const onDelete = () => {
    emit('editClicked')
    onClose()
}

</script>

<template>
    <MyDrawer v-model="drawerState" @close="onClose">
        <div class="w-full flex flex-col items-center gap-6 px-6">
            <h1 class="text-2xl font-bold text-white">Change Image Name</h1>
            <EditForm class="w-full" v-model="form" />
            <MyButton class="w-full h-12" :type="'normal'" @click="onDelete">Save</MyButton>
            <MyButton class="w-full h-12" :type="'onlyText'" @click="onClose">Cancel</MyButton>
        </div>
    </MyDrawer>
</template>