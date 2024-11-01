<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { ref } from 'vue'
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchUpdateDataModel, fetchAddDataModel } from '@/service/api';
import { $t } from '@/locales';
import { useAuthStore } from '@/store/modules/auth';
import type { StepsProps } from 'naive-ui'
import Step1 from './step1.vue';

defineOptions({
  name: 'DataModelOperateDrawer'
});


// 定义传入参数
interface Props {
  operateType: NaiveUI.TableOperateType; // 操作类型
  rowData?: Api.SystemManage.DataModel | null; // 编辑行数据
}
const props = defineProps<Props>();

// 定义传出参数
interface Emits {
  (e: 'submitted'): void;
}
const emit = defineEmits<Emits>();

// 设置弹窗标题
const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.manage.dataModel.addDataModel'),
    edit: $t('page.manage.dataModel.editDataModel')
  };
  return titles[props.operateType];
});

// 获取用户登录状态
const authStore = useAuthStore();

// 定义表单参数
const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();


const model: Api.SystemManage.DataModelUpdateParams = reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManage.DataModelAddParams {
  return {
    database: '',
    dataModelName: '',
    dataModelDesc: '',
    dataDomain: '',
    topicDomain: '',
    sqlContent: '',
    status: null,
    createBy: authStore.userInfo.userName,
  };
}

type RuleKey = Exclude<keyof Api.SystemManage.DataModelAddParams, 'createBy'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  database: defaultRequiredRule,
  dataModelName: defaultRequiredRule,
  dataModelDesc: defaultRequiredRule,
  dataDomain: defaultRequiredRule,
  topicDomain: defaultRequiredRule,
  sqlContent: defaultRequiredRule,
  status: defaultRequiredRule,
};

// 初始化表单数据
function handleInitModel() {
  Object.assign(model, createDefaultModel());
  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request
  if (props.operateType === 'add') {
    const { error } = await fetchAddDataModel(model);
    if (!error) {
      window.$message?.success($t('common.addSuccess'));
    }
  } else if (props.operateType === 'edit') {
    const { error } = await fetchUpdateDataModel(model);
    if (!error) {
      window.$message?.success($t('common.updateSuccess'));
    }
  }
  closeDrawer();
  emit('submitted');
}
const currentStatus = ref<StepsProps['status']>('process')
const currentRef = ref<number | null>(1)
const current = computed(() => currentRef.value || 0)

// 点击上一步切换步骤
const prev = () => {
  if (currentRef.value === null)
    currentRef.value = 1
  if (currentRef.value > 1)
    currentRef.value--
}

// 点击下一步切换步骤
const next = () => {
  if (currentRef.value === null)
    currentRef.value = 1
  if (currentRef.value < 3)
    currentRef.value++
}



watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NModal v-model:show="visible" display-directive="show" transform-origin="center">
    <NCard :title="title" :bordered="false" size="small" class="card-wrapper w-5/6 ">
      <NSpace vertical class="steps" justify="center">
        <NSteps :current="current" :status="currentStatus" class="mb-10">
          <NStep title="选择数据" />
          <NStep title="字段设置" />
          <NStep title="模型信息" />
        </NSteps>
      </NSpace>
      <Step1 v-show="current === 1" />
      <template #footer>
        <NSpace :size="16">
          <NButton @click="prev">上一个</NButton>
          <NButton @click="next">下一个</NButton>
          <NButton type="primary" v-show="current === 3" @click="handleSubmit"> 确 认 </NButton>
        </NSpace>
      </template>
    </NCard>
  </NModal>
</template>

<style scoped>
.steps {
  max-width: 60%;
  margin: 16px auto;
}
</style>
