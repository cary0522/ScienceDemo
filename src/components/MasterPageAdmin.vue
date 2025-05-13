<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "../assets/style/MasterPageAdmin.css";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

import SettingJson from "@/assets/Setting.json";
const DataJson = ref(SettingJson);

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
watch(locale, (newLocale) => {
  window.localStorage.setItem("UserLocale", newLocale);
});

//接受參數MenuItem
const props = defineProps(['MenuList']);

//選單 1.標題 2.連結 3.分隔線
const MenuList = reactive([
  {
    groupName: "首頁",
    showGroupName: false,
    Items: [
      {
        Name: "首頁",
        Icon: ["fas", "house-chimney"],
        Type: "2",
        Path: "/",
      },
      {
        Name: "後台首頁",
        Icon: ["fas", "house-chimney"],
        Type: "2",
        Path: "/dp_index",
      },
    ],
  },
  {
    groupName: "使用者帳號管理",
    showGroupName: true,
    Items: [
      {
        Name: "帳號管理",
        Icon: ["fas", "user"],
        Path: "#",
      },
      {
        Name: "角色管理",
        Icon: ["fas", "fingerprint"],
        Path: "#",
      },
    ],
  },
]);

// if (props.MenuList != null) {
//   MenuList = props.MenuList;
// }

//控制Menu顯示
const toggleMenuVisibility = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

//選單控制
let isMenuVisible = ref(false);
//Logo位置
const logoImageUrl = ref("/images/ScienceLogo.webp");

//從VueRouter取得PageName
const router = useRouter();
const currentRouteName = ref(router.currentRoute.value.name);
document.getElementsByTagName("Title").innerHtml = currentRouteName.value;

//監聽當頁面大小改變時，關閉選單
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    isMenuVisible.value = true;
  } else {
    isMenuVisible.value = false;
  }
});
//頁面載入完成後判斷要不要關閉選單
window.addEventListener("load", () => {
  if (window.innerWidth >= 768) {
    isMenuVisible.value = true;
  } else {
    isMenuVisible.value = false;
  }
});
</script>

<template>
  <!--Header Start-->
  <header>
    <!--Logo-->
    <div class="AdminHeaderBoxFloat">
      <div class="AdminHeaderLogo">
        <router-link to="/">
          <img :src="logoImageUrl" alt="logo" loading="lazy" class='rounded-full object-contain' /></router-link>
      </div>
    </div>
    <!--Logo End-->
    <!--Title Start-->
    <div class="AdminHeaderTitle">
      <div class="mx-4 md:hidden w-[50px] object-contain">
        <router-link to="/">
          <img class="mx-4 rounded-full object-contain" loading="lazy" :src="logoImageUrl" alt="logo" /></router-link>
      </div>
      <div>
        <div>前端專案模板 | 說說而已科技有限公司</div>
        <span class="font-normal text-sm md:text-base lg:text-lg">SSeyTemplate</span>
      </div>
    </div>
    <!--Title End-->
  </header>
  <!--選單控制 開始-->
  <div v-if="MenuList.length > 0" @click="toggleMenuVisibility" class="AdminMenuBar">
    <font-awesome-icon :icon="['fas', 'bars']" />
  </div>
  <!--選單控制 結束-->
  <!--Header End-->
  <main class="h-screen">
    <!--選單開始-->
    <div v-show="isMenuVisible" class="AdminMenuBox">
      <!--選單遮罩-->
      <!-- <div class="AdminMenuMask"></div> -->
      <!--選單內容 開始-->
      <div v-for="(Group, Index) in DataJson.menuList" :key="'Group_' + Group.Index">
        <div class="AdminMenuGroupTitle" v-text="Group.groupName"></div>
        <router-link v-for="Item in Group.items" :to="`${Item.path}/Setting`"
          :class="{ MenuActive: currentRouteName == Item.name }" class="AdminMenuItem">
          <font-awesome-icon :icon="Item.icon" />
          <span v-text="Item.name"></span>
        </router-link>
        <hr v-if="Index + 1 < MenuList.length" />
      </div>
      <!--選單內容 結束-->
    </div>
    <!--選單結束-->
    <!--內容開始-->
    <div class="AdminContentBox">
      <slot></slot>
    </div>
    <!--內容結束-->
  </main>
</template>
