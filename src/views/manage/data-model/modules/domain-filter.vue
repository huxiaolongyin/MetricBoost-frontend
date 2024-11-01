<script setup lang="ts">

import { ref } from 'vue'
import { repeat } from 'seemly'
import type { TreeOption } from 'naive-ui'
import { fetchGetTopicDomainList, fetchGetDataDomainList } from '@/service/api'
defineOptions({
    name: 'DomainFilter'
});


const createTreeData = async (): Promise<TreeOption[]> => {
    // 获取数据域数据
    const { data: dataDomainData } = await fetchGetDataDomainList()
    // 获取主题域数据

    const { data: topicDomainData } = await fetchGetTopicDomainList()

    return [
        {
            label: '数据域',
            key: 'datadomain',
            children: dataDomainData?.records?.map(item => ({
                label: item.dataDomainName,
                key: `data_${item.id}`,
                children: []
            })) || []
        },
        {
            label: '主题域',
            key: 'topicdomain',
            children: topicDomainData?.records?.map(item => ({
                label: item.topicDomainName,
                key: `topic_${item.id}`,
                children: []
            })) || []
        }
    ]
}
const treeData = await createTreeData()

const updateCheckedKeys = (
    keys: Array<string | number>,
    options: Array<TreeOption | null>,
    meta: {
        node: TreeOption | null
        action: 'check' | 'uncheck'
    }
) => {
    console.log('updateCheckedKeys', keys, options, meta)
}

</script>
<template>
    <NTree block-line cascade checkable :selectable="false" :data="treeData" @update:checked-keys="updateCheckedKeys" />
</template>