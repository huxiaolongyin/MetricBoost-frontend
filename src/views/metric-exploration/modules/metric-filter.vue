<template>
    <div class="px-6 mt-2">
        <NCard class="bg-white dark:bg-slate-700 rounded-xl">
            <NForm class="mt-3">
                <NFormItem label="日期区间：" label-placement="left" class="w-3/12">
                    <NDatePicker v-model:value="formData.dateRange" type="daterange" clearable />
                </NFormItem>
                <NFormItem label="维度下钻：" label-placement="left" class="w-3/12">
                    <NSelect v-model:value="formData.dimensionDrillDown" :options="metricData?.dimensions" clearable />
                </NFormItem>
                <NFormItem label="维度筛选：" label-placement="left">
                    <NFlex :size="5" class="w-full">
                        <NSelect v-model:value="searchParams.dimensionFilter" class="w-2/12" clearable
                            @update:value="handleUpdate" :options="metricData?.dimensions" />
                        <NSelect v-model:value="searchParams.check" class="w-1/12" clearable :options="FilterOptions" />
                        <NSelect v-model:value="searchParams.conditions" class="w-2/12" filterable clearable
                            :multiple="searchParams.check === 'in'" :options="conditionOptions" />
                        <NButton class="bg-sky-700 text-white" @click="handleClick">
                            <Icon icon="material-symbols:search" class="mr-2" />查询
                        </NButton>
                    </NFlex>
                </NFormItem>
            </NForm>
        </NCard>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { SelectOption } from 'naive-ui';
import { watch, ref } from 'vue';

// 定义组件的名称
defineOptions({
    name: 'MetricFilter'
})

// 双向绑定数据
const metricData = defineModel<Api.Metric.MetricData>("metricData", { required: true })
const formData = defineModel<Api.Metric.MetricSearchParams>("searchParams", { required: true })

// 添加维度筛选options
const FilterOptions: SelectOption[] = ([
    { label: "=", value: "=" },
    { label: "IN", value: "in" }]
)

// 添加维度筛选框
const conditionOptions = ref<SelectOption[]>([])

// 设置上传提交事件
const emit = defineEmits<{ (e: "submit"): void, (e: "update"): void }>();

const handleClick = () => {
    emit("submit");
}

const handleUpdate = () => {
    emit("update");
}

watch(() => formData.value.dimensionFilter, () => {
    // 如果维度筛选框有值，则设置条件选项，没有值，则清空条件选项
    if (formData.value.dimensionFilter) {
        conditionOptions.value = metricData.value?.dimensions.filter(item => item.value === formData.value.dimensionFilter)[0].options
    }
    else {
        conditionOptions.value = []
        formData.value.conditions = null
    }
})
</script>