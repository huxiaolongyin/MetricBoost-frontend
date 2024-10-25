<template>
  <div>
    <div class="flex justify-end space-x-2 mb-4">
      <NButton class="bg-red-500 text-white" @click="handleDelete">删除</NButton>
      <NButton class="bg-blue-500 text-white" @click="handleEdit">编辑</NButton>
    </div>
    <NCard :bordered="true" class="bg-white dark:bg-slate-700">
      <NForm ref="form" :model="formModel" :rules="rules" label-width="80" class="" labelAlign="left">
        <div class=" text-dark dark:text-white font-sans text-lg font-semibold mb-6">指标信息</div>
        <NGrid cols="s:1 m:2 l:4" responsive="screen" :x-gap="16" :y-gap="16" class="">
          <NGi v-for="field in formFields1">
            <NFormItem :key="field.key" :label="field.label" :path="field.key">
              <component :is="field.component" v-model:value="formModel[field.key]" v-bind="field.props"
                :placeholder="field.placeholder" />
            </NFormItem>
          </NGi>
        </NGrid>
        <div class=" text-dark dark:text-white font-sans text-lg font-semibold mb-6">计算方式</div>
        <NGrid cols="s:1 m:2 l:4" responsive="screen" :x-gap="16" :y-gap="16" class="">
          <NGi v-for="field in formFields2">
            <NFormItem :key="field.key" :label="field.label" :path="field.key">
              <component :is="field.component" v-model:value="formModel[field.key]" v-bind="field.props"
                :placeholder="field.placeholder" />
            </NFormItem>
          </NGi>
        </NGrid>
        <div class=" text-dark dark:text-white font-sans text-lg font-semibold mb-6">图表展示</div>
        <NGrid cols="s:1 m:2 l:4" responsive="screen" :x-gap="16" :y-gap="16" class="">
          <NGi v-for="field in formFields3">
            <NFormItem :key="field.key" :label="field.label" :path="field.key" cla>
              <component :is="field.component" v-model:value="formModel[field.key]" v-bind="field.props"
                :placeholder="field.placeholder" />
            </NFormItem>
          </NGi>
        </NGrid>
        <NFormItem class="flex justify-end space-x-2">
          <NButton @click="submitForm" class="px-6">提交</NButton>
        </NFormItem>
      </NForm>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { NForm, NFormItem, NInput, NSelect, NButton } from 'naive-ui';
import { fetchCardData } from "@/data/cardData";
import { MetricData } from "@/typings/metrics";
// const formModel = ref < MetricData > (null); // 初始值为 null 表示未加载数据

// const formModel = ref({
//   chineseName: '',
//   englishName: '',
//   alias: '',
//   sensitivity: '',
//   modelType: '',
//   businessScope: ''
// });
const formModel = ref<Partial<MetricData>>({
  chineseName: '',
  englishName: '',
  alias: '',
  sensitivity: '',
  dataModel: '',
  businessScope: ''
});


import { useRoute } from 'vue-router';
const route = useRoute();

// 使用 watchEffect 获取数据
onMounted(async () => {
  try {
    const id = route.params.id;
    const fetchedData = await fetchCardData(id); // 假设这是您要调用的API
    // 确保 fetchedData 的属性与 formModel 的属性匹配
    formModel.value = fetchedData[0];

  } catch (error) {
    console.error('Error fetching data:', error); // 错误处理
  }
});;

interface formType {
  key: keyof MetricData
  label: string
  component: any
  props?: any
  placeholder?: string
}

const formFields1: formType[] = [
  {
    key: 'chineseName',
    label: '中文名',
    component: NInput,
    placeholder: '访问次数'
  },
  {
    key: 'englishName',
    label: '英文名',
    component: NInput,
    placeholder: 'PV'
  },
  {
    key: 'alias',
    label: '别名',
    component: NInput,
    placeholder: 'PV'
  },
  {
    key: 'sensitivity',
    label: '敏感度',
    component: NSelect,
    props: {
      options: [
        { label: '普通', value: 'normal' },
        { label: '高敏感', value: 'high' },
        { label: '低敏感', value: 'low' }
      ]
    },
    placeholder: '请选择敏感度'
  },
  {
    key: 'dataModel',
    label: '选用模型',
    component: NSelect,
    props: {
      options: [
        { label: '访问次数', value: 'visitCount' },
        { label: '用户数', value: 'userCount' }
      ]
    },
    placeholder: '访问次数'
  },
  {
    key: 'businessScope',
    label: '业务口径',
    component: NInput,
    placeholder: '用于描述流程, 统一业务口径'
  }
];

const formFields2: formType[] = [
  {
    key: 'statisticColumn',
    label: '选择字段',
    component: NSelect,
    props: {
      options: [
        { label: '普通', value: 'normal' },
        { label: '高敏感', value: 'high' },
        { label: '低敏感', value: 'low' }
      ]
    },
    placeholder: '选择你的字段'
  },
  {
    key: 'statisticType',
    label: '统计方式',
    component: NSelect,
    props: {
      options: [
        { label: '计数', value: 'count' },
        { label: '平均', value: 'avg' },
        { label: '求和', value: 'sum' }
      ]
    },
    placeholder: '计数'
  }
];

const formFields3: formType[] = [
  {
    key: 'chartType',
    label: '选用图表',
    component: NSelect,
    props: {
      options: [
        { label: '折线图', value: 'line' },
        { label: '柱状图', value: 'bar' },
      ]
    },
    placeholder: '选择你的图表'
  },
  {
    key: 'chartDisplayDate',
    label: '选用日期',
    component: NSelect,
    props: {
      options: [
        { label: '七日内', value: '7' },
        { label: '十五日内', value: '15' },
        { label: '三十日内', value: '30' }
      ]
    },
    placeholder: '选择你的日期'
  }
];
const rules = {
  chineseName: { required: true, message: '中文名是必填项' },
  englishName: { required: true, message: '英文名是必填项' },
  alias: { required: true, message: '别名是必填项' },
  sensitivity: { required: true, message: '敏感度是必填项' },
  modelType: { required: true, message: '选用模型是必填项' },
  businessScope: { required: false }
};
import { useMessage } from 'naive-ui'
const message = useMessage()
const submitForm = () => {
  // 校验表单
  const isValid = formModel.value.chineseName && formModel.value.englishName; // 简单示例
  if (isValid) {
    console.log('表单数据:', formModel.value);
    // 表单提交逻辑
  }
  else {
    message.info('表单数据不完整');
  }
};

const handleDelete = () => {
  message.info('删除成功')
}
const handleEdit = () => {
  message.info('编辑成功')
}

</script>
