<script setup>
import { onMounted, reactive, ref } from "vue";
import Files from '../BaseComponents/Files.vue';
import Search from "../BaseComponents/Search.vue";
import Pagination from "../BaseComponents/Pagination.vue";
import FilesJson from "@/assets/JSON/Files.json";

import FileImg from '/images/icons/FileFolders.png'
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
// 搜尋資料
const SearchData = reactive({
    KeyWord: "",
    SortColumn: "",
    SortMethod: "ASC",
    Page: 1,
    Fetch: 20,
    Identities: [],
});
// 頁面資料
const PageData = reactive({
    TotalCount: 0,
    MaxPage: 5,
    DataList: [],
});

onMounted(() => {
    FilesList.value = FilesJson.DataList;
})
</script>
<template>
    <div class="w-full flex flex-wrap">
        <Search class="w-full"></Search>
        <Files :-file-img="FileImg" :-header-list="TableHeader" v-model:FilesList="FilesList"></Files>
    </div>
    <Pagination :TotalPage="PageData.MaxPage" v-mode="SearchData.Page"></Pagination>
</template>