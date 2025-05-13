<script setup>
import { ref } from 'vue';
import MethodJson from '@/assets/JSON/Method.json'
const Method = ref(MethodJson.MethodData)
</script>
<template>
    <div class="w-full m-4">
        <h1 class="text-2xl text-center font-black mb-2">配置圖及活動辦法</h1>
        <div v-html="Method" class="htmlData">
        </div>
    </div>
</template>