<script setup>
import { ref } from 'vue';
import WorkShopJson from '@/assets/JSON/Workshop.json'
const WorkshopData = ref(WorkShopJson.WorkShopData)
</script>
<template>
    <div class="w-full m-4">
        <h1 class="text-2xl text-center font-black mb-2">「科展指導教師交流工作坊」實施計畫</h1>
        <div v-html="WorkshopData" class="htmlData">
        </div>
    </div>
</template>