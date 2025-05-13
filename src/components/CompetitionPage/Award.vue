<script setup>
import { onMounted, reactive, ref } from "vue";
import Table from '../BaseComponents/Table.vue';
import Search from "../BaseComponents/Search.vue";
import Loading from "../BaseComponents/Loading.vue";

import AwardJSON from "@/assets/Json/Award.json";

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const LoadingValue = ref(true);
const TableData = ref([]);
const TableHeader = [
    {
        Key: "LOGO",
        Value: "LOGO",
    },
    {
        Key: "Unit",
        Value: "設獎單位",
    },
    {
        Key: "Name",
        Value: "獎項名稱",
    },
]

onMounted(() => {
    TableData.value = AwardJSON;
    LoadingValue.value = false;
});
</script>
<template>
    <div class="w-full flex flex-wrap">
        <Search class="w-full"></Search>
        <Table class="w-4/5 mx-4" v-model:TableData="TableData" :TableHeader="TableHeader"></Table>
    </div>
    <Loading v-if="LoadingValue"></Loading>
</template>