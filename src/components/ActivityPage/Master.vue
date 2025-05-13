<script setup>
import { ref } from 'vue';
import MasterJson from '@/assets/Json/Master.json';
const MasterData = ref(MasterJson.MasterData)
</script>
<template>
    <div class="w-full m-4">
        <h1 class="text-2xl text-center font-black mb-2">「與大師有約」講座實施計畫</h1>
        <div v-html="MasterData" class="htmlData">
        </div>
    </div>
</template>