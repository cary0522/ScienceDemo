<script setup>
import { onMounted, reactive, ref } from "vue";
import Files from '../BaseComponents/Files.vue';
import Search from "../BaseComponents/Search.vue";
import FilesJson from "@/assets/JSON/Files.json";

import FileImg from '/icons/FileFolders.png'
const FilesList = ref([])
const TableHeader = [
    {
        Key: "CreateAt",
        Value: "日期",
    },
    {
        Key: "Title",
        Value: "檔案標題",
    },
    {
        Key: "Content",
        Value: "檔案描述",
    }
]

onMounted(() => {
    FilesList.value = FilesJson.DataList;
})
</script>
<template>
    <div class="w-full flex flex-wrap">
        <Search class="w-full"></Search>
        <Files :-file-img="FileImg" :-header-list="TableHeader" v-model:FilesList="FilesList"></Files>
    </div>
</template>