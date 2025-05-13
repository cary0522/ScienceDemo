<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UserPage from '@/components/MasterPageUser.vue'
import LeftOptions from '@/components/BaseComponents/LeftOptions.vue'
import Breadcrumb from '@/components/BaseComponents/Breadcrumb.vue'
import Search from '@/components/BaseComponents/Search.vue'
import Calendar from '@/components/InfoPage/Calendar.vue'
import Organization from '@/components/InfoPage/Organization.vue'
import Logo from '@/components/InfoPage/Logo.vue'

const router = useRouter()

const OptionsList = ref([
    { Value: '大會行事曆', Path: '/info/calendar' },
    { Value: '大會組織', Path: '/info/organization' },
    { Value: '大會標誌', Path: '/info/logo' },
])
</script>
<template>
    <div>
        <UserPage>
            <div class="flex w-full">
                <LeftOptions :OptionsList="OptionsList" class="w-1/3" />
                <div class="w-full flex flex-wrap">
                    <Breadcrumb :BreadcrumbList="['大會資訊', router.currentRoute.value.meta.title]" class="w-full">
                    </Breadcrumb>
                    <Calendar v-if="router.currentRoute.value.path === '/info/calendar'" />
                    <Organization v-if="router.currentRoute.value.path === '/info/organization'" />
                    <Logo v-if="router.currentRoute.value.path === '/info/logo'" />
                </div>
            </div>
        </UserPage>
    </div>
</template>