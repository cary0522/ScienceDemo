<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
<template>
    <div class="w-full my-4 ms-8">
        <p class="text-lg">{{ t('footer.科展諮詢服務專線') }}：06-2050271</p>
        <p class="text-lg">{{ t('行政規畫組') }}-{{ t('崇明國小') }}-{{ t('分機') }}2001</p>
        <p class="text-lg">{{ t('競賽活動組') }}-{{ t('建興國中') }}-{{ t('分機') }}2011</p>
        <p class="text-lg">{{ t('展覽科教組') }}-{{ t('土城高中') }}-{{ t('分機') }}2021</p>
        <p class="text-lg">{{ t('典禮服務組') }}-{{ t('億載國小') }}-{{ t('分機') }}2031</p>
        <p class="text-lg">{{ t('典禮服務組') }}-{{ t('三慈國小(開閉幕典禮)') }}-2032</p>
        <p class="text-lg">{{ t('典禮服務組') }}-{{ t('歸仁國中(科展之夜)') }}-2033</p>
        <p class="text-lg">{{ t('典禮服務組') }}-{{ t('仁德國中(交通接駁)') }}-2034</p>
        <p class="text-lg">{{ t('傳真專線') }}：06-2900553</p>
    </div>
</template>