<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// 指定現在頁碼
const CurrentPage = defineModel()

// 總共頁數
const props = defineProps(['TotalPage', 'GetPageData'])

function PrevPage() {
    if (CurrentPage.value > 1) {
        CurrentPage.value = CurrentPage.value - 1
        props.GetPageData()
    }

}
function NextPage() {
    if (CurrentPage.value < props.TotalPage) {
        CurrentPage.value = CurrentPage.value + 1
        props.GetPageData()
    }
}
</script>
<template>
    <div class="w-auto max-w-full flex justify-center my-4 mx-auto text-base text-gray-500">
        <v-Pagination v-model="CurrentPage" :length="props.TotalPage" color="black" rounded="circle"
            @update:model-value="props.GetPageData" :total-visible="10">
            <template v-slot:prev>
                <font-awesome-icon :icon="['fas', 'caret-left']" size="3x" @click="PrevPage" />
            </template>
            <template v-slot:next>
                <font-awesome-icon :icon="['fas', 'caret-right']" size="3x" @click="NextPage" />
            </template>
        </v-Pagination>
    </div>

</template>