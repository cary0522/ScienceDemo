<script setup>
import { onMounted, reactive, ref } from "vue";
import Table from '../BaseComponents/Table.vue';
import Loading from "../BaseComponents/Loading.vue";
import Search from "../BaseComponents/Search.vue";

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const LoadingValue = ref(true);
const TableData = ref([]);
const TableHeader = [
    {
        Key: "StartTime",
        Value: "日期",
    },
    {
        Key: "Title",
        Value: "標題",
    },
    {
        Key: "Top",
        Value: "置頂",
    },
]

onMounted(() => {
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