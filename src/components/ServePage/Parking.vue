<script setup>
import { ref } from "vue";
import ParkingJson from "@/assets/JSON/parking.json";
const ParkingData = ref(ParkingJson.ParkingData)
</script>
<template>
    <div class="w-full m-4">
        <h1 class="text-2xl text-center font-black mb-2">中華民國第 66 屆中小學科學展覽會<br />停車場資訊</h1>
        <div v-html="ParkingData" class="htmlData">
        </div>
    </div>
</template>