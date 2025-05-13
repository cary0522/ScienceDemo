<script setup>
import { ref, onMounted } from "vue";
import ApiHelper from "@/helpers/ApiHelper.js";
import VideoJson from "@/assets/json/Video.json";

const props = defineProps(["indexNum"]);

const VideoData = ref();

function GetData() {
  VideoData.value = VideoJson;
  // ApiHelper.Axios(
  //   "api/announce/viedo",
  //   "GET",
  //   null,
  //   (res) => {
  //     VideoData.value = res.data;
  //   },
  //   (err) => {
  //     ApiHelper.ProcessErrMsg(err);
  //   }
  // );
}

onMounted(() => {
  GetData();
});
</script>
<template>
  <div>
    <div class="flex flex-wrap mx-auto justify-center my-4">
      <div v-for="(item, index) in VideoData" :key="item.id">
        <template v-if="
          props.indexNum ? index < props.indexNum : index < VideoData.length
        ">
          <div v-html="item.iframe" class="mx-2 flex justify-center"></div>
          <p class="text-center w-[560px]">{{ item.Title }}</p>
        </template>
      </div>
    </div>
  </div>
</template>
