<script setup>
import UserPage from "@/components/MasterPageUser.vue";
import AreaTitle from "../BaseComponents/AreaTitle.vue";
import ApiHelper from "@/helpers/ApiHelper";
import Search from "../BaseComponents/Search.vue";
import Table from "../BaseComponents/Table.vue";
import TableContent from "../BaseComponents/TableContent.vue";
import HandPointer from "../BaseComponents/HandPointer.vue";
import { ref, onMounted } from "vue";
import NewsJson from "@/assets/json/News.json";

const props = defineProps(["ShowSearch"]);
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
];
const TableDate = ref([]);
// 取得最新消息資料
function GetPageData() {
  TableDate.value = NewsJson.DataList;
  // ApiHelper.Axios(
  //   "api/LatestNews/GetPageData",
  //   "GET",
  //   null,
  //   (res) => {
  //     TableDate.value = res.data.DataList;
  //   },
  //   (err) => {
  //     ApiHelper.ProcessErrMsg(err);
  //   }
  // );
}
// 取得單筆最新消息資料
const DetailData = ref([]);
function GetDetail(id) {
  console.log(id);
  ApiHelper.Axios(
    `api/LatestNews/${id}`,
    "GET",
    null,
    (res) => {
      DetailData.value = res.data;
      console.log(DetailData.value);
    },
    (err) => {
      ApiHelper.ProcessErrMsg(err);
    }
  );
}
const DetailShow = ref(false);

onMounted(() => {
  GetPageData();
});
</script>
<template>
  <div class="w-full flex flex-wrap my-4">
    <Search class="w-full" v-if="props.ShowSearch"></Search>
    <HandPointer :-hidden-size="'md'" :-text-content="'請左右滑動查看表格'"></HandPointer>
    <Table :-table-header="TableHeader" v-model:TableData="TableDate" :-get-page-data="GetPageData" :Pointer="true"
      class="w-4/5 mx-4"></Table>
    <TableContent v-if="DetailShow"></TableContent>
  </div>
</template>
