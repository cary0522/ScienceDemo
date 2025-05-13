<script setup>
import Button from './Button.vue';
const props = defineProps(['FeaturesList'])
</script>

<template>
    <div class="w-auto max-w-full sm:flex flex-wrap justify-start my-4 mx-8">
        <Button v-for="feature in props.FeaturesList" :-btn-text="feature.title"
            :-click-function="feature.function"></Button>
    </div>
</template>