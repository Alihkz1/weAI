<script setup lang="ts">
import MyInput from '@/components/MyInput.vue';
import MySelect from '@/components/MySelect.vue';
import { ROOM_TYPE_VALUES } from '@/enums/room-type.enum';
import { computed } from 'vue';

const categories = ROOM_TYPE_VALUES.slice(1)
const props = defineProps<{
    modelValue: {
        name: string,
        category: string,
    }
}>()
const form = computed({
    get: () => props.modelValue,
    set: (newValue) => emit('update:modelValue', newValue)
})
const emit = defineEmits(['update:modelValue'])

</script>

<template>
    <div class="grid md:grid-cols-2 gap-2">
        <MyInput :label="'Name'" v-model="form.name" />
        <MySelect :label="'Category'" v-model="form.category" :options="categories" />
    </div>
</template>