<template>
  <NFlex vertical gap="8px" align="center">
    <!-- <NInput v-model:value="search" placeholder="请输入英文名称进行搜索" clearable /> -->
    <NDataTable :bordered="true" :single-line="false" :scroll-y="700" :data="dataModelFormStore.stepTwo.fieldConf ?? []"
      :columns="columns" />
  </NFlex>
  <!-- <NFlex justify="end">
    <NButton type="primary" @click="saveConfig" class="w-20 my-4 mr-2">保存配置</NButton>
  </NFlex> -->
</template>

<script setup lang="ts">
import { onMounted, h } from "vue";
import { fetchGetTableColumns } from "@/service/api";
import { useDataModelFormStore } from "@/store/modules/model";
import { NSelect, NSwitch } from "naive-ui";

// 获取数据模型表单状态存储内容
const dataModelFormStore = useDataModelFormStore();

// 获取表的字段信息
const fetchColumns = async () => {
  if (!dataModelFormStore.stepOne.database || !dataModelFormStore.stepOne.tableName) {
    return;
  }
  const response = await fetchGetTableColumns({
    database: dataModelFormStore.stepOne.database,
    tableName: dataModelFormStore.stepOne.tableName,
  });
  dataModelFormStore.stepTwo.fieldConf = response.data?.records;

};

// 在组件挂载时获取表的字段信息
onMounted(async () => {
  await fetchColumns();
});

// 定义显示数据的字段
const columns = [
  {
    key: "columnName",
    title: "字段名",
    width: 180,
  },
  {
    key: "columnComment",
    title: "字段描述",
    width: 180,
  },
  {
    key: "columnType",
    title: "字段类型",
    width: 150,
  },
  {
    key: 'semanticType',
    title: '语义类型',
    width: 180,
    render: (row: Api.SystemManage.TableColumns) => h(NSelect, {
      value: row.semanticType,
      options: semanticTypeOptions,
      placeholder: '请选择语义类型',
      clearable: true,
      onUpdateValue: (value) => {
        row.semanticType = value
      }
    })
  },
  {
    key: "extended",
    title: "扩展配置",
    width: 200,
    render: (row: Api.SystemManage.TableColumns) => {
      if (row.semanticType === 'date') {
        return h(NSelect, {
          value: row.dateFormat,
          options: dateFormatOptions,
          placeholder: '请选择日期格式',
          onUpdateValue: (value) => {
            row.dateFormat = value
          }
        })
      }
      else if (row.semanticType === 'metric') {
        return h(NSelect, {
          value: row.staticType,
          options: metricStaticOptions,
          placeholder: '请选择统计方式',
          onUpdateValue: (value) => {
            row.staticType = value
          }
        })
      }
    }
  },
  {
    key: "isTag",
    title: "设为标签",
    width: 200,
    render: (row: Api.SystemManage.TableColumns) => h(NSwitch, {
      checked: row.isTag === '1',
      onUpdateValue: (value: boolean) => {
        row.isTag = value ? '1' : '2'
      },
      // 可选属性
      disabled: false,
    })
  },
];


const semanticTypeOptions = [
  { label: "日期", value: "date" },
  { label: "维度筛选", value: "dimension" },
  { label: "指标统计", value: "metric" },
  { label: "普通字段", value: "normal" },
];

const dateFormatOptions = [
  { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
  { label: "YYYY/MM/DD", value: "YYYY/MM/DD" },
  { label: "YYYY年MM月DD日", value: "YYYY年MM月DD日" },
];

const metricStaticOptions = [
  { label: "平均值", value: "avg" },
  { label: "最大值", value: "max" },
  { label: "最小值", value: "min" },
  { label: "总和", value: "sum" },
  { label: "计数", value: "count" }
]
// 根据搜索条件过滤字段
// const filteredFields = computed(() => {
//   return fields.value.filter((field) => field.name.includes(search.value));
// });

// const saveConfig = async () => {
//   // dataModelFormStore.stepTwo.fieldConf;


// };
</script>
