<script setup>
import { ref } from "vue";
import ApiHelper from "@/helpers/ApiHelper";
import draggableComponent from "vuedraggable";
import Button from "./Button.vue";
import UploadFiles from "./UploadFiles.vue";
import Swal from "sweetalert2";

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

// 接收資料
const props = defineProps([
  // 檔案圖示
  "FileImg",
  // 表格標題物件
  "HeaderList",
  // 是否為設定模式
  "Setting",
  // 批次刪除路由
  "BatchDataURL",
  // 單筆操作路由
  "OperateURL",
  // 重整頁面函式
  "GetPageData",
]);

// 接收檔案資料
const FilesList = defineModel("FilesList");

// 下載檔案
function DownLoadFunction(ID, Name) {
  ApiHelper.FileDownload("api/download/file", "POST", ID, Name);
}

// 單筆操作
const Operate = ref(false);
const OperateData = ref({});
//全選或全消
const SelectAll = function (event) {
  for (let i = 0; i < FilesList.value.length; i++) {
    FilesList.value[i].Selected = event.target.checked;
  }
};
// 編輯內容
function EditData(data) {
  OperateData.value = data;
  Operate.value = true;
}
// 個別刪除
function DeleteData(data, index) {
  Swal.fire({
    icon: "info",
    text: `請確認是否要刪除「${data.Title}」的資料?`,
    confirmButtonText: "確認",
    showCancelButton: true,
    cancelButtonText: "取消",
  }).then((res) => {
    if (res.isConfirmed) {
      ApiHelper.Axios(
        props.OperateURL,
        "DELETE",
        data,
        (res) => {
          Swal.fire({
            icon: "success",
            text: "完成刪除",
            confirmButtonText: "確認",
          });
          props.GetPageData();
        },
        (err) => {
          ApiHelper.ProcessErrMsg(err);
        }
      );
    }
  });
}
// 批次刪除資料
const BatchOperate = function (BatchType) {
  let SelectItem = FilesList.value.filter((s) => s.Selected).map((s) => s.ID);
  if (SelectItem.length == 0) {
    Swal.fire(`請選擇要「刪除」的資料`, "", "warning");
    return;
  }
  Swal.fire({
    title: `請確認是否要刪除${SelectItem.length}筆資料`,
    showCancelButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    icon: "warning",
  }).then((result) => {
    if (result.isConfirmed) {
      ApiHelper.Axios(
        props.BatchDataURL,
        "DELETE",
        {
          IDList: SelectItem,
          BatchType: ApiHelper.OperateTypeEnum[BatchType],
        },
        (res) => {
          Swal.fire(res.data, "", "success").then(() => {
            props.GetPageData();
          });
        },
        (err) => {
          ApiHelper.ProcessErrMsg(err);
        }
      );
    }
  });
};
</script>

<template>
  <!-- 編輯畫面 開始 -->
  <UploadFiles v-if="Operate" :-operate-data="OperateData" :-table-header="HeaderList" v-model="Operate"
    :OperateURL="props.OperateURL"></UploadFiles>
  <!-- 編輯畫面 結束 -->
  <!-- 表格總覽 開始 -->
  <div class="w-full flex flex-wrap my-4" v-else>
    <div class="w-full">
      <div v-if="props.Setting">
        <div class="items-center hidden md:flex md:flex-wrap mx-8">
          <p class="mx-2 md:mx-8 text-xs md:text-base text-red-500 w-full">
            *請直接拖曳內容調整順序。
          </p>
          <p class="mx-2 md:mx-8 text-xs md:text-base text-red-500">
            *請勾選這一頁想要刪除的資料，勾選完成後點擊「刪除多筆資料」進行刪除。
          </p>
          <Button :-btn-text="'刪除多筆資料'" :ClickFunction="BatchOperate"></Button>
        </div>
        <div class="items-center block md:hidden mx-4">
          <p class="mx-2 md:mx-8 text-xs md:text-base text-red-500 w-full">
            *請直接拖曳內容調整順序。
          </p>
          <p class="mx-2 md:mx-8 text-xs md:text-base text-red-500">
            *請勾選這一頁想要刪除的資料，勾選完成後點擊「刪除多筆資料」進行刪除。
          </p>
        </div>
      </div>
      <div class="w-11/12 mx-auto flex items-center my-4" v-if="props.Setting">
        <input type="checkbox" class="border me-4" id="SelectAll" @change="SelectAll" />
        <label for="SelectAll" class="text-black text-base w-full">全選</label>
      </div>
    </div>
    <draggableComponent item-key="Title" :disabled="props.Setting ? false : true" v-model="FilesList"
      class="w-full mx-auto my-4">
      <template #item="{ element, index }">
        <div class="flex flex-wrap justify-around border-b-2 w-4/5 mx-auto my-2">
          <div class="w-full" v-if="props.Setting">
            <input type="checkbox" class="border" v-model="element.Selected" />
          </div>
          <div class="min-w-[60px] max-w-[120px] w-1/4 my-2 object-contain flex flex-col justify-center">
            <a :href="element.path">
              <img :src="FileImg" alt="" loading="lazy" />
            </a>
          </div>
          <div class="w-2/3 text-black py-4 flex flex-col justify-around">
            <div class="flex flex-wrap" v-for="head in HeaderList">
              <p>{{ t(`${head.Value}`) }}：</p>
              <p>{{ element[head.Key] }}</p>
            </div>
            <div class="lg:flex flex-wrap text-xs md:text-sm">
              <p>
                更新日期：<span>{{ element.UpdateAt }}</span><span class="hidden lg:inline-block">｜</span>
              </p>
              <p>
                發布單位：<span>{{ element.Create }}</span>
              </p>
            </div>
            <div class="lg:flex flex-wrap text-xs md:text-sm">
              <p class="1/5">檔案下載：</p>
              <div class="flex flex-wrap w-4/5" v-for="(item, index) in element.FilesList">
                <p class="cursor-pointer" @click="DownLoadFunction(item.ID, item.Name)">
                  {{ item.Name }}
                </p>
                <span class="hidden lg:inline-block">｜</span>
                <p>
                  下載次數：<span>{{ element.Count }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-around sm:justify-center items-center mb-4" v-if="props.Setting">
            <Button :-click-function="() => {
              EditData(element);
            }
              " :-btn-text="'編輯內容'"></Button>
            <Button :-click-function="() => {
              DeleteData(element, index);
            }
              " :-btn-text="'個別刪除'"></Button>
          </div>
        </div>
      </template>
    </draggableComponent>
    <div v-if="FilesList.length == 0" class="w-full">
      <p class="text-center text-black">{{ t('查無內容') }}</p>
    </div>
    <div class="w-full">
      <div class="items-center md:hidden flex justify-center" v-if="props.Setting">
        <Button :-btn-text="'刪除多筆資料'" :ClickFunction="BatchOperate"></Button>
      </div>
    </div>
  </div>
  <!-- 表格總覽 結束 -->
</template>
