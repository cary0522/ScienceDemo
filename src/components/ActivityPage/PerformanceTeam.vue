<script setup>
import { onMounted, reactive } from "vue";
import ApiHelper from "@/helpers/ApiHelper";
import Card from '../BaseComponents/Card.vue';
import Team from '../BaseComponents/Team.vue';
import TeamJson from "@/assets/json/Team.json";

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
    PageData.DataList = TeamJson;
    // ApiHelper.Axios(
    //     "api/announce/Teams",
    //     "GET",
    //     null,
    //     (res) => {
    //         // PageData.TotalCount = res.data.TotalCount;
    //         // PageData.MaxPage = res.data.MaxPage;
    //         // PageData.DataList = res.data.DataList;
    //         PageData.DataList = res.data;
    //     },
    //     (err) => {
    //         ApiHelper.ProcessErrMsg(err);
    //     }
    // );
}

onMounted(() => {
    GetPageData();
});
</script>
<template>
    <div>
        <div v-for="team in PageData.DataList">
            <Team :Title="team.title" :Content="team.content" :Img="team.img"></Team>
            <!-- <Card :title="team.title" :content="team.content" :img="team.img" :link="team.link"></Card> -->
        </div>
    </div>
</template>