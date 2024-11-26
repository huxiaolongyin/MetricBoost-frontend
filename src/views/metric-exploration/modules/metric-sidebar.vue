<template>
    <NFlex vertical class="text-black mt-5 ml-5" size='large'>
        <NFlex justify="space-between">
            <NGrid cols="2">
                <NGi>
                    <NFlex vertical>
                        <div class="font-medium">查询</div>
                        <div class="text-gray">188</div>
                    </NFlex>
                </NGi>
                <NGi>
                    <NFlex vertical>
                        <div class="font-medium">收藏</div>
                        <div class="text-gray">0</div>
                    </NFlex>
                </NGi>
            </NGrid>
        </NFlex>
        <div>
            <div class="font-medium">所有者</div>
            <div class="text-gray">{{ model.createBy }}</div>
        </div>
        <div>
            <div class="font-medium">标签</div>
            <div class="flex items-center flex-wrap">
                <span v-for="tag in model.tags"
                    class="text-gray bg-slate-100 dark:bg-slate-500 px-4px py-1px mr-2 rounded relative inline-flex items-center group">
                    {{ tag }}
                    <span
                        class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        @click="removeTag(tag)">
                        ×
                    </span>
                </span>
                <span class="inline-flex items-center">
                    <NButton quaternary size="tiny"
                        class="text-gray bg-slate-100 dark:bg-slate-500 px-8px py-1px mr-2 rounded">
                        <icon-ic:round-plus class="text-icon" />
                    </NButton>
                </span>
            </div>
        </div>
        <div>
            <div class="font-medium">上次更新时间</div>
            <div class="text-gray">{{ model.updateTime }}</div>
        </div>
    </NFlex>
</template>

<script setup lang="ts">

// 定义组件的名称
defineOptions({
    name: 'MetricSidebar'
})

const model = defineModel<Api.Metric.MetricData>("metricData", { required: true })

const removeTag = (tag: string) => {

}
</script>