<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UserPage from '@/components/MasterPageUser.vue'
import LeftOptions from '@/components/BaseComponents/LeftOptions.vue'
import Breadcrumb from '@/components/BaseComponents/Breadcrumb.vue'
import Opening from '@/components/CelebrationPage/Opening.vue'
import AwardProcess from '@/components/CelebrationPage/AwardProcess.vue'
import OpeningLIVE from '@/components/CelebrationPage/OpeningLIVE.vue'
import AwardLIVE from '@/components/CelebrationPage/AwardLIVE.vue'

const router = useRouter()

const OptionsList = ref([
    { Value: '開幕典禮流程', Path: '/celebration/opening' },
    { Value: '頒獎典禮流程', Path: '/celebration/awardProcess' },
    { Value: '開幕典禮LIVE', Path: '/celebration/openingLIVE' },
    { Value: '頒獎典禮LIVE', Path: '/celebration/awardLIVE' },
])
</script>
<template>
    <UserPage>
        <div class="flex w-full">
            <LeftOptions :OptionsList="OptionsList" class="w-1/3" />
            <div class="flex flex-wrap w-full">
                <Breadcrumb :BreadcrumbList="['典禮資訊', router.currentRoute.value.meta.title]" class="w-full">
                </Breadcrumb>
                <Opening v-if="router.currentRoute.value.path === '/celebration/opening'" />
                <AwardProcess v-if="router.currentRoute.value.path === '/celebration/awardProcess'" />
                <OpeningLIVE v-if="router.currentRoute.value.path === '/celebration/openingLIVE'" />
                <AwardLIVE v-if="router.currentRoute.value.path === '/celebration/awardLIVE'" />
            </div>
        </div>
    </UserPage>
</template>