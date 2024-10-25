<template>
    <n-space vertical :size="16">
        <n-data-table :bordered="false" :columns="columns" :data="data" :pagination="pagination" />
    </n-space>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { NButton, NTag, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

interface RowData {
    key: number
    id: number
    name: string
    detail: string
    creator: string
    update_time: string
}

function createColumns({
    viewDetails,
    handleDelete
}: {
    viewDetails: (rowData: RowData) => void,
    handleDelete: (rowData: RowData) => void
}): DataTableColumns<RowData> {
    return [
        {
            title: 'ID',
            key: 'id'
        },
        {
            title: '名称',
            key: 'name'
        },
        {
            title: '描述',
            key: 'detail'
        },
        {
            title: '创建人',
            key: 'creator'
        },
        {
            title: '更新日期',
            key: 'update_time'
        },
        {
            title: '操作',
            key: 'actions',
            render(row) {
                return h('div', [
                    h(
                        NButton,
                        {
                            size: 'small',
                            style: 'margin-right: 8px',
                            onClick: () => viewDetails(row)
                        },
                        { default: () => '查看' }
                    ),
                    h(
                        NButton,
                        {
                            size: 'small',
                            type: 'error',
                            onClick: () => handleDelete(row)
                        },
                        { default: () => '删除' }
                    )
                ])
            }
        }
    ]
}

function createData(): RowData[] {
    return [
        {
            key: 0,
            id: 1,
            name: '业务大屏',
            detail: '用于展示业务相关的大屏',
            creator: 'admin',
            update_time: '2023-01-01 12:00:00'
        },
        {
            key: 0,
            id: 2,
            name: '业务大屏',
            detail: '用于展示业务相关的大屏',
            creator: 'admin',
            update_time: '2023-01-01 12:00:00'
        },

    ]
}

export default defineComponent({
    setup() {
        const message = useMessage()
        return {
            data: createData(),
            columns: createColumns({
                viewDetails(rowData) {
                    message.info(`查看 ${rowData.name}`)
                },
                handleDelete(rowData) {
                    message.info(`删除 ${rowData.name}`)
                }
            }),
            pagination: {
                pageSize: 10
            }
        }
    }
})
</script>