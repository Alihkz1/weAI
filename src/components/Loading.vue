<template>
    <div class="mt-[40vh] w-full flex flex-col items-center justify-center gap-4">
        <div class="loader"></div>
        <p class="text-descriptionColor">Loading...</p>
    </div>
</template>

<style>
.loader {
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    background:
        radial-gradient(farthest-side, #1648ff 94%, #0000) top/8px 8px no-repeat,
        conic-gradient(#0000 30%, #4D4DBD);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
    animation: loading 1s infinite linear;
}

@keyframes loading {
    100% {
        transform: rotate(1turn)
    }
}
</style>