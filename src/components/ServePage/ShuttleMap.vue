<script setup>
import { ref } from 'vue';
const ShuttleData = ref('')
import ShuttleImg from '/images/shuttleMap.jpg'
</script>
<template>
    <div class="w-full m-4">
        <h1 class="text-2xl text-center font-black">中華民國第 66 屆中小學科學展覽會<br />接駁專車路線圖</h1>
        <img :src="ShuttleImg" alt="" class="max-w-full" loading="lazy">
        <!-- <div v-html="ShuttleData">
        </div> -->
    </div>
</template>