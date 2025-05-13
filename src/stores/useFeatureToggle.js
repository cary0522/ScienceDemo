import { defineStore } from "pinia";
import { ref } from "vue";

export const useFeatureToggle = defineStore("FeatureToggle", () => {
  const FeatureData = ref({
    banner: true,
    slider: true,
  });
  return {
    FeatureData,
  };
});
