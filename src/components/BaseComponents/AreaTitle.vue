<script setup>
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

const props = defineProps(["titleContent"]);
</script>

<template>
  <div
    class="max-w-full w-fit text-blob text-sm md:text-lg hover:underline underline-offset-8 mx-8 mt-8 mb-4 cursor-pointer">
    <h3>{{ t(`${props.titleContent}`) }}</h3>
  </div>
</template>
