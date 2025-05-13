<script setup>
import { reactive, onMounted, ref } from 'vue'
import ApiHelper from '@/helpers/ApiHelper.js'
import Table from '../BaseComponents/Table.vue';
import Loading from "../BaseComponents/Loading.vue";
import Search from '../BaseComponents/Search.vue';
import TableContent from '../BaseComponents/TableContent.vue';
import HotelJson from '@/assets/json/Hotel.json';

const LoadingValue = ref(true);
// 搜尋資料
const SearchData = reactive({
    KeyWord: "",
    SortColumn: "",
    SortMethod: "ASC",
    Page: 1,
    Fetch: 5,
    Identities: [],
});
// 頁面資料
const PageData = reactive({
    TotalCount: 0,
    MaxPage: 0,
    DataList: [],
});
// 取得頁面資料
function GetPageData() {
    PageData.DataList = HotelJson.DataList;
    LoadingValue.value = false;
    // ApiHelper.Axios(
    //     "api/Accommodation/GetPageData",
    //     "POST",
    //     SearchData,
    //     (res) => {
    //         PageData.TotalCount = res.data.TotalCount;
    //         PageData.MaxPage = res.data.MaxPage;
    //         PageData.DataList = res.data.DataList;
    //         LoadingValue.value = false;
    //     },
    //     (err) => {
    //         ApiHelper.ProcessErrMsg(err);
    //     }
    // );
}

const TableHeader = [
    { Key: "Category", Value: "分類" },
    { Key: "Area", Value: "行政區" },
    { Key: "Name", Value: "名稱" },
    { Key: "Address", Value: "地址" },
    { Key: "Phone", Value: "電話" },
]

onMounted(() => {
    GetPageData();
});
</script>
<template>
    <div class="w-full flex flex-wrap">
        <Search class="w-full"></Search>
        <Table :-table-header="TableHeader" v-model:TableData="PageData.DataList" :-get-page-data="GetPageData"
            class="w-4/5 mx-4"></Table>
    </div>
    <Loading v-if="LoadingValue"></Loading>
</template>