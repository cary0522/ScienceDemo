<script setup>
import { ref } from 'vue';
import NightJson from '@/assets/Json/Night.json';
const NightData = ref(NightJson.NightData)
</script>
<template>
    <div class="w-full m-4">
        <h1 class="text-2xl text-center font-black mb-2">科展之夜流程表</h1>
        <div v-html="NightData" class="htmlData">
        </div>
    </div>
</template>