<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UserPage from '@/components/MasterPageUser.vue'
import LeftOptions from '@/components/BaseComponents/LeftOptions.vue'
import Breadcrumb from '@/components/BaseComponents/Breadcrumb.vue'
import Schedule from '@/components/CompetitionPage/Schedule.vue'
import File from '@/components/CompetitionPage/File.vue'
import ExcellentInstructor from '@/components/CompetitionPage/ExcellentInstructor.vue'
import Award from '@/components/CompetitionPage/Award.vue'

const router = useRouter()

const OptionsList = ref([
    { Value: '日程表', Path: '/competition/schedule' },
    { Value: '檔案下載區', Path: '/competition/file' },
    { Value: '66 屆優良指導教師', Path: '/competition/excellentInstructor' },
    { Value: '66 屆特別獎', Path: '/competition/award' },
])
</script>
<template>
    <UserPage>
        <div class="flex w-full">
            <LeftOptions :OptionsList="OptionsList" class="w-1/3" />
            <div class="w-full flex flex-wrap">
                <Breadcrumb :BreadcrumbList="['科展競賽', router.currentRoute.value.meta.title]" class="w-full">
                </Breadcrumb>
                <Schedule v-if="router.currentRoute.value.path === '/competition/schedule'" />
                <File v-if="router.currentRoute.value.path === '/competition/file'" />
                <ExcellentInstructor v-if="router.currentRoute.value.path === '/competition/excellentInstructor'" />
                <Award v-if="router.currentRoute.value.path === '/competition/award'" />
            </div>
        </div>
    </UserPage>
</template>