<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const props = defineProps(['HiddenSize', 'TextContent'])
</script>

<template>
    <div :class="['w-11/12 flex flex-wrap justify-center m-4', `${props.HiddenSize}:hidden`]">
        <p class="w-full text-center text-black my-2">{{ props.TextContent }}</p>
        <div>
            <FontAwesomeIcon :icon="['fas', 'left-long']" size="2x" class="mx-4 text-[#4a83c8a9] ">
            </FontAwesomeIcon>
        </div>
        <div>
            <FontAwesomeIcon :icon="['fas', 'hand-pointer']" size="2x" class="mx-4 text-[#4a83c8a9] handPointer ">
            </FontAwesomeIcon>
        </div>
        <div>
            <FontAwesomeIcon :icon="['fas', 'right-long']" size="2x" class="mx-4 text-[#4a83c8a9] ">
            </FontAwesomeIcon>
        </div>
    </div>
</template>