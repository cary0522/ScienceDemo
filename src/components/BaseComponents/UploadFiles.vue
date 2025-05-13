<script setup>
import { ref, onMounted } from 'vue';
import ApiHelper from '@/helpers/ApiHelper';
import Button from './Button.vue';
import SelectSearch from './SelectSearch.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Swal from 'sweetalert2';
import moment from 'moment';

// 用於有檔案跟其他資訊需要一起上傳時

// 接收資料
const props = defineProps([
    // 表格標題
    'TableHeader',
    // 上傳檔案路由
    'XHRUploadURL',
    // 保存路由
    'OperateURL',
    // 單筆資料詳細內容
    'OperateData',
    // 取得頁面資訊函式
    'GetPageData'])
// 控制頁面開啟關閉
const ModelValue = defineModel()
// 取得處室資料
const OfficeData = ref()
function GetOfficeData() {
    ApiHelper.Axios(
        'api/Office/GetData',
        'GET',
        null,
        (res) => {
            OfficeData.value = res.data
        },
        (err) => {
            ApiHelper.ProcessErrMsg(err)
        },
    )
}

// 上傳套件相關設定
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import zh from '@uppy/locales/lib/zh_TW'
import { Dashboard } from '@uppy/vue';
import '@uppy/dashboard/dist/style.css';
const uppy = new Uppy({
    // 語言
    locale: zh,
}).use(XHRUpload, { endpoint: 'http://localhost:3005/api/upload/file' })

// 點選檔案，暫存檔案
const Temp = ref()
uppy.on('file-added', (res) => {
    Temp.value = res.data
})
// 點選檔案上傳，取得檔案ID
uppy.on('upload-success', (file, res) => {
    res.body.FilesList.forEach((file) => {
        props.OperateData.FilesList.push(file)
    })
})
// 檔案上傳錯誤函式
uppy.on('error', (error) => {
    console.error('上傳過程中出現錯誤:', error);
});
// 儲存所有內容到後端
function SaveUpLoadData(e) {
    const FirstTd = props.TableHeader[0].Key
    if (!props.OperateData[FirstTd]) {
        Swal.fire({
            icon: 'warning',
            text: '請輸入內容',
            confirmButtonText: '確認'
        })
    } else if (Temp.value && props.OperateData.FilesList.length < 1) {
        Swal.fire({
            icon: 'warning',
            text: '請先點擊「上傳檔案」按鈕，完成附檔上傳',
            confirmButtonText: '確認'
        })
    } else {
        ApiHelper.Axios(
            props.OperateURL,
            'POST',
            props.OperateData,
            (res) => {
                if (res.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        text: '儲存成功',
                        confirmButtonText: '確認'
                    })
                    ClearContent()
                    ModelValue.value = false
                } else {
                    Swal.fire({
                        icon: 'warning',
                        text: '上傳有誤，請確認後重新嘗試',
                        confirmButtonText: '確認'
                    })
                }
            },
            (err) => {
                ApiHelper.ProcessErrMsg(err)
            },
        )
    }
}

// 清空資料
function ClearContent() {
    props.TableHeader.forEach((head) => {
        props.OperateData[head.Key] = ''
    })
    props.OperateData.CreateAt = moment(new Date()).format("YYYY-MM-DD")
    props.OperateData.UpdateAt = moment(new Date()).format("YYYY-MM-DD")
    props.OperateData.Create = ''
    props.OperateData.FilesList = []
}
// 返回上一頁
function BackPrePage() {
    ClearContent()
    ModelValue.value = false
    if (props.GetPageData) {
        props.GetPageData()
    }
}
// 刪除附檔
function DeleteFile(index) {
    props.OperateData.FilesList.splice(index, 1)
}

onMounted(() => {
    GetOfficeData()
    // 更新更新日期為當天
    props.OperateData.UpdateAt = moment(new Date()).format("YYYY-MM-DD")
})
</script>

<template>
    <div class="my-4 mx-0 md:m-4">
        <v-table class="w-full md:w-11/12 my-4 md:mx-8 border rounded-[20px] p-2">
            <tbody class="text-xs md:text-base">
                <tr v-for="head in props.TableHeader">
                    <td class="border-r w-[60px] md:min-w-[110px]">{{ head.Value }}</td>
                    <td style="padding:1rem">
                        <input v-model="props.OperateData[head.Key]"
                            class="border rounded text-xs md:text-base w-full mx-auto p-2"></input>
                    </td>
                </tr>
                <tr>
                    <td class="border-r w-[60px] md:min-w-[110px]">
                        發布日期
                    </td>
                    <td style="padding:1rem">
                        <input v-model="props.OperateData.CreateAt" type="date"
                            class="border rounded text-xs md:text-base w-full mx-auto p-2"></input>
                    </td>
                </tr>
                <tr>
                    <td class="border-r w-[60px] md:min-w-[110px]">
                        更新日期
                    </td>
                    <td style="padding:1rem">
                        <input v-model="props.OperateData.UpdateAt" type="date"
                            class="border rounded text-xs md:text-base w-full mx-auto p-2"></input>
                    </td>
                </tr>
                <tr>
                    <td class="border-r w-[60px] md:min-w-[110px]">
                        發布單位
                    </td>
                    <td style="padding:1rem">
                        <SelectSearch v-if="OfficeData" :-placeholder="'請輸入單位名稱進行搜尋'" v-model:OptionsList="OfficeData"
                            v-model:ModelValue="props.OperateData.Create">
                        </SelectSearch>
                    </td>
                </tr>
                <tr>
                    <td class="border-r w-[60px] md:min-w-[110px]">附檔</td>
                    <td style="padding:1rem">
                        <div v-if="props.OperateData.FilesList.length > 0">
                            <div v-for="file, index in props.OperateData.FilesList"
                                class="w-full flex justify-start items-center">
                                <FontAwesomeIcon :icon="['fas', 'circle-xmark']" @click="DeleteFile(index)">
                                </FontAwesomeIcon>
                                <p class="mx-2">{{ file.name }}</p>
                            </div>
                        </div>
                        <p class="text-red-500 text-xs mx-2 mb-2 md:text-sm">*請點擊「瀏覽檔案」選擇檔案，或將檔案拖曳至上傳區域。</p>
                        <p class="text-red-500 text-xs mx-2 mb-2 md:text-sm w-full">*請點擊「上傳檔案」<span
                                class="text-green-500">綠色按鈕</span>，進行檔案上傳。
                        </p>
                        <Dashboard :uppy="uppy" :props="{ showProgressDetails: true, height: 200, width: 'auto' }">
                        </Dashboard>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <div class="flex justify-around sm:justify-center">
            <Button :-btn-text="'返回'" :-click-function="BackPrePage"></Button>
            <Button :-btn-text="'清空資料'" :-click-function="ClearContent"></Button>
            <Button :-btn-text="props.OperateData.ID ? '儲存' : '新增'" :-click-function="SaveUpLoadData"></Button>
        </div>
    </div>


</template>