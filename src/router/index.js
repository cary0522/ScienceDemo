import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Info from "@/views/Info.vue";
import Announce from "@/views/Announce.vue";
import Competition from "@/views/Competition.vue";
import Fair from "@/views/Fair.vue";
import Celebration from "@/views/Celebration.vue";
import Activity from "@/views/Activity.vue";
import Serve from "@/views/Serve.vue";
import Dp_index from "@/views/Dp_index.vue";
import TrafficSetting from "@/components/Admin/TrafficSetting.vue";


const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { title: "全國科展" },
    },
    {
      path: "/info",
      name: "info",
      component: Info,
      meta: { title: "大會資訊" },
    },
    {
      path: "/info/calendar",
      name: "calendar",
      component: Info,
      meta: { title: "大會行事曆" },
    },
    {
      path: "/info/organization",
      name: "organization",
      component: Info,
      meta: { title: "大會組織" },
    },
    {
      path: "/info/logo",
      name: "logo",
      component: Info,
      meta: { title: "大會標誌" },
    },
    {
      path: "/announce",
      name: "announce",
      component: Announce,
      meta: { title: "大會公告" },
    },
    {
      path: "/announce/latestNews",
      name: "latestNews",
      component: Announce,
      meta: { title: "最新消息" },
    },
    {
      path: "/announce/highlights",
      name: "highlights",
      component: Announce,
      meta: { title: "每日花絮" },
    },
    {
      path: "/announce/moments",
      name: "moments",
      component: Announce,
      meta: { title: "精彩時刻" },
    },
    {
      path: "/announce/video",
      name: "video",
      component: Announce,
      meta: { title: "宣傳影片" },
    },
    {
      path: "/competition",
      name: "competition",
      component: Competition,
      meta: { title: "科展競賽" },
    },
    {
      path: "/competition/schedule",
      name: "schedule",
      component: Competition,
      meta: { title: "日程表" },
    },
    {
      path: "/competition/file",
      name: "file",
      component: Competition,
      meta: { title: "檔案下載區" },
    },
    {
      path: "/competition/excellentInstructor",
      name: "excellentInstructor",
      component: Competition,
      meta: { title: "66 屆優良指導教師" },
    },
    {
      path: "/competition/award",
      name: "award",
      component: Competition,
      meta: { title: "66 屆特別獎" },
    },
    {
      path: "/fair",
      name: "fair",
      component: Fair,
      meta: { title: "科學博覽會" },
    },
    {
      path: "/fair/method",
      name: "method",
      component: Fair,
      meta: { title: "參觀辦法" },
    },
    {
      path: "/fair/stall",
      name: "stall",
      component: Fair,
      meta: { title: "設攤單位" },
    },
    {
      path: "/fair/themePavilion",
      name: "themePavilion",
      component: Fair,
      meta: { title: "主題館介紹" },
    },
    {
      path: "/fair/radioProgramList",
      name: "radioProgramList",
      component: Fair,
      meta: { title: "廣播節目表" },
    },
    {
      path: "/celebration",
      name: "celebration",
      component: Celebration,
      meta: { title: "典禮資訊" },
    },
    {
      path: "/celebration/opening",
      name: "opening",
      component: Celebration,
      meta: { title: "開幕典禮流程" },
    },
    {
      path: "/celebration/awardProcess",
      name: "awardProcess",
      component: Celebration,
      meta: { title: "頒獎典禮流程" },
    },
    {
      path: "/celebration/openingLIVE",
      name: "openingLIVE",
      component: Celebration,
      meta: { title: "開幕典禮LIVE" },
    },
    {
      path: "/celebration/awardLIVE",
      name: "awardLIVE",
      component: Celebration,
      meta: { title: "頒獎典禮LIVE" },
    },
    {
      path: "/activity",
      name: "activity",
      component: Activity,
      meta: { title: "周邊活動" },
    },
    {
      path: "/activity/night",
      name: "night",
      component: Activity,
      meta: { title: "科展之夜" },
    },
    {
      path: "/activity/performanceTeam",
      name: "performanceTeam",
      component: Activity,
      meta: { title: "科展之夜表演團隊介紹" },
    },
    {
      path: "/activity/scienceJourney",
      name: "scienceJourney",
      component: Activity,
      meta: { title: "科學之旅" },
    },
    // {
    //   path: "https://www.beclass.com/rid=284d8e46669157fac748#google_vignette",
    //   name: "registration",
    //   // component: Activity,
    //   meta: { title: "科學之旅報名" },
    // },
    {
      path: "/activity/master",
      name: "master",
      component: Activity,
      meta: { title: "與大師有約" },
    },
    {
      path: "/activity/workshop",
      name: "workshop",
      component: Activity,
      meta: { title: "科學教師交流工作坊" },
    },
    {
      path: "/serve",
      name: "serve",
      component: Serve,
      meta: { title: "服務資訊" },
    },
    {
      path: "/serve/contact",
      name: "contact",
      component: Serve,
      meta: { title: "連絡我們" },
    },
    {
      path: "/serve/accommodation",
      name: "accommodation",
      component: Serve,
      meta: { title: "住宿資訊" },
    },
    {
      path: "/serve/gift",
      name: "gift",
      component: Serve,
      meta: { title: "美食伴手禮" },
    },
    {
      path: "/serve/traffic",
      name: "traffic",
      component: Serve,
      meta: { title: "交通資訊" },
    },
    {
      path: "/serve/traffic/Setting",
      name: "TrafficSetting",
      component: TrafficSetting,
      meta: { title: "交通資訊設定" },
    },
    {
      path: "/serve/parking",
      name: "parking",
      component: Serve,
      meta: { title: "停車場資訊" },
    },
    {
      path: "/serve/trafficFloorPlan",
      name: "trafficFloorPlan",
      component: Serve,
      meta: { title: "周邊交通平面圖" },
    },
    {
      path: "/serve/shuttle",
      name: "shuttle",
      component: Serve,
      meta: { title: "接駁專車" },
    },
    {
      path: "/serve/shuttleMap",
      name: "shuttleMap",
      component: Serve,
      meta: { title: "接駁專車路線圖" },
    },
    {
      path: "/dp_index",
      name: "Dp_index",
      component: Dp_index,
      meta: { title: "後臺首頁" },
    },
  ],
});
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

export default router;
