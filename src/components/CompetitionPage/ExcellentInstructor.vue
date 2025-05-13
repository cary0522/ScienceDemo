<script setup>
import { onMounted, reactive, ref } from "vue";
import Table from '../BaseComponents/Table.vue';
import Loading from "../BaseComponents/Loading.vue";
import Search from "../BaseComponents/Search.vue";
import TeacherJson from "@/assets/Json/Teacher.json";

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const LoadingValue = ref(true);
const TableData = ref([]);
const TableHeader = [
    {
        Key: "Name",
        Value: "姓名",
    },
    {
        Key: "Session",
        Value: "參展屆數",
    },
    {
        Key: "School",
        Value: "學校",
    },
    {
        Key: "Speech",
        Value: "得獎感言",
    },
]

onMounted(() => {
    TableData.value = TeacherJson;
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