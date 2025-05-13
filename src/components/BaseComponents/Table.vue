<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Swal from "sweetalert2";

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

// 接收參數
const props = defineProps([
  "TableHeader",
  "DetailFunction",
  "GetPageData",
  "Sort",
  "Setting",
  "Pointer",
]);

// 雙向綁定資料
const SearchData = defineModel("SearchData");
const TableData = defineModel("TableData");

const SelectValue = ref(false);
// 點擊查看詳細內容
function ClickFunction(id) {
  if (props.Pointer) {
    props.DetailFunction(id);
  } else {
    return;
  }
}
// 表格排序
function ToggleSort(method, column) {
  SearchData.value.SortMethod = method;
  SearchData.value.SortColumn = column;
  props.GetPageData();
}

//全選或全消
const SelectAll = function (event) {
  for (let i = 0; i < TableData.value.length; i++) {
    TableData.value[i].Selected = event.target.checked;
  }
};
// 預覽檔案
function previewFile(name, speech) {
  Swal.fire({
    title: `得獎感言－${name} 老師`,
    text: speech,
    width: "80%",
    showCloseButton: true,
    showConfirmButton: false,
  });
  // Swal.fire({
  //   title: Name,
  //   html: `<iframe src="${BaseUrl}/api/LessonSharing/FilePreview/${ID}" width="100%" height="800px"></iframe>`,
  //   width: "80%",
  //   showCloseButton: true,
  //   showConfirmButton: false,
  // });
}
</script>

<template>
  <!-- 電腦版 公告總表 開始 -->
  <v-table class="my-4 w-full xl:m-2 overflow-x-auto rounded border animate__animated animate__fadeIn">
    <thead style="background-color: #3e6ea833">
      <tr>
        <th class="text-center leading-8" style="font-size: medium" v-if="Setting">
          <input type="checkbox" @change="SelectAll($event)" />
        </th>
        <th class="text-center leading-8" style="font-size: medium">#</th>
        <th v-for="(head, index) in props.TableHeader" class="text-start leading-8" style="font-size: medium">
          {{ t(`${head.Value}`) }}
          <template v-if="props.Sort">
            <span v-if="index !== 0" :class="props.Pointer ? 'cursor-pointer' : 'default'">
              <FontAwesomeIcon :icon="['fas', 'arrow-down-short-wide']" v-if="
                SearchData.SortMethod == 'DESC' &&
                SearchData.SortColumn == head.Key
              " @click="ToggleSort('ASC', head.Key)">
              </FontAwesomeIcon>
              <FontAwesomeIcon :icon="['fas', 'arrow-down-wide-short']" v-if="
                SearchData.SortMethod == 'ASC' &&
                SearchData.SortColumn == head.Key
              " @click="ToggleSort('DESC', head.Key)">
              </FontAwesomeIcon>
              <FontAwesomeIcon :icon="['fas', 'arrow-down-short-wide']" v-if="SearchData.SortColumn !== head.Key"
                @click="ToggleSort('ASC', head.Key)">
              </FontAwesomeIcon>
            </span>
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="TableData.length == 0">
        <td colspan="999" style="text-align: center" class="text-xs lg:text-base text-black">
          {{ t('查無內容') }}
        </td>
      </tr>
      <tr v-else v-for="(item, index) in TableData" :class="props.Pointer ? 'cursor-pointer' : 'default'">
        <td style="text-align: center; padding: 0.5rem" v-if="Setting">
          <input type="checkbox" v-model="item.Selected" />
        </td>
        <td style="text-align: center; padding: 0.5rem" @click="ClickFunction(item.ID)">
          {{ index + 1 }}
        </td>
        <template v-for="head in props.TableHeader">
          <td v-if="head.Key == 'Category'" style="text-align: start; min-width: 140px; padding: 0.5rem"
            @click="ClickFunction(item.ID)">
            <span class="rounded-full border p-2 text-xs" v-if="head.Key == 'Category'">
              {{ item[head.Key] }}
            </span>
          </td>
          <td v-else-if="head.Key == 'Top'" style="text-align: center; width: 95px; padding: 0.5rem"
            @click="ClickFunction(item.ID)">
            <font-awesome-icon :icon="['fas', 'star']" class="text-yellow" v-if="item.Top" />
          </td>
          <td v-else-if="head.Key == 'FilesList'" style="text-align: start; padding: 0.5rem"
            @click="ClickFunction(item.ID)">
            <template v-for="(file, index) in item.FilesList">
              {{ file.name }}
              <span v-if="index < item.FilesList.length - 1">,</span>
            </template>
          </td>
          <td v-else-if="head.Key == 'Speech'" style="text-align: start; padding: 0.5rem"
            @click="ClickFunction(item.ID)">
            <p @click="previewFile(item.Name, item.Speech)"
              class="cursor-pointer text-[#4E64A6] underline underline-offset-4">
              {{ t('點擊查看得獎感言') }}
            </p>
          </td>
          <td v-else-if="head.Key == 'LOGO'" style="text-align: start; padding: 0.5rem" @click="ClickFunction(item.ID)">
            <img :src="item.LOGO" alt="" class="w-[50px] h-[50px] object-cover rounded-full" />
          </td>
          <td v-else style="text-align: start; min-width: 120px; padding: 0.5rem" @click="ClickFunction(item.ID)"
            class="text-xs lg:text-base">
            {{ item[head.Key] }}
          </td>
        </template>
      </tr>
    </tbody>
  </v-table>
  <!-- 電腦版 公告總表 結束 -->
</template>
