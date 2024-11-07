<template>
    <NTree block-line cascade checkable :selectable="false" :data="filterTreeData"
        @update:checked-keys="updateCheckedKeys" :render-label="renderLabel" />
</template>

<script setup lang="tsx">
import type { TreeOption } from 'naive-ui'
import { fetchGetTopicDomainList, fetchGetDataDomainList } from '@/service/api'
import { ref, onMounted, h } from 'vue'
import { NButton, NFlex } from 'naive-ui'
import { Icon } from '@iconify/vue';

defineOptions({
    name: 'DomainFilter'
});

const emit = defineEmits<{
    (e: 'search'): void;
}>()

// 和父组件双向绑定模型
const model = defineModel<Api.SystemManage.DataModelSearchParams>('model', { required: true });

// 获取筛选树的数据
const filterTreeData = ref<TreeOption[]>([])

const createTreeData = async (): Promise<TreeOption[]> => {
    // 获取数据域数据
    const { data: dataDomainData } = await fetchGetDataDomainList()

    // 获取主题域数据
    const { data: topicDomainData } = await fetchGetTopicDomainList()

    return [
        {
            label: '数据域',
            key: 'dataDomain',
            children: dataDomainData?.records?.map(item => ({
                label: item.dataDomainName,
                key: `data_${item.id}`,
                domainType: 'dataDomain',
                value: item.id,
            })) || []
        },
        {
            label: '主题域',
            key: 'topicDomain',
            children: topicDomainData?.records?.map(item => ({
                label: item.topicDomainName,
                domainType: 'topicDomain',
                key: `topic_${item.id}`,
                value: item.id
            })) || []
        }
    ]
}

// 增加类的删除和增加按钮
const renderLabel = (node: any) => {
    console.log(node.option.label)
    return (
        <NFlex justify="space-between">
            <div>{node.option.label}</div>
            {!node.option.domainType && (
                <NButton size='tiny' onClick={() => handleAdd(node.option.key)} quaternary>
                    <Icon icon="mdi:plus" width={16} height={16} class='text-slate-600' />
                </NButton>
            )}
            {node.option.domainType && (
                <NButton size='tiny' onClick={() => handleDelete(node.option.domainType, node.option.value)} quaternary>
                    <Icon icon="mdi:minus" width={16} height={16} class='text-slate-600' />
                </NButton>
            )}
        </NFlex>
    )
}


const handleAdd = (key: any) => {
    // 处理增加逻辑
    console.log(key)

    // 
}

const handleDelete = (domainType: string, value: string) => {
    // 处理删除逻辑
    console.log(key)
}

// 在组件加载后，更新筛选树的数据
onMounted(async () => {
    try {
        filterTreeData.value = await createTreeData()
    }
    catch (e: any) {
        window.$message?.error(e);
    }
}
)

const updateCheckedKeys = (
    keys: Array<string | number>,
    options: Array<TreeOption | null>,
    meta: {
        node: TreeOption | null
        action: 'check' | 'uncheck'
    }
) => {
    model.value.dataDomainList = []
    model.value.topicDomainList = []
    options.forEach(option => {


        if (!option) return
        if (option.domainType === 'dataDomain' && option.value != null) {
            model.value.dataDomainList?.push(option.value as number)
        }
        else if (option.domainType === 'topicDomain' && option.value != null) {
            model.value.topicDomainList?.push(option.value as number)
        }

    }
    )
    emit('search')
}

</script>
