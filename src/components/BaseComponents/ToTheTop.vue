<script setup>
import LottieScr from '/images/up.png'
// import LottieScr from '/images/UpArrow.gif'
function ToTheTop() {
    const html = document.getElementsByTagName('html')
    html[0].scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
    <img loading="lazy" :src="LottieScr" alt="" style="width: 60px;"
        class="z-50 fixed right-0 bottom-0 hover:translate-y-[-15%] cursor-pointer transition-all animate__animated animate__fadeIn"
        @click="ToTheTop">
</template>