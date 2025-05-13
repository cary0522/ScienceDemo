<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import UserPage from "@/components/MasterPageUser.vue";
import LeftOptions from "@/components/BaseComponents/LeftOptions.vue";
import Breadcrumb from '@/components/BaseComponents/Breadcrumb.vue'
import LatestNews from "@/components/AnnouncePage/LatestNews.vue";
import Highlights from "@/components/AnnouncePage/Highlights.vue";
import Moments from "@/components/AnnouncePage/Moments.vue";
import Video from "@/components/AnnouncePage/Video.vue";

const router = useRouter();

const OptionsList = ref([
  { Value: "最新消息", Path: "/announce/latestNews" },
  { Value: "每日花絮", Path: "/announce/highlights" },
  { Value: "精彩時刻", Path: "/announce/moments" },
  { Value: "宣傳影片", Path: "/announce/video" },
]);
</script>
<template>
  <div>
    <UserPage>
      <div class="flex w-full">
        <LeftOptions :OptionsList="OptionsList" :select="false" class="w-1/3"></LeftOptions>
        <div class="w-full flex flex-wrap">
          <Breadcrumb :BreadcrumbList="['大會公告', router.currentRoute.value.meta.title]" class="w-full"></Breadcrumb>
          <LatestNews v-if="router.currentRoute.value.path == '/announce/latestNews'" :ShowSearch="true"></LatestNews>
          <Highlights v-if="router.currentRoute.value.path == '/announce/highlights'" :ShowSearch="true"></Highlights>
          <Moments v-if="router.currentRoute.value.path == '/announce/moments'" :ShowSearch="true"></Moments>
          <Video v-if="router.currentRoute.value.path == '/announce/video'"></Video>
        </div>
      </div>
    </UserPage>
  </div>
</template>
