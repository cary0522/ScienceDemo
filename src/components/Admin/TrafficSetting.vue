<script setup>
import { ref, reactive } from "vue";
import MasterPageAdmin from "@/components/MasterPageAdmin.vue";
import Button from "../BaseComponents/Button.vue";
import AreaTitle from "../BaseComponents/AreaTitle.vue";
import Breadcrumb from "../BaseComponents/Breadcrumb.vue";

const BaseUrl = import.meta.env.VITE_BASE_URL;

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
const editorData = ref('');
const editorConfig = {
  licenseKey: 'GPL',
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
    },
  },
};
</script>

<template>
  <MasterPageAdmin>
    <Breadcrumb :BreadcrumbList="['後台', '交通資訊']" class="mx-8 w-full"></Breadcrumb>
    <div class="flex justify-start">
      <div class="w-2/5 p-4">
        <AreaTitle :titleContent="'編輯'"></AreaTitle>
        <div class="w-4/5 min-h-[300px] h-auto mx-8">
          <ckeditor v-model="editorData" :editor="editor" :height="300" :config="editorConfig">
          </ckeditor>
        </div>
      </div>
      <div class="w-2/5 p-4">
        <AreaTitle :titleContent="'預覽'"></AreaTitle>
        <div class="w-4/5 mx-8 " v-html="editorData">
        </div>
      </div>
    </div>
    <button @click="()=>{console.log(editorData)}">ok</button>
  </MasterPageAdmin>
</template>