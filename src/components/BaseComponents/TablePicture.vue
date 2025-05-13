<script setup>
import Button from '../BaseComponents/Button.vue';
import ApiHelper from '@/helpers/ApiHelper';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';

// 用於有圖片、其他內容需要一起上傳時

// 接收資料
const props = defineProps(['TableHeader', 'XHRUploadURL', 'OperateURL', 'OperateData', 'GetPageData'])
// 控制視窗開關
const ModelValue = defineModel()
// 暫存預覽圖片
const PictureSrc = ref('')

// 上傳套件相關設定
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import zh from '@uppy/locales/lib/zh_TW'
import { Dashboard } from '@uppy/vue';
import '@uppy/dashboard/dist/style.css';
const uppy = new Uppy({
    // 語言
    locale: zh,
    // 限制
    restrictions: {
        allowedFileTypes: ['image/*', '.jpg', '.jpeg', '.png', '.gif'],
        maxNumberOfFiles: 1
    },
    allowMultipleUploadBatches: false
}).use(XHRUpload, { endpoint: 'http://localhost:3005/api/upload/file' })
// 預覽圖片
uppy.on('file-added', (res) => {
    const NewSrc = res.data
    const reader = new FileReader();
    reader.onload = function (e) {
        PictureSrc.value = e.target.result
    }
    reader.readAsDataURL(NewSrc)
})
// 點選檔案上傳，取得檔案ID
uppy.on('upload-success', (file, res) => {
    props.OperateData.FilesList = res.body.FilesList
})
// 點選確定新增，所有資料一起存到後端
function SavePageData() {
    const FirstTd = props.TableHeader[0].Key
    if (!props.OperateData[FirstTd]) {
        Swal.fire({
            icon: 'warning',
            text: '請輸入內容',
            confirmButtonText: '確認'
        })
    } else if (PictureSrc.value && props.OperateData.FilesList.length < 1) {
        Swal.fire({
            icon: 'warning',
            text: '請先點擊「上傳檔案」，再點擊確定新增',
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
                    }).then((res) => {
                        if (res.isConfirmed) {
                            props.TableHeader.forEach((head) => {
                                props.OperateData[head.Key] = ''
                            })
                            props.OperateData.FilesList = []
                            PictureSrc.value = ''
                            ModelValue.value = false
                        }
                    })
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
// 檔案上傳錯誤函式
uppy.on('error', (error) => {
    console.error('上傳過程中出現錯誤:', error);
});
// 清空資料
function ClearContent() {
    props.TableHeader.forEach((head) => {
        props.OperateData[head.Key] = ''
    })
    props.OperateData.FilesList = []
    PictureSrc.value = ''
}
function BackPrePage() {
    ClearContent()
    ModelValue.value = false
    if (props.GetPageData) {
        props.GetPageData()
    }
}

onMounted(() => {
    if (props.OperateData.Img) {
        PictureSrc.value = props.OperateData.Img
    }
})
</script>

<template>
    <div class="my-4 mx-auto md:m-4">
        <!-- 上傳圖片 開始 -->
        <div class="md:flex justify-around xl:justify-start">
            <div class="mx-4 px-4 md:w-1/4 xl:w-1/5 text-center text-sm text-red-500 border-red-300">
                <p>上傳圖片預覽</p>
                <div
                    class="mx-auto w-[170px] lg:w-[200px] my-4 h-[200px] border-2 border-gray-300 border-dashed flex items-center rounded">
                    <img loading="lazy" :src="PictureSrc" alt="" class="rounded-full object-contain max-w-full">
                </div>
            </div>
            <div class="md:w-1/2 lg:w-2/3 2xl:w-1/3 flex flex-wrap">
                <div class="text-start text-sm text-red-500 lg:px-8 xl:px-2 w-full">
                    <p>*請點擊「瀏覽檔案」選擇圖片，或將圖片檔案拖曳至上傳區域。</p>
                    <p>*請點擊「上傳１個檔案」<span class="text-green-500">綠色按鈕</span>，進行圖片上傳。</p>
                </div>
                <div class="my-4 mx-auto">
                    <Dashboard :uppy="uppy" :props="{ showProgressDetails: true, height: 200, width: 'auto' }">
                    </Dashboard>
                </div>
            </div>
        </div>
        <!-- 上傳圖片 結束 -->
        <!-- 表格 開始 -->
        <v-table class="my-4 mx-0 md:m-8 overflow-x-auto border p-2 rounded-[20px]">
            <tbody>
                <tr v-for="head in props.TableHeader">
                    <td style="text-align: center;font-weight: 900;padding:.5rem;"
                        class="text-sm md:text-lg border-r w-[60px] md:min-w-[100px]">{{
                            head.Value }}</td>
                    <td style="text-align: start;padding:.5rem;height:auto" class="text-xs md:text-base flex">
                        <textarea v-model="props.OperateData[head.Key]" rows="5"
                            class="border rounded text-xs md:text-base w-full mx-auto"></textarea>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <!-- 表格 結束 -->
        <div class="flex justify-around sm:justify-center">
            <Button :-btn-text="'返回'" :-click-function="BackPrePage"></Button>
            <Button :-btn-text="'清空'" :-click-function="ClearContent"></Button>
            <Button :-btn-text="props.OperateData.ID ? '保存' : '新增'" :-click-function="SavePageData"></Button>
        </div>
    </div>
</template>