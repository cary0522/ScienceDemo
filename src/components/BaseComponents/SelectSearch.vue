<script setup>
import '../../assets/style/Multiselect.css'
import Multiselect from 'vue-multiselect';

const props = defineProps(
    [
        'Placeholder',
        'noResultText',
        'Label',
        'GroupValues',
        'GroupLabel',
        'CustomLabel',
        'MultipleValue',
        'CloseOnSelect',
        'DisableValue'
    ]
)
const OptionsList = defineModel('OptionsList')
const SelectedFunction = defineModel('SelectedFunction')
const ModelValue = defineModel('ModelValue')

</script>
<template>
    <div class="flex my-4 w-full">
        <Multiselect v-model="ModelValue" :options="OptionsList" :placeholder="props.Placeholder" :label="props.Label"
            v-on:select="SelectedFunction" class="w-full" :group-values="GroupValues" :group-label="GroupLabel"
            :group-select="false" :custom-label="props.CustomLabel" :disabled="DisableValue">
            <template #noResult>{{ props.noResultText }}</template>
        </Multiselect>
    </div>

</template>
<style>
.multiselect__single{
    font-size: small;

    @media screen and (min-width:768px) {
        font-size: medium;
    }
}
</style>