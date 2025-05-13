<script setup>
import { ref, onMounted } from 'vue';
import Table from '../BaseComponents/Table.vue';
import Search from '../BaseComponents/Search.vue';
import StallJson from '@/assets/Json/Stall.json';

const StallData = ref(StallJson.StallData);
const StallImg = ref('')
const TableHeader = [
    {
        Key: "Unit",
        Value: "設攤單位",
    },
    {
        Key: "Stall",
        Value: "攤位名稱",
    }
]
</script>
<template>
    <div class="w-full flex flex-wrap m-4">
        <div v-html="StallData" class="htmlData">
        </div>
        <!-- <Search class="w-full"></Search>
        <img :src="StallImg" alt="" class="w-full" loading="lazy">
        <Table v-model:TableData="StallData" :-table-header="TableHeader" class="w-4/5 mx-4"></Table> -->
    </div>
</template>