<script setup>
import { ref } from 'vue';
import TrafficJson from '@/assets/JSON/traffic.json'
const TrafficData = ref(TrafficJson.TrafficData)
</script>
<template>
    <div class="w-full m-4">
        <h1 class="text-2xl text-center font-black mb-2">中華民國第 66 屆中小學科學展覽會<br />交通資訊</h1>
        <div v-html="TrafficData" class='htmlData'>
        </div>
    </div>
</template>