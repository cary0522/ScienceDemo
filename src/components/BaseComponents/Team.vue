<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps(['Title', 'Content', 'Img']);
</script>
<template>
    <div class="flex w-full m-4">
        <img :src="props.Img" alt="" class="mx-4 rounded">
        <div>
            <p class="text-xl font-black mb-2">{{ props.Title }}</p>
            <p class="text-base me-4 tracking-wide leading-8">{{ props.Content }}</p>
        </div>
    </div>
</template>