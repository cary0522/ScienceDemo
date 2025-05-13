<script setup>
import { ref } from 'vue'
import TrafficImg from '/images/traffic.jpg'
import TrafficFloorPlan from '@/assets/JSON/trafficFloorPlan.json'
const TrafficPlanData = ref(TrafficFloorPlan.TrafficFloorPlan)
</script>
<template>
    <div class="m-4 w-full">
        <h1 class="text-2xl text-center font-black mb-2">中華民國第 66 屆中小學科學展覽會<br />周邊交通平面圖</h1>
        <div v-html="TrafficPlanData" class="htmlData">
        </div>
        <!-- <img :src="TrafficImg" alt="" class="max-w-full" loading="lazy"> -->
    </div>
</template>