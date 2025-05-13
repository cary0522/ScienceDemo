<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import UserPage from "@/components/MasterPageUser.vue";
import LeftOptions from "@/components/BaseComponents/LeftOptions.vue";
import Breadcrumb from '@/components/BaseComponents/Breadcrumb.vue'
import Contact from "@/components/ServePage/Contact.vue";
import Accommodation from "@/components/ServePage/Accommodation.vue";
import Gift from "@/components/ServePage/Gift.vue";
import Traffic from "@/components/ServePage/Traffic.vue";
import Parking from "@/components/ServePage/Parking.vue";
import TrafficFloorPlan from "@/components/ServePage/TrafficFloorPlan.vue";
import Shuttle from "@/components/ServePage/Shuttle.vue";
import ShuttleMap from "@/components/ServePage/ShuttleMap.vue";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import Loading from "@/components/BaseComponents/Loading.vue";
const show = ref(true);
function clickBtn() {
  show.value = !show.value;
}
const LoadingValue = true;

const router = useRouter();

const OptionsList = ref([
  { Value: "連絡我們", Path: "/serve/contact" },
  { Value: "住宿資訊", Path: "/serve/accommodation" },
  { Value: "美食伴手禮", Path: "/serve/gift" },
  { Value: "交通資訊", Path: "/serve/traffic" },
  { Value: "停車場資訊", Path: "/serve/parking" },
  { Value: "周邊交通平面圖", Path: "/serve/trafficFloorPlan" },
  { Value: "接駁專車", Path: "/serve/shuttle" },
  { Value: "接駁專車路線圖", Path: "/serve/shuttleMap" },
]);
</script>

<template>
  <UserPage>
    <div class="flex w-full">
      <LeftOptions :OptionsList="OptionsList" class="w-1/3" />
      <div class="w-full flex flex-wrap">
        <Breadcrumb :BreadcrumbList="['服務資訊', router.currentRoute.value.meta.title]" class="w-full"></Breadcrumb>
        <Contact v-if="router.currentRoute.value.path === '/serve/contact'" />
        <Accommodation v-if="router.currentRoute.value.path === '/serve/accommodation'" />
        <Gift v-if="router.currentRoute.value.path === '/serve/gift'" />
        <Traffic v-if="router.currentRoute.value.path === '/serve/traffic'" />
        <Parking v-if="router.currentRoute.value.path === '/serve/parking'" />
        <TrafficFloorPlan v-if="router.currentRoute.value.path === '/serve/trafficFloorPlan'" />
        <Shuttle v-if="router.currentRoute.value.path === '/serve/shuttle'" />
        <ShuttleMap v-if="router.currentRoute.value.path === '/serve/shuttleMap'" />
      </div>
    </div>
  </UserPage>
  <Loading v-if="LoadingValue" />
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
