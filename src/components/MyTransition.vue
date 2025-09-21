<template>
    <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition ease-in duration-300" leave-from-class="opacity-100"
        leave-to-class="opacity-0" mode="out-in">
        <slot></slot>
    </Transition>
</template>