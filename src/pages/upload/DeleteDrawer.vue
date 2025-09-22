<script setup>
import MyButton from '@/components/MyButton.vue';
import MyDrawer from '@/components/MyDrawer.vue';
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue', 'deleteClicked'])
const props = defineProps({
    modelValue: Boolean,
})
const drawerState = computed({
    get: () => props.modelValue,
    set: (val) => {
        emit('update:modelValue', val);
    }
})

const onClose = () => {
    drawerState.value = false
}

const onDelete = () => {
    emit('deleteClicked')
    onClose()
}

</script>

<template>
    <MyDrawer v-model="drawerState" @close="onClose">
        <div class="w-full flex flex-col items-center gap-6 px-6">
            <h1 class="text-2xl font-bold text-white">Delete Photo?</h1>
            <MyButton class="w-full h-12" :type="'danger'" @click="onDelete">Delete</MyButton>
            <MyButton class="w-full h-12" :type="'onlyText'" @click="onClose">Cancel</MyButton>
        </div>
    </MyDrawer>
</template>