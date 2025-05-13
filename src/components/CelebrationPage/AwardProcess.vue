<script setup>
import { ref } from 'vue';
import AwardProcessJson from '@/assets/JSON/AwardProcess.json'
const AwardData = ref(AwardProcessJson.AwardData)
</script>
<template>
    <div class="w-full m-4">
        <h1 class="text-2xl text-center font-black mb-2">頒獎典禮流程表</h1>
        <div v-html="AwardData" class="htmlData">
        </div>
    </div>
</template>