<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import logoImageUrl from "/images/ScienceLogo.webp";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const router = useRouter();
const currentRouteName = ref(router.currentRoute.value.name);

const model = defineModel("SettingJson");
const LastScrollYData = ref(0);

//控制Menu顯示
const toggleMenuVisibility = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

//選單控制
let isMenuVisible = ref(false);
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
onMounted(() => {
  if (window.innerWidth >= 768) {
    isMenuVisible.value = true;
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
  } else {
    isMenuVisible.value = false;
  }
})
</script>
<template>
  <header>
    <div class="HeaderTitle w-full">
      <div v-if="model.menuList.length > 0" @click="toggleMenuVisibility" class="MenuBar">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </div>
      <a href="/" class="w-3/4 md:w-3/12 2xl:w-auto">
        <div class="flex justify-center md:justify-start items-center">
          <img loading="lazy"
            class="mx-2 h-14 object-contain rounded-full animate__animated animate__rollIn animate__fast"
            :src="logoImageUrl" alt="logo" />
          <div class="text-start mx-2 w-auto animate__animated animate__fadeInLeft animate__fast">
            <p class="text-xl leading-0">
              {{ t(`WebTitle`) }}</p>
            <p class="font-normal leading-0 tracking-tighter text-xs w-full">
              {{ t(`SideTitle`) }}
            </p>
          </div>
        </div>
      </a>
      <!--電腦選單內容 開始-->
      <div v-show="isMenuVisible"
        class="hidden md:flex flex-row flex-wrap md:justify-start 2xl:justify-end text-white text-xl md:w-9/12 2xl:w-8/12 text-center h-100% mx-4 animate__animated animate__fadeInLeft animate__fast">
        <div v-for="(Group, Index) in model.menuList" :key="'Group_' + Index" @mouseover="Group.ShowItem = true"
          @mouseleave="Group.ShowItem = false" class="transition-all mx-1 py-4">
          <div :class="{ 'hover:bg-gray-300': Group.items.length == 0 }"
            class="hover:bg-gray-300 cursor-pointer me-2 my-1 py-2">
            <a :href="Group.path" @click="Group.ShowItem = !Group.ShowItem" class="relative">
              <div>
                <font-awesome-icon :icon="Group.icon" />
                {{ t(`menuList.${Group.groupName}`) }}
              </div>
              <div v-if="Group.ShowItem && Group.items.length > 0"
                class="flex flex-col md:absolute top-8 left-[50%] translate-x-[-50%] min-w-[160px] z-10 w-auto bg-[#DFE9F2] rounded-b-lg px-4 py-4 mx-2 animate__animated animate__fadeIn animate__fast">
                <a v-for="Item in Group.items" :href="Item.path" :class="{ MenuActive: currentRouteName == Item.name }"
                  class="my-2 text-gray-700 hover:bg-[#99B3D1] text-start flex">
                  <font-awesome-icon :icon="Item.icon" class="w-[25px]" />
                  <p class="ms-1 w-auto inline-block whitespace-nowrap">
                    {{ t(`menuList.${Item.name}`) }}
                  </p>
                </a>
              </div>
            </a>
          </div>
        </div>
        <!-- <a href="/login" class="transition-all hover:bg-gray-300 cursor-pointer me-2 my-1">
          <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
          系統登入</a> -->
        <div v-if="locale == 'ch'" class="my-1 items-center flex">
          <span @click="locale = 'ch'" class="hover:underline underline-offset-8 underline cursor-pointer">中文</span>
          <span>/</span>
          <span @click="locale = 'en'" class="hover:underline underline-offset-8 cursor-pointer">English</span>
        </div>
        <div v-if="locale == 'en'" class="my-1 items-center flex">
          <span @click="locale = 'ch'" class="hover:underline underline-offset-8 cursor-pointer">中文</span>
          <span>/</span>
          <span @click="locale = 'en'"
            class="hover:underline underline-offset-8 underline cursor-pointer">English</span>
        </div>
      </div>
      <!--電腦選單內容 結束-->
      <!--手機選單內容 開始-->
      <div v-show="isMenuVisible" id="mobileMenu"
        class="md:hidden flex flex-col justify-start absolute my-[128px] pb-[80px] top-0 left-[-2rem] text-gray-700 text-xl w-full text-start bg-defaultBg/90 rounded overflow-x-auto overflow-y-scroll animate__animated animate__fadeInLeft animate__fast z-50">
        <div v-for="(Group, Index) in model.menuList" :key="'Group_' + Index" class="transition-all">
          <div class="cursor-pointer my-3">
            <a :href="Group.path" @click="Group.ShowItem = !Group.ShowItem" class="relative">
              <div>
                <font-awesome-icon class="pl-5" :icon="Group.icon" />
                {{ t(`menuList.${Group.groupName}`) }}
              </div>
              <div v-if="Group.ShowItem && Group.items.length > 0"
                class="flex flex-col md:absolute top-0 left-0 min-w-[160px] w-auto text-gray-700 rounded-b-lg px-2 pt-2 my-4 ms-8 animate__animated animate__fadeInLeft animate__fast">
                <a v-for="Item in Group.items" :href="Item.path" :class="{ MenuActive: currentRouteName == Item.name }"
                  class="my-2 text-start flex">
                  <font-awesome-icon :icon="Item.icon" />
                  <p class="ms-1 w-auto inline-block whitespace-nowrap">
                    {{ t(`menuList.${Item.name}`) }}
                  </p>
                </a>
              </div>
            </a>
          </div>
        </div>
        <!-- <a href="/login" class="transition-all hover:bg-gray-300 cursor-pointer me-2 my-1">
          <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
          系統登入</a> -->
      </div>
      <!--手機選單內容 結束-->
    </div>
  </header>
</template>
<style>
#mobileMenu {
  height: 80vh;
}
</style>