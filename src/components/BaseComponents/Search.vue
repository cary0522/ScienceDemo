<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Button from "./Button.vue";

const props = defineProps([
  "PlaceHolder",
  "SearchFunction",
  "ClearFunction",
  "InputType",
]);
const ModelValue = defineModel();
</script>

<template>
  <div class="my-4 mx-auto flex animate__animated animate__fadeInDown animate__slow">
    <v-text-field v-model="ModelValue" :placeholder="props.PlaceHolder" hide-details="true" variant="outlined"
      class="rounded-lg text-xs md:text-base mx-4" color="rgba(0, 0, 0)">
      <template v-slot:append-inner>
        <div class="flex justify-center items-center me-0 ms-auto">
          <Button v-on:click="props.SearchFunction" :-btn-text="'搜尋'">
          </Button>
          <Button v-on:click="props.ClearFunction" :-btn-text="'清除'">
          </Button>
        </div>
      </template>
    </v-text-field>
  </div>
</template>
