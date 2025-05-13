<script setup>
import { ref } from 'vue';
import ShuttleJson from '@/assets/JSON/Shuttle.json'
const ShuttleData = ref(ShuttleJson.Shuttle)
</script>
<template>
    <div class="w-full m-4">
        <h1 class="text-2xl text-center font-black mb-2">中華民國第 66 屆中小學科學展覽會<br />接駁專車資訊</h1>
        <div v-html="ShuttleData" class="htmlData">
        </div>
    </div>
</template>