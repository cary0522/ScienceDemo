<script setup>
import "../assets/style/MasterPageUser.css";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import "animate.css";
import Nav from "./BaseComponents/Nav.vue";
import Footer from "./BaseComponents/Footer.vue";
import ToTheTop from "./BaseComponents/ToTheTop.vue";
import SettingJson from "@/assets/Setting.json";
const DataJson = ref(SettingJson);

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
watch(locale, (newLocale) => {
  window.localStorage.setItem("UserLocale", newLocale);
});

//從VueRouter取得PageName
const router = useRouter();
const currentRouteName = ref(router.currentRoute.value.name);
document.getElementsByTagName("Title").innerHtml = currentRouteName.value;

// function GetPageData() {
//   ApiHelper.Axios(
//     'setting',
//     'GET',
//     null,
//     (res) => {
//         DataJson.value = res.data;
//     },
//     (err) => {
//       ApiHelper.ProcessErrMsg(err)
//     }
//   )
// }

// onMounted(() => {
//   GetPageData();
// })
</script>
<template>
  <Nav v-model:SettingJson="DataJson"></Nav>
  <main>
    <!--內容開始-->
    <div class="ContentBox">
      <slot></slot>
    </div>
    <ToTheTop></ToTheTop>
    <Footer :MenuList="DataJson.menuList"></Footer>
    <!--內容結束-->
  </main>
</template>
