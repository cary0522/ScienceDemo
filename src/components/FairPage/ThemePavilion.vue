<script setup>
import Team from "../BaseComponents/Team.vue";
import ApiHelper from "@/helpers/ApiHelper";
import { ref, onMounted } from "vue";
import MomentJson from "@/assets/json/Moment.json";


const TeamData = ref([]);

function GetPageData() {
    TeamData.value = MomentJson;
    // ApiHelper.Axios(
    //     "api/announce/Teams",
    //     "GET",
    //     null,
    //     (res) => {
    //         TeamData.value = res.data;
    //     },
    //     (err) => {
    //         ApiHelper.ProcessErrMsg(err);
    //     }
    // );
}

onMounted(() => {
    GetPageData();
});
</script>
<template>
    <div v-for="team in TeamData" class="flex flex-wrap w-full">
        <Team :Title="team.title" :Content="team.content" :Img="team.img"></Team>
    </div>
</template>