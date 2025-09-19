<template>
    <Transition enter-active-class="transition ease-out duration-500" enter-from-class="opacity-0 translate-y-5"
        enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-500"
        leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-5" mode="out-in">
        <slot></slot>
    </Transition>

</template>