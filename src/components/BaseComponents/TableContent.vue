<script setup>
import { onMounted, ref } from "vue";
import SelectSearch from "./SelectSearch.vue";
import ApiHelper from "@/helpers/ApiHelper";
import Swal from "sweetalert2";
import HandPointer from "./HandPointer.vue";
import Button from "./Button.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
// import { FwbToggle } from "flowbite-vue";
// 用於所有詳細表格渲染，以下載檔案函式、保存路由、上傳檔案路由判別資料
// 接收表格所需資料
const props = defineProps([
  // 表格渲染資料
  "DetailData",
  // 圖示
  "LottieSrc",
  // 表格標題物件
  "DetailHeader",
  // 是否為後台設定模式
  "Setting",
  // 資料分類陣列
  "OptionsList",
  // 保存路由
  "OperateURL",
  // 取得頁面資料函式
  "GetPageData",
]);

// 雙向綁定控制視窗開關
const ShowValue = defineModel("ShowValue");

// 上傳套件相關設定
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import zh from "@uppy/locales/lib/zh_TW";
import { Dashboard } from "@uppy/vue";
import "@uppy/dashboard/dist/style.css";
const uppy = new Uppy({
  // 語言
  locale: zh,
}).use(XHRUpload, { endpoint: "http://localhost:3005/api/upload/file" });
// 點選檔案，暫存檔案
const Temp = ref();
uppy.on("file-added", (res) => {
  Temp.value = res.data;
});
// 點選檔案上傳，取得檔案ID
uppy.on("upload-success", (file, res) => {
  res.body.FilesList.forEach((file) => {
    props.DetailData.FilesList.push(file);
  });
});
// 檔案上傳錯誤函式
uppy.on("error", (error) => {
  console.error("上傳過程中出現錯誤:", error);
});
// 儲存所有內容到後端
function SaveUpLoadData() {
  const FirstTd = props.DetailHeader[0].Key;
  if (!props.DetailData[FirstTd]) {
    Swal.fire({
      icon: "warning",
      text: "請輸入內容",
      confirmButtonText: "確認",
    });
  } else if (Temp.value && props.DetailData.FilesList.length < 1) {
    Swal.fire({
      icon: "warning",
      text: "請先點擊「上傳檔案」按鈕，完成附檔上傳",
      confirmButtonText: "確認",
    });
  } else {
    props.DetailData.Content = editorData.value;
    ApiHelper.Axios(
      props.OperateURL,
      "POST",
      props.DetailData,
      (res) => {
        Swal.fire({
          icon: "success",
          text: `${props.DetailData.ID ? "儲存成功" : "新增成功"}`,
          confirmButtonText: "確認",
        });
        ShowValue.value = false;
        props.GetPageData();
      },
      (err) => {
        ApiHelper.ProcessErrMsg(err);
      }
    );
  }
}

// 文字編輯器相關設定
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Font,
  Alignment,
  AutoLink,
  Link,
  List,
  ListUI,
  Table,
  TableToolbar,
  Indent,
  IndentBlock,
  MediaEmbed,
  SimpleUploadAdapter,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  LinkImage,
  ImageInsert
} from "ckeditor5";
import { Ckeditor } from "@ckeditor/ckeditor5-vue";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import coreTranslations from "ckeditor5/translations/zh.js";
import premiumFeaturesTranslations from "ckeditor5-premium-features/translations/zh.js";
const editor = ClassicEditor;
const editorData = ref(props.DetailData.Content);
const editorConfig = {
  plugins: [
    Bold,
    Essentials,
    Italic,
    Mention,
    Paragraph,
    Undo,
    Font,
    Alignment,
    AutoLink,
    Link,
    List,
    ListUI,
    Table,
    TableToolbar,
    Indent,
    IndentBlock,
    MediaEmbed,
    SimpleUploadAdapter,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    LinkImage,
    ImageInsert
  ],
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "bold",
      "italic",
      "fontSize",
      "fontFamily",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "alignment",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
      "link",
      "insertTable",
      "mediaEmbed",
      "imageInsert",
    ],
    shouldNotGroupWhenFull: false,
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  table: {
    defaultHeadings: { rows: 1, columns: 1 },
  },
  translations: [coreTranslations, premiumFeaturesTranslations],
  mediaEmbed: {
    previewsInData: true,
  },
  simpleUpload: {
    uploadUrl: BaseUrl + 'api/upload/file',
    withCredentials: true,
  },
  image: {
    toolbar: [
      'imageStyle:block',
      'imageStyle:side',
      '|',
      'toggleImageCaption',
      'imageTextAlternative',
      '|',
      'linkImage'
    ],
    insert: {
      type: 'auto',
      integrations: ['upload', 'assetManager', 'url']
    }
  },
};

// 取得處室資料
const OfficeData = ref();
function GetOfficeData() {
  ApiHelper.Axios(
    "api/Office/GetData",
    "GET",
    null,
    (res) => {
      OfficeData.value = res.data;
    },
    (err) => {
      ApiHelper.ProcessErrMsg(err);
    }
  );
}

// 清空資料
function ClearContent() {
  props.DetailHeader.forEach((head) => {
    props.DetailData[head.Key] = "";
  });
  editorData.value = "";
  props.DetailData.FilesList = [];
}
// 返回上一頁
function BackPrePage() {
  ClearContent();
  ShowValue.value = false;
  if (props.GetPageData) {
    props.GetPageData();
  }
}
// 下載檔案
function DownLoadFunction(ID, Name) {
  ApiHelper.FileDownload("api/download/file", "POST", ID, Name);
}
// 刪除附檔
function DeleteFile(index) {
  props.DetailData.FilesList.splice(index, 1);
}
// 頁面標題
function PageTitle() {
  if (props.DetailData.Category) {
    return props.DetailData.Category;
  } else if (props.DetailData.Title) {
    return props.DetailData.Title;
  } else {
    return "新增內容";
  }
}

onMounted(() => {
  GetOfficeData();
});
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <div class="w-full md:w-4/5 flex flex-nowrap justify-center items-center mx-auto my-4 text-black">
      <p class="text-base">{{ PageTitle() }}</p>
      <DotLottieVue style="width: 80px" :src="props.LottieSrc" autoplay loop></DotLottieVue>
    </div>
    <HandPointer :-hidden-size="'md'" -text-content="請左右滑動查看表格">
    </HandPointer>
    <!-- 表格內容 開始 -->
    <v-table class="my-4 rounded-[20px] w-full mx-auto border p-2">
      <tbody class="my-4 mx-0 md:m-4">
        <tr v-for="head in props.DetailHeader">
          <!-- 標題 開始 -->
          <td style="text-align: center; font-weight: 900; padding: 0.5rem"
            class="text-sm md:text-lg border-r w-[60px] md:min-w-[100px]">
            head.Value
          </td>
          <!-- 標題 結束 -->
          <!-- 附檔 開始 -->
          <template v-if="head.Key == 'FilesList'">
            <td v-if="props.Setting" style="text-align: start; padding: 0.5rem" class="text-xs md:text-base">
              <div v-if="props.DetailData.FilesList.length > 0">
                <div v-for="(file, index) in props.DetailData.FilesList" class="flex justify-start items-center">
                  <FontAwesomeIcon :icon="['fas', 'circle-xmark']" @click="DeleteFile(index)">
                  </FontAwesomeIcon>
                  <p class="mx-2">{{ file.name }}</p>
                </div>
              </div>
              <div class="text-start text-sm text-red-500">
                <p class="text-red-500 text-xs mx-2 mb-2 md:text-sm">
                  *請點擊「瀏覽檔案」選擇檔案，或將檔案拖曳至上傳區域。
                </p>
                <p class="text-xs mx-2 mb-2 md:text-sm w-full">
                  *請點擊「上傳檔案」<span class="text-green-500">綠色按鈕</span>，進行檔案上傳。
                </p>
              </div>
              <Dashboard :uppy="uppy" :props="{
                showProgressDetails: true,
                height: 200,
                width: 'auto',
                hideProgressAfterFinish: true,
              }">
              </Dashboard>
            </td>
            <td style="text-align: start; padding: 0.5rem" v-else class="text-xs md:text-base">
              <template v-for="file in props.DetailData.FilesList">
                <p class="cursor-pointer hover:text-[#4E64A6]" @click="DownLoadFunction(file.ID, file.name)">
                  {{ file.name }}
                </p>
              </template>
            </td>
          </template>
          <!-- 附檔 結束 -->
          <!-- 內容 開始 -->
          <template v-else-if="head.Key == 'Content'">
            <td style="
                text-align: start;
                height: 200px;
                padding: 2rem 0.5rem 2rem 0.5rem;
                max-width: 180px;
              " v-if="props.Setting">
              <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" :height="200">
              </ckeditor>
            </td>
            <td style="text-align: start; padding: 0.5rem" class="text-xs md:text-base" v-else>
              <span v-html="props.DetailData[head.Key]"></span>
            </td>
          </template>
          <!-- 內容 結束 -->
          <!-- 分類 開始 -->
          <template v-else-if="head.Key == 'Category'">
            <td style="text-align: start; padding: 0.5rem" class="text-xs md:text-base" v-if="props.Setting">
              <SelectSearch v-model:OptionsList="props.OptionsList" v-model:ModelValue="props.DetailData.Category"
                :-placeholder="'請選擇消息類別'"></SelectSearch>
            </td>
            <td style="text-align: start; padding: 0.5rem" class="text-xs md:text-base" v-else>
              {{ props.DetailData[head.Key] }}
            </td>
          </template>
          <!-- 分類 結束 -->
          <!-- 發布單位 開始 -->
          <template v-else-if="head.Key == 'Create'">
            <td style="text-align: start; padding: 0.5rem" class="text-xs md:text-base"
              v-if="props.Setting && OfficeData">
              <SelectSearch v-model:OptionsList="OfficeData" v-model:ModelValue="props.DetailData.Create"
                :-placeholder="'請選擇發布單位'"></SelectSearch>
            </td>
            <td style="text-align: start; padding: 0.5rem" class="text-xs md:text-base" v-else>
              {{ props.DetailData[head.Key] }}
            </td>
          </template>
          <!-- 發布單位 結束 -->
          <!-- 置頂 開始 -->
          <template v-else-if="head.Key == 'Top'">
            <td style="text-align: start; padding: 0.5rem" v-if="props.Setting"
              class="flex items-center text-xs md:text-base h-auto">
              <span class="me-2">不須置頂</span>
              <v-btn-toggle v-model="props.DetailData.Top"></v-btn-toggle>
              <!-- <FwbToggle v-model="props.DetailData.Top"></FwbToggle> -->
              <span>置頂</span>
            </td>
            <td style="text-align: start; padding: 0.5rem" class="text-xs md:text-base" v-else>
              {{ props.DetailData[head.Key] }}
            </td>
          </template>
          <!-- 置頂 結束 -->
          <!-- 時間 開始 -->
          <template v-else-if="head.Key == 'StartTime' || head.Key == 'EndTime'">
            <td style="text-align: start; padding: 0.5rem" v-if="props.Setting"
              class="flex items-center text-xs md:text-base h-auto">
              <input type="date" v-model="props.DetailData[head.Key]" />
            </td>
            <td style="text-align: start; padding: 0.5rem" class="text-xs md:text-base" v-else>
              {{ props.DetailData[head.Key] }}
            </td>
          </template>
          <!-- 時間 結束 -->
          <!-- 其他內容 開始 -->
          <template v-else>
            <td style="text-align: start; padding: 0.5rem; height: auto" class="text-xs md:text-base flex"
              v-if="props.Setting">
              <textarea name="" id="" v-model="props.DetailData[head.Key]" rows="5"
                class="border rounded text-xs md:text-base w-full mx-auto"></textarea>
            </td>
            <td style="text-align: start; padding: 0.5rem" class="text-xs md:text-base" v-else>
              {{ props.DetailData[head.Key] }}
            </td>
          </template>
          <!-- 其他內容 結束 -->
        </tr>
      </tbody>
    </v-table>
    <!-- 表格內容 結束 -->
    <div class="flex justify-around sm:justify-center">
      <Button :-btn-text="'返回'" :-click-function="BackPrePage"></Button>
      <Button :-btn-text="'清空資料'" :-click-function="ClearContent" v-if="Setting"></Button>
      <Button :-btn-text="'儲存'" :-click-function="SaveUpLoadData" v-if="Setting"></Button>
    </div>
  </div>
</template>
<style>
.ck-content ul,
td ul {
  list-style-type: disc;
  /* 圓點無序列表 */
  padding-left: 25px;
  margin-left: 10px;
}

.ck-content ol,
td ol {
  list-style-type: decimal;
  /* 數字有序列表 */
  padding-left: 25px;
  margin-left: 10px;
}

td th {
  border: 1px solid black;
  padding: 5px;
}
</style>
