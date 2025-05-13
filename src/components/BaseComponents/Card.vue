<script setup>
const props = defineProps(["title", "content", "img", "link"]);
</script>
<template>
  <div class=" break-inside-avoid-column border p-4 mb-4 cursor-pointer hover:scale-105 rounded transition-all">
    <p>{{ props.title }}</p>
    <img :src="props.img" alt="" loading="lazy" class="my-2 rounded" />
    <p>{{ props.content }}</p>
  </div>
</template>