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
            <div class="text-gray">admin</div>
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
console.log(model)
</script>