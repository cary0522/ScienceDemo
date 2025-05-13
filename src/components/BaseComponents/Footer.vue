<script setup>
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

const props = defineProps(["MenuList"]);
</script>
<template>
  <div id="footer"
    class="flex flex-wrap text-center text-xs sm:text-sm md:text-base bg-[#3e6ea833] min-h-[200px] h-auto sticky bottom-0 mx-0 pb-4">
    <div class="flex flex-wrap w-full 2xl:w-[1512px] justify-start sm:ms-4 2xl:mx-auto items-start">
      <div v-for="item in props.MenuList" class="my-2 mx-auto w-[200px] flex flex-wrap text-gray-700">
        <p class="text-2xl font-black text-center w-full whitespace-pre border-b-4 border-gray-700 pb-2 mx-2">
          {{ t(`menuList.${item.groupName}`) }}
        </p>
        <ul class="mx-auto w-[165px] md:w-[185px] my-2">
          <li v-for="items in item.items" class="text-start">
            <a :href="items.path" class="hover:text-white hover:font-black">
              {{ t(`menuList.${items.name}`) }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-wrap m-2 justify-center w-full text-gray-700">
      <p class="m-2">{{ t('footer.指導單位') }}：{{ t('footer.教育部') }}</p>
      <p class="m-2">{{ t('footer.主辦單位') }}：{{ t('footer.國立臺灣科學教育館') }}、{{ t('footer.桃園市政府') }}</p>
      <p class="m-2">{{ t('footer.承辦單位') }}：{{ t('footer.桃園市政府教育局') }}</p>
      <p class="m-2">{{ t('footer.協辦單位') }}：{{ t('footer.國立教育廣播電台') }}</p>
      <p class="m-2">{{ t('地址') }}：33001{{ t('footer.桃園市桃園區縣府路1號') }}</p>
      <p class="m-2">{{ t('footer.辦公時間') }}：{{ t('footer.週一至週五') }}8:00-17:00</p>
      <p class="m-2">{{ t('footer.科展諮詢服務專線') }}：03-3322101</p>
    </div>
    <div class="flex justify-center w-full text-gray-700">
      <a class="m-2 hover:text-white hover:font-bold cursor-pointer" href="#">{{ t('報名系統') }}</a>
      <a class="m-2 hover:text-white hover:font-bold cursor-pointer" href="#">{{ t('評審系統') }}</a>
      <a class="m-2 hover:text-white hover:font-bold cursor-pointer" href="#">{{ t('管理系統') }}</a>
    </div>
  </div>
</template>
<style>
#footer div ul {
  list-style-type: disc;
  /* 圓點無序列表 */
  padding-left: 25px;
  margin-left: 10px;
}
</style>
