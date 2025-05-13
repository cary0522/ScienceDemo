<script setup>

const props = defineProps(["path"]);

function ExtraLink(path) {
    return /^https?:\/\//.test(path);
}
</script>

<template>
    <a :href="props.path" v-if="ExtraLink(props.path)" target="_blank" rel="noopener noreferrer">
        <slot></slot>
    </a>
    <router-link :to="props.path || ''" v-else>
        <slot></slot>
    </router-link>
</template>