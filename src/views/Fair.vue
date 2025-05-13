<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UserPage from '@/components/MasterPageUser.vue'
import LeftOptions from '@/components/BaseComponents/LeftOptions.vue'
import Breadcrumb from '@/components/BaseComponents/Breadcrumb.vue'
import Method from '@/components/FairPage/Method.vue'
import Stall from '@/components/FairPage/Stall.vue'
import ThemePavilion from '@/components/FairPage/ThemePavilion.vue'
import RadioProgramList from '@/components/FairPage/RadioProgramList.vue'

const router = useRouter()

const OptionsList = ref([
    { Value: '參觀辦法', Path: '/fair/method' },
    { Value: '設攤單位', Path: '/fair/stall' },
    { Value: '主題館介紹', Path: '/fair/themePavilion' },
    { Value: '廣播節目表', Path: '/fair/radioProgramList' },
])
</script>
<template>
    <UserPage>
        <div class="flex w-full">
            <LeftOptions :OptionsList="OptionsList" class="w-1/3" />
            <div class="w-full flex flex-wrap">
                <Breadcrumb :BreadcrumbList="['科學博覽會', router.currentRoute.value.meta.title]" class="w-full">
                </Breadcrumb>
                <div class="w-full">
                    <Method v-if="router.currentRoute.value.path === '/fair/method'" />
                    <Stall v-if="router.currentRoute.value.path === '/fair/stall'" />
                    <ThemePavilion v-if="router.currentRoute.value.path === '/fair/themePavilion'" />
                    <RadioProgramList v-if="router.currentRoute.value.path === '/fair/radioProgramList'" />
                </div>
            </div>

        </div>
    </UserPage>
</template>