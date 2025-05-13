<script setup>
import UserPage from '@/components/MasterPageUser.vue'
import { reactive, onMounted, ref } from 'vue'
import ApiHelper from '@/helpers/ApiHelper.js'
import Pagination from '../BaseComponents/Pagination.vue';
import Search from '../BaseComponents/Search.vue';
import Table from '../BaseComponents/Table.vue';
import Loading from "../BaseComponents/Loading.vue";
import TableContent from '../BaseComponents/TableContent.vue';
import GiftsJson from '@/assets/JSON/gifts.json'

const LoadingValue = ref(true);
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
    MaxPage: 0,
    DataList: [],
});
// 取得頁面資料
function GetPageData() {
    PageData.TotalCount = GiftsJson.TotalCount;
    PageData.MaxPage = GiftsJson.MaxPage;
    PageData.DataList = GiftsJson.DataList;
    LoadingValue.value = false;
    // ApiHelper.Axios(
    //     "api/Gift/GetPageData",
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
    { Key: "Year", Value: "年度" },
    { Key: "Category", Value: "分類" },
    { Key: "Name", Value: "名稱" },
    { Key: "Company", Value: "廠商" }
]

onMounted(() => {
    GetPageData();
});
</script>
<template>
    <div class="w-full flex flex-wrap">
        <Search class="w-full mx-2"></Search>
        <Table class="w-4/5 mx-4" :-get-page-data="GetPageData" :-table-header="TableHeader"
            v-model:TableData="PageData.DataList"></Table>
    </div>
    <Pagination :-get-page-data="GetPageData" :-total-page="PageData.MaxPage" v-model="SearchData.Page">
    </Pagination>
</template>