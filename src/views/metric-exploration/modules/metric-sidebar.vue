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
                    <NPopconfirm @positive-click="handleRemoveTag(tag)" positive-text="确定" negative-text="取消">
                        <template #trigger>
                            <span
                                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                ×
                            </span>
                        </template>
                        确定要删除这个标签吗？
                    </NPopconfirm>
                </span>
                <span class="inline-flex items-center">
                    <NDropdown placement="bottom-start" trigger="click" size="small" :options="tagOptions"
                        @select="handleAddTag">
                        <NButton quaternary size="tiny"
                            class="text-gray bg-slate-100 dark:bg-slate-500 px-8px py-1px mr-2 rounded">
                            <icon-ic:round-plus class="text-icon" />
                        </NButton>
                    </NDropdown>
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
import { useLoadOptions } from '@/hooks/common/option'
import { fetchTag, fetchAddMetricTag, fetchDeleteMetricTag } from "@/service/api"
import { onMounted, watch } from 'vue'
import { useAuthStore } from '@/store/modules/auth';

// 定义组件的名称
defineOptions({
    name: 'MetricSidebar'
})

// 获取用户信息
const authStore = useAuthStore();

const model = defineModel<Api.Metric.MetricData>("metricData", { required: true })

const handleRemoveTag = async (tag: string) => {
    fetchDeleteMetricTag({
        metricId: model.value.id,
        tag: tag,
    })
    // 删除标签
    model.value.tags = model.value.tags.filter(t => t !== tag)
    await fetchTagOptions()
    // 执行过滤操作
    filterOptions()
}

// 添加指标标签
const handleAddTag = async (key: string) => {
    fetchAddMetricTag({
        metricId: model.value.id,
        tagId: key,
        createBy: authStore.userInfo.userName
    })
    // 添加标签
    model.value.tags.push(tagOptions.value.filter(item => item.key === key)[0].label as string)
    await fetchTagOptions()
    // 执行过滤操作
    filterOptions()
}


// 当选中数据库时加载表列表
const {
    options: tagOptions,
    loading: tagLoading,
    fetchOptions: fetchTagOptions
} = useLoadOptions(
    () => fetchTag(),
    'tagName',
    'id')
const filterOptions = () => {
    // 执行过滤操作
    tagOptions.value = tagOptions.value.filter(
        item => !model.value.tags.includes(item.label as string)
    )
    // 将 tagOptions 中的 value 属性重命名为 key
    tagOptions.value = tagOptions.value.map(item => ({
        label: item.label,
        key: item.value
    }))
}
const asyncTagOptions = async () => {

}
onMounted(async () => {
    await Promise.all([
        fetchTagOptions(),
        new Promise(resolve => {
            watch(() => model.value.tags, (newTags) => {
                if (newTags) {
                    resolve(newTags)
                }
            }, { immediate: true })
        })
    ])

    filterOptions()
})

</script>