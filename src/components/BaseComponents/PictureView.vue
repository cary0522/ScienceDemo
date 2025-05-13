<script setup>
const props = defineProps(['PictureSrc'])

import Src from '/images/ScienceLogo.webp'
</script>

<template>
    <div class="mx-auto my-4 w-4/5 flex justify-center animate__animated animate__fadeIn animate__slow">
        <img loading="lazy" v-if="typeof (props.PictureSrc) == 'string'" :src="props.PictureSrc" alt="" class="rounded">
        <img loading="lazy" v-else :src="Src" alt="" class="rounded">
    </div>
</template>