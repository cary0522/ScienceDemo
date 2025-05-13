<script setup>
import Multiselect from "vue-multiselect";

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const SearchData = defineModel("SearchData");
const DetailContentShow = defineModel("DetailContentShow");
const props = defineProps(["GetPageData", "OptionsList", "Select"]);

// 選擇分類
function SearchNewsType(option) {
  document.location.href = option.path;
  SearchData.value.SortColumn = option.Key;
  props.GetPageData();
  DetailContentShow.value = false;
}
// 判斷是否為外部連結
function ExtraLink(path) {
  if (/^https?:\/\//.test(path)) {
    return path
  } else {
    return '#' + path
  }
}
</script>

<template>
  <div class="ms-8 mt-8 hidden lg:block animate__animated animate__fadeInLeft animate__slow">
    <Multiselect v-if="props.Select" :options="props.OptionsList" placeholder="消息分類" :label="Value"
      v-on:select="SearchNewsType($event)" class="ms-0 my-4 text-base w-[240px] md:w-11/12">
      <template #noResult> 請輸入分類名稱 </template>
    </Multiselect>
    <div class="w-11/12 text-base xl:text-lg">
      <v-list class="py-0 rounded-lg border">
        <v-list-item class="border-b cursor-pointer hover:bg-gray-300/50 transition-all"
          v-for="item in props.OptionsList" :href="ExtraLink(item.Path)">
          {{ t(`menuList.${item.Value}`) }}
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>
<style>
.multiselect__select {
  transform: translateY(-50%);
}
</style>
