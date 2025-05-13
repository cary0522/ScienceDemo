<script setup>
import { ref } from 'vue';
import OpenJson from '@/assets/JSON/Opening.json'
const OpenData = ref(OpenJson.OpeningData)
</script>
<template>
    <div class="w-full m-4">
        <h1 class="text-2xl text-center font-black mb-2">開幕典禮流程表</h1>
        <div v-html="OpenData" class="htmlData">
        </div>
    </div>
</template>