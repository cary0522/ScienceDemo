<script setup>
import ApiHelper from "@/helpers/ApiHelper";
import { onMounted, ref } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SettingJson from "@/assets/Setting.json";

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

// import ApiHelper from '@/helpers/ApiHelper';
const DataJson = ref(SettingJson);
// const DataJson = ref(null);

const BannerData = ref([]);
const Title = ref("");
// 取得輪播圖資料
// function GetPageData() {
//   ApiHelper.Axios(
//     "api/Home/BannerData",
//     "GET",
//     null,
//     (res) => {
//         BannerData.value = res.data;
//     },
//     (err) => {
//       ApiHelper.ProcessErrMsg(err);
//     }
//   );
//   ApiHelper.Axios(
//     "setting",
//     "GET",
//     null,
//     (res) => {
//         Title.value = res.data;
//     },
//     (err) => {
//       ApiHelper.ProcessErrMsg(err);
//     }
//   );
// }

gsap.registerPlugin(ScrollTrigger);
onMounted(() => {
  //   GetPageData();
  gsap.to("#BannerImg", {
    scrollTrigger: {
      trigger: "#BannerImg",
      start: "top 10%",
      end: "bottom 10%",
      scrub: 2,
    },
    y: "-25vh",
  });
  gsap.fromTo(
    "#pageTitle",
    {
      opacity: 0,
    },
    {
      scrollTrigger: {
        trigger: "#BannerImg",
        start: "top center",
        end: "center top",
        scrub: 2,
      },
      y: "-60vh",
      opacity: 1,
    }
  );
});
</script>

<template>
  <!-- <v-carousel cycle>
        <v-carousel-item src="/src/assets/images/ScienceBanner.webp">
        </v-carousel-item>
        <template v-for="item in BannerData">
            <v-carousel-item :src="item.Src">
            </v-carousel-item>
        </template>
</v-carousel> -->
  <div class="relative">
    <img src="/images/ScienceBanner.webp" loading="lazy" alt="" class="w-full 2xl:w-4/5 mx-auto opacity-60"
      id="BannerImg" />
    <div
      class="w-full text-center font-black text-7xl tracking-widest text-transparent hidden md:block absolute bottom-0"
      id="pageTitle">
      {{ t('WebTitle') }}
    </div>
  </div>
</template>
<style>
#pageTitle {
  -webkit-text-stroke: 2px rgb(108, 105, 105);
}
</style>
