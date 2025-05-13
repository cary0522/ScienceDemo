<script setup>
import ApiHelper from "@/helpers/ApiHelper";
import Card from "../BaseComponents/Card.vue";
import Search from "../BaseComponents/Search.vue";
import { ref, onMounted } from "vue";
import MomentJson from "@/assets/json/Moment.json";

const props = defineProps(["indexNum"]);

const momentData = ref([]);
function GetPageData() {
  momentData.value = MomentJson;
  // ApiHelper.Axios(
  //   "api/announce/moments",
  //   "GET",
  //   null,
  //   (res) => {
  //     momentData.value = res.data;
  //   },
  //   (err) => {
  //     ApiHelper.ProcessErrMsg(err);
  //   }
  // );
}

onMounted(() => {
  GetPageData();
});
</script>
<template>
  <div class="w-full flex flex-wrap my-4">
    <Search class="w-4/5 mx-4" v-if="props.ShowSearch"></Search>
    <div class="masonry mx-4">
      <div v-for="(item, index) in momentData" :key="item.id" class="card">
        <Card v-if="props.indexNum ? index < props.indexNum : momentData.length" :content="item.content"
          :title="item.title" :img="item.img"></Card>
      </div>
    </div>
  </div>
</template>
<style>
.masonry {
  column-count: 4;
  /* 設定列數 */
  /* column-gap: 1rem; */
  /* 列之間的水平間距 */
}

.card {
  break-inside: avoid;
}
</style>