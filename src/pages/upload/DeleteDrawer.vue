<script setup>
import MyButton from '@/components/MyButton.vue';
import MyDrawer from '@/components/MyDrawer.vue';
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue', 'submit'])
const props = defineProps({
    modelValue: Boolean,
})

const drawerState = computed({
    get: () => props.modelValue,
    set: (val) => {
        emit('update:modelValue', val);
    }
})

const handleClose = () => {
    drawerState.value = false
}

const handleDelete = () => {
    emit('submit')
    handleClose()
}
</script>

<template>
    <MyDrawer v-model="drawerState" @close="handleClose">
        <div class="w-full flex flex-col items-center gap-6 px-6">
            <h1 class="text-2xl font-bold text-white">Delete Photo?</h1>
            <MyButton class="w-full h-12" type="danger" @click="handleDelete">Delete</MyButton>
            <MyButton class="w-full h-12" type="onlyText" @click="handleClose">Cancel</MyButton>
        </div>
    </MyDrawer>
</template>