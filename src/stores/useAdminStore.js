import { defineStore } from "pinia";
import { ref } from "vue";

export const useAdminStore = defineStore("AdminStore", () => {
  const AdminData = ref({
    ID: "",
    Account: "",
    Name: "",
    Identify: "",
    Email: "",
  });
  return {
    AdminData,
  };
});
