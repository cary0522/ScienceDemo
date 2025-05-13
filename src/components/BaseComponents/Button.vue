<script setup>
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

//接受參數型別設定
const props = defineProps(['BtnText', 'ClickFunction']);

</script>

<template>
    <div class="text-center">
        <button type="button"
            class="text-white m-1 w-[60px] sm:min-w-[82px] bg-[#4E64A6] hover:bg-[#99B3D1] focus:ring-4 focus:outline-none rounded-lg text-xs sm:text-sm sm:w-auto sm:px-5 py-2.5 text-center"
            v-on:click=ClickFunction>
            {{ t(`${props.BtnText}`) }}
        </button>
    </div>
</template>