<script setup lang="ts">
import MyInput from '@/components/MyInput.vue';
import MySelect from '@/components/MySelect.vue';
import { ROOM_TYPE_VALUES } from '@/enums/room-type.enum';
import { computed, ComputedRef } from 'vue';
import { useFileStore } from '../../../stores/files';

const props = defineProps<{
    modelValue: {
        name: string,
        category: string,
    },
    isEditMode: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const { sameNameExists } = useFileStore()

const categories = ROOM_TYPE_VALUES.slice(1)

const form = computed({
    get: () => props.modelValue,
    set: (newValue) => emit('update:modelValue', newValue)
})

const editFormValid: ComputedRef<boolean> = computed(() => {
    const formStateValid = form.value.name != '' && form.value.category != '';
    const isEditMode = props.isEditMode
    return isEditMode ? formStateValid : !sameNameExists(form.value.name) && formStateValid;
})
</script>

<template>
    <div class="grid gap-2">
        <MyInput label="Name" v-model:modelValue="form.name" v-model:isValid="editFormValid" />
        <MySelect label="Category" v-model="form.category" :options="categories" />
    </div>
</template>