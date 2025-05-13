<script setup>
import Card from "../BaseComponents/Card.vue";
import ApiHelper from "@/helpers/ApiHelper";
import Search from "../BaseComponents/Search.vue";
import { ref, onMounted } from "vue";
import HighlightJson from "@/assets/json/Highlight.json";


const props = defineProps(["indexNum", "ShowSearch"]);

const highlightData = ref([]);
function GetPageData() {
  highlightData.value = HighlightJson;
  // ApiHelper.Axios(
  //   "api/announce/highlights",
  //   "GET",
  //   null,
  //   (res) => {
  //     highlightData.value = res.data;
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
  <div class="flex flex-wrap w-full m-4">
    <Search class="w-full" v-if="props.ShowSearch"></Search>
    <div class="w-full mx-2 flex flex-wrap">
      <div v-for="(item, index) in highlightData" :key="item.id" class="min-w-[280px] w-1/4">
        <Card v-if="
          props.indexNum
            ? index < props.indexNum
            : index < highlightData.length
        " :title="item.title" :content="item.content" :img="item.img" class="mx-2"></Card>
      </div>
    </div>
  </div>
</template>
