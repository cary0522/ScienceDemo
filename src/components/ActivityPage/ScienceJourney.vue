<script setup>
import { ref } from 'vue';
import Button from '../BaseComponents/Button.vue';
import JourneyJson from '@/assets/Json/Journey.json';
const JourneyData = ref(JourneyJson.JourneyData)
</script>
<template>
    <div class="w-full m-4">
        <h1 class="text-2xl text-center font-black mb-2">「科學之旅」實施計畫</h1>
        <div v-html="JourneyData" class="htmlData">
        </div>
        <a href="https://www.beclass.com/rid=284d8e46669157fac748#google_vignette"
            class="my-4 text-white min-w-[82px] bg-[#4E64A6] hover:bg-[#99B3D1] focus:ring-4 focus:outline-none rounded-lg text-xs sm:text-sm w-full sm:w-auto px-2 sm:px-5 py-2.5 text-center">科學之旅報名</a>
    </div>
</template>