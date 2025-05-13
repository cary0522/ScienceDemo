<script setup>
const props = defineProps(['Loading'])
</script>

<template>
    <!-- 讀取畫面 開始 -->
    <div class="Loading" v-if="props.Loading">
        <img src="/images/OpenerLoading.gif" alt="" loading="lazy">
        <div class="w-full mb-[40px]">Loading ...</div>
    </div>
    <!-- 讀取畫面 結束 -->
</template>