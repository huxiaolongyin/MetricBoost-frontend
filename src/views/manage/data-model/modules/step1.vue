<script setup lang="ts">
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { ref } from 'vue';
import type { SelectOption, DataTableColumns } from 'naive-ui'
import { fetchGetDatabaseList, fetchGetTableList, fetchDataPreview } from '@/service/api';
import { useTable, useTableOperate } from '@/hooks/common/table';

// 类型定义
interface FormDataType {
    databaseId: number | null
    tableName: string | null
}


interface Props {
    databaseId?: number
    tableName?: string
}

// props 和 emits 定义
const props = defineProps<Props>();
const emit = defineEmits<{
    'next': [value: FormDataType],
    'database-change': [value: number],
}>()

// 定义表单参数
const formData = ref<FormDataType>({
    databaseId: props.databaseId ?? null,
    tableName: props.tableName ?? null
})


// 表单验证
const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();
const rules: Record<keyof FormDataType, App.Global.FormRule> = {
    databaseId: defaultRequiredRule,
    tableName: defaultRequiredRule
}


// 加载数据库和数据表的选项
const databaseOptions = ref<SelectOption[] | undefined>([]);
const tableOptions = ref<SelectOption[] | undefined>([]);
const isDatabaseLoading = ref(false)
const isTableLoading = ref(false)

const loadDatabaseOptions = async () => {
    isDatabaseLoading.value = true
    try {
        const { data } = await fetchGetDatabaseList()
        databaseOptions.value = data?.records.map((item) => ({
            label: item.databaseName,
            value: item.id
        })) || []
    } finally {
        isDatabaseLoading.value = false
    }
}

loadDatabaseOptions()

const loadTableOptions = async (databaseId: number) => {
    isTableLoading.value = true
    try {
        const { data } = await fetchGetTableList({ databaseId })
        tableOptions.value = data?.records.map((item: any) => ({
            label: `${item.TABLE_NAME}(${item.TABLE_COMMENT})`,
            value: item.TABLE_NAME
        })) || []
    }
    catch (error) {
        tableOptions.value = []
    }
    finally {
        isTableLoading.value = false
    }
}

// 数据预览
const previewData = ref<Api.SystemManage.DataPreview[]>([])
const columns = ref<DataTableColumns>([])
const isDataLoading = ref(false)

const handlePreview = async () => {
    isDataLoading.value = true
    try {
        const responseData = await fetchDataPreview({
            databaseId: formData.value.databaseId,
            tableName: formData.value.tableName
        })

        columns.value = (responseData as any).response.data.columns?.map((item: any) => ({
            title: `${item.COLUMN_NAME}(${item.COLUMN_COMMENT})`,
            key: item.COLUMN_NAME
        })) || []
        previewData.value = responseData.data?.records || []
    }
    catch (error) {
        console.log(error)
    }
    finally {
        isDataLoading.value = false
    }
}
// const columnsData = ref<DataTableColumns>([])

// const getColumns = async () => {
//     const responseData = await fetchDataPreview({
//         databaseId: formData.value.databaseId,
//         tableName: formData.value.tableName
//     })
//     return (responseData as any).response.data.columns?.map((item: any) => ({
//         title: `${item.COLUMN_NAME}(${item.COLUMN_COMMENT})`,
//         key: item.COLUMN_NAME
//     })) || []
// }
// columnsData.value = await getColumns()

// const previewData = ref<Api.SystemManage.DataPreview[]>([])
// const columns = ref<DataTableColumns>([])
// const isDataLoading = ref(false)
// const columnChecks = ref<string[]>([])
// const getData = ref<Api.SystemManage.DataPreview[]>([])
// const mobilePagination = ref(null)
// const searchParams = ref<Api.SystemManage.DataPreviewSearchParams>({
//     databaseId: null,
//     tableName: null})
// const resetSearchParams = () => {
//     searchParams.value = {
//         databaseId: null,
//         tableName: null
//     })
// const handlePreview = () => {
//      const result = useTable({
//         apiFn: fetchDataPreview,
//         apiParams: {
//             current: 1,
//             size: 10,
//             // 如果要在Form中使用searchParams，则需要定义以下属性，且值为null
//             // 该值不能为undefined，否则Form中的属性将不会反应
//             databaseId: null,
//             tableName: null
//         },
//         columns: () => columnsData.value
//     })
//     columns.value = result.columns
    
// }

</script>

<template>
    <NForm ref="formRef" :rules="rules" :model="formData">
        <NFormItem :label="$t('page.manage.dataModel.databaseSelect')" path="databaseId">
            <NSelect v-model:value="formData.databaseId" :placeholder="$t('page.manage.dataModel.form.databaseSelect')"
                :options="databaseOptions" :loading="isDatabaseLoading"
                @update:value="loadTableOptions(formData.databaseId as number)" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.dataModel.tableName')" path="tableName">
            <NSelect v-model:value="formData.tableName" :placeholder="$t('page.manage.dataModel.form.tableName')"
                :options="tableOptions" :loading="isTableLoading" />
        </NFormItem>
        <NFlex justify="end">
            <NButton type="primary" class="mr-5" @click="handlePreview"> 预 览 </NButton>
        </NFlex>
        <NFormItem :label="$t('page.manage.dataModel.dataPreview')">
            <NDataTable :columns="columns" :data="previewData" size="small" :loading="isDataLoading"
                class="sm:h-full" />
        </NFormItem>
    </NForm>
</template>