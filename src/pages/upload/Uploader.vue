<script setup>
import MyButton from '@/components/MyButton.vue';
const onUpload = () => {
    console.log(2);
}
</script>
<template>
    <div class="flex flex-col gap-6 w-full">
        <h1 class="text-white text-2xl ps-1 font-semibold">Upload Photo</h1>
        <div class="bg-[#4D4DBD] h-[226px] rounded-2xl flex flex-col justify-center items-center gap-6">
            <!-- todo -->
            <!-- <div class="bg-bgBlue h-100 rounded-2xl flex flex-col justify-center items-center gap-6"> -->
            <h1 class="text-stone-200 font-bold text-xl">
                Drag or Select Your Photo
            </h1>
            <MyButton @click="onUpload">
                <img src="@/assets/upload.svg" alt="">
                Upload
            </MyButton>
        </div>
    </div>
</template>