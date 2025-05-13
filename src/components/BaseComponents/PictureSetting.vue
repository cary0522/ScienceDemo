<script setup>
import { onMounted, ref } from 'vue';
import ApiHelper from '@/helpers/ApiHelper';
import AreaTitle from '../BaseComponents/AreaTitle.vue';
import PictureView from '../BaseComponents/PictureView.vue';
import Swal from 'sweetalert2';

// 適用於只有要傳圖片，不需要夾帶其他訊息時
// 以GetPageDataURL、UpLoadURL判斷更新哪一個圖片

// 接收參數
const props = defineProps(['GetPageDataURL', 'UpLoadURL'])

// 圖片路徑
const PictureSrc = ref()
// 取得資料庫中圖片
function GetPageData() {
    if (props.GetPageDataURL) {
        ApiHelper.Axios(
            props.GetPageDataURL,
            'GET',
            null,
            (res) => {
                PictureSrc.value = res.data.Src
            },
            (err) => {
                ApiHelper.ProcessErrMsg(err)
            },
        )
    }
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
    // 限制
    restrictions: {
        allowedFileTypes: ['image/*', '.jpg', '.jpeg', '.png', '.gif'],
        maxNumberOfFiles: 1
    },
    allowMultipleUploadBatches: false
}).use(XHRUpload, { endpoint: 'http://localhost:3005/api/upload/file' })
// 上傳圖片
const FilesList = ref()
// 預覽圖片
uppy.on('file-added', (res) => {
    const NewSrc = res.data
    const reader = new FileReader();
    reader.onload = function (e) {
        PictureSrc.value = e.target.result
    }
    reader.readAsDataURL(NewSrc)
})
// 點選檔案上傳，取得檔案ID，再一起傳到後端
uppy.on('upload-success', (file, res) => {
    FilesList.value = res.body.FilesList
    ApiHelper.Axios(
        props.UpLoadURL,
        'POST',
        FilesList.value,
        (res) => {
            if (res.status == 200) {
                Swal.fire({
                    icon: 'success',
                    text: '儲存成功',
                    confirmButtonText: '確認'
                })
                FilesList.value = []
                PictureSrc.value = ''
                uppy.cancelAll()
                GetPageData();
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
})
// 檔案上傳錯誤函式
uppy.on('error', (error) => {
    console.error('上傳過程中出現錯誤:', error);
});


onMounted(() => {
    GetPageData()
})
</script>

<template>
    <AreaTitle :title-content="'預覽區'"></AreaTitle>
    <PictureView :-picture-src="PictureSrc"></PictureView>
    <AreaTitle :title-content="'上傳區'"></AreaTitle>
    <div class="text-start mx-8 text-sm text-red-500">
        <p>*請點擊「瀏覽檔案」選擇圖片，或將圖片檔案拖曳至上傳區域。</p>
        <p>*請點擊「上傳１個檔案」<span class="text-green-500">綠色按鈕</span>，進行圖片上傳。</p>
    </div>
    <div class="m-4 justify-center flex">
        <Dashboard :uppy="uppy" :props="{ showProgressDetails: true, height: 200, width: 'auto' }">
        </Dashboard>
    </div>
</template>