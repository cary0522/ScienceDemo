<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import UserPage from "/src/components/MasterPageUser.vue";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import Banner from "@/components/BaseComponents/Banner.vue";
import Table from "@/components/BaseComponents/Table.vue";
import Loading from "@/components/BaseComponents/Loading.vue";
import Button from "@/components/BaseComponents/Button.vue";
import AreaTitle from "@/components/BaseComponents/AreaTitle.vue";
import Moments from "@/components/AnnouncePage/Moments.vue";
import Highlights from "@/components/AnnouncePage/Highlights.vue";
import Video from "@/components/AnnouncePage/Video.vue";
import BreadCrumb from "@/components/BaseComponents/Breadcrumb.vue";
import ApiHelper from "@/helpers/ApiHelper";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import NewsJson from '@/assets/json/News.json';
import VideoJson from '@/assets/json/Video.json';

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

import { useAdminStore } from "@/stores/useAdminStore";
import { useFeatureToggle } from "@/stores/useFeatureToggle";

const LoadingValue = ref(true);
const LastScrollYData = ref(0);

// 監聽當頁面大小改變時動畫參數改變
window.addEventListener("resize", () => {
  gsapFunction();
  if (window.innerWidth >= 768) {
    window.addEventListener("scroll", () => {
      const header = document.getElementsByTagName("header")[0];
      if (window.scrollY > LastScrollYData.value && window.scrollY > 150) {
        header.classList.add("animate__animated", "animate__fadeOutUp");
        header.classList.remove("animate__fadeInDown");
        LastScrollYData.value = window.scrollY;
      } else if (window.scrollY < LastScrollYData.value) {
        header.classList.remove("animate__fadeOutUp");
        header.classList.add("animate__fadeInDown");
        LastScrollYData.value = window.scrollY;
      }
    });
  }
});
// 頁面載入完成後判斷動畫參數
window.addEventListener("load", () => {
  if (window.innerWidth >= 768) {
    window.addEventListener("scroll", () => {
      const header = document.getElementsByTagName("header")[0];
      if (window.scrollY > LastScrollYData.value && window.scrollY > 150) {
        header.classList.add("animate__animated", "animate__fadeOutUp");
        header.classList.remove("animate__fadeInDown");
        LastScrollYData.value = window.scrollY;
      } else if (window.scrollY < LastScrollYData.value) {
        header.classList.remove("animate__fadeOutUp");
        header.classList.add("animate__fadeInDown");
        LastScrollYData.value = window.scrollY;
      }
    });
  }
});

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
  TableDate.value = NewsJson.DataList
  // ApiHelper.Axios(
  //   "api/LatestNews/GetPageData",
  //   "GET",
  //   null,
  //   (res) => {
  //     TableDate.value = res.data.DataList
  //   },
  //   (err) => {
  //     ApiHelper.ProcessErrMsg(err);
  //   }
  // );
  LoadingValue.value = false;
}

// 取得宣傳影片資料
const VideoData = ref([]);
function GetVideoData() {
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

gsap.registerPlugin(ScrollTrigger);
const TimeLine = gsap.timeline();
function gsapFunction() {
  TimeLine.to("#announceTable", {
    scrollTrigger: {
      trigger: "#BannerImg",
      start: `center ${window.innerWidth > 768 ? "10%" : "top"}`,
      end: "bottom 10%",
      scrub: 2,
    },
    y: window.innerWidth > 768 ? "-20vh" : "-10vh",
  })
    .set("#sliderArea", {
      y: window.innerWidth > 768 ? "-20vh" : "-10vh",
    })
    .fromTo(
      ".sliderMoment",
      {
        scale: '.8'
      },
      {
        scrollTrigger: {
          trigger: "#announceTable",
          start: "center center",
          end: "center 10%",
          scrub: 2,
        },
        scale: '1',
      }
    )
    .fromTo(
      ".sliderHeight",
      {
        scale: '.8'
      },
      {
        scrollTrigger: {
          trigger: ".sliderMoment",
          start: "bottom center",
          end: "bottom 20%",
          scrub: 2,
        },
        scale: '1',
      }
    )
    .fromTo(
      ".sliderVideo",
      {
        scale: '.8'
      },
      {
        scrollTrigger: {
          trigger: ".sliderHeight",
          start: "bottom center",
          end: "bottom 20%",
          scrub: 2,
        },
        scale: '1',
      }
    );
}

onMounted(() => {
  GetPageData();
  GetVideoData();
  gsapFunction();
});
</script>
<template>
  <UserPage>
    <Banner></Banner>
    <div id="announceTable" class="w-4/5 mx-auto mb-16">
      <Table :-table-header="TableHeader" v-model:TableData="TableDate"></Table>
    </div>
    <div class="w-full justify-start mb-16" id="sliderArea">
      <div
        class="sliderMoment w-4/5 h-auto border-dashed border-4 mx-auto my-4 rounded-xl text-center items-start justify-start flex flex-wrap">
        <div class="flex flex-wrap items-end justify-between w-full">
          <BreadCrumb :-breadcrumb-list="['大會公告', '精彩時刻']" class="w-full"></BreadCrumb>
          <Moments :indexNum="4"></Moments>
          <a href="/announce/moments"
            class="bg-[#4E64A6] hover:bg-[#99B3D1] text-white rounded p-4 m-4 cursor-pointer ms-auto">MORE</a>
        </div>
      </div>
      <div
        class="sliderHeight w-4/5 h-auto border-dashed border-4 mx-auto my-4 rounded-xl text-center items-start justify-start  flex-wrap  flex-wrap-wrap">
        <div class="flex flex-wrap items-end justify-between w-full">
          <BreadCrumb :-breadcrumb-list="['大會公告', '每日花絮']" class="w-full"></BreadCrumb>
          <Highlights :indexNum="4"></Highlights>
          <a href="/announce/highlights"
            class="bg-[#4E64A6] hover:bg-[#99B3D1] text-white rounded p-4 m-4 cursor-pointer ms-auto">MORE</a>
        </div>
      </div>
      <div
        class="sliderVideo w-4/5 h-auto border-dashed border-4 mx-auto my-4 rounded-xl items-start justify-start flex flex-wrap">
        <div class="flex flex-wrap items-end justify-between w-full">
          <BreadCrumb :-breadcrumb-list="['大會公告', '宣傳影片']" class="w-full"></BreadCrumb>
          <Video :index-num="4"></Video>
          <a href="/announce/video"
            class="bg-[#4E64A6] hover:bg-[#99B3D1] text-white rounded p-4 m-4 cursor-pointer ms-auto">MORE</a>
        </div>
      </div>
    </div>
  </UserPage>
  <!-- 讀取畫面 開始 -->
  <Loading :-loading="LoadingValue"></Loading>
  <!-- 讀取畫面 結束 -->
</template>
