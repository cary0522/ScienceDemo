<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UserPage from '@/components/MasterPageUser.vue'
import LeftOptions from '@/components/BaseComponents/LeftOptions.vue'
import Breadcrumb from '@/components/BaseComponents/Breadcrumb.vue'
import Night from '@/components/ActivityPage/Night.vue'
import PerformanceTeam from '@/components/ActivityPage/PerformanceTeam.vue'
import ScienceJourney from '@/components/ActivityPage/ScienceJourney.vue'
import Registration from '@/components/ActivityPage/Registration.vue'
import Master from '@/components/ActivityPage/Master.vue'
import Workshop from '@/components/ActivityPage/Workshop.vue'

const router = useRouter()

const OptionsList = ref([
    { Value: '科展之夜', Path: '/activity/night' },
    { Value: '科展之夜表演團隊介紹', Path: '/activity/performanceTeam' },
    { Value: '科學之旅', Path: '/activity/scienceJourney' },
    { Value: '科學之旅報名', Path: 'https://www.beclass.com/rid=284d8e46669157fac748#google_vignette' },
    { Value: '與大師有約', Path: '/activity/master' },
    { Value: '科學教師交流工作坊', Path: '/activity/workshop' },
])
</script>
<template>
    <UserPage>
        <div class="flex w-full">
            <LeftOptions :OptionsList="OptionsList" class="w-1/3" />
            <div class="w-full flex flex-wrap">
                <Breadcrumb :BreadcrumbList="['周邊活動', router.currentRoute.value.meta.title]" class="w-full">
                </Breadcrumb>
                <Night v-if="router.currentRoute.value.path === '/activity/night'" class="w-full"></Night>
                <PerformanceTeam v-if="router.currentRoute.value.path === '/activity/performanceTeam'" class="w-full">
                </PerformanceTeam>
                <ScienceJourney v-if="router.currentRoute.value.path === '/activity/scienceJourney'" class="w-full">
                </ScienceJourney>
                <Registration v-if="router.currentRoute.value.path === '/activity/registration'" class="w-full">
                </Registration>
                <Master v-if="router.currentRoute.value.path === '/activity/master'" class="w-full"></Master>
                <Workshop v-if="router.currentRoute.value.path === '/activity/workshop'" class="w-full"></Workshop>
            </div>
        </div>
    </UserPage>
</template>