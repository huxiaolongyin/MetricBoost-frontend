<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue"
import { useDebounceFn } from '@vueuse/core'
import { OPTIONS_CONFIG } from '@/constants/options'


// 定义“搜索”组件的选项
defineOptions({
  name: "Search",
})

// 定义传递到父组件的 props
const props = defineProps<{
  formData: FormData,
  selectOptions: { value: string, label: string }[]
}>()

// 引用选项内容，用于传递的数据
interface FormData {
  searchValue: string
  selectValue: string
  showTypeValue: string
  sensitiveValue: string
  publishValue: string
}

interface RadioGroup {
  radiotitle: string
  radioType: keyof FormData
  options: {
    value: string
    label: string
  }[]
}

const radioGroups: RadioGroup[] = [
  {
    radiotitle: '展示类型',
    radioType: 'showTypeValue',
    options: OPTIONS_CONFIG.showType
  },
  {
    radiotitle: '是否发布',
    radioType: 'publishValue',
    options: OPTIONS_CONFIG.publish
  },
  {
    radiotitle: '敏感度',
    radioType: 'sensitiveValue',
    options: OPTIONS_CONFIG.sensitive
  }
]

const searchText = ref('')

// 声明组件可以触发的自定义事件
const emit = defineEmits<{
  'update:formData': [value: FormData]
}>()


// 向父组件发送最新的搜索文本
// 使用 useDebounceFn 来限制搜索的频率，增加300ms的防抖
const handleValueChange = useDebounceFn((type: keyof FormData, value: string) => {
  emit('update:formData', {
    ...props.formData,
    [type]: value
  })
}, 300)
</script>

<template>

  <!-- 搜索框 -->
  <div class="flex justify-center w-full">
    <NInput v-model:value="searchText" placeholder="指标搜索" class='my-3 h-10 rounded-xl dark:bg-slate-700'
      style="width: 65%" @input="() => handleValueChange('searchValue', searchText)">
      <template #suffix>
        <Icon icon="mdi:magnify" width="28" height="28" />
      </template>
    </NInput>
  </div>
  <NGrid cols="s:1 m:2 l:4" responsive="screen" :x-gap="16" :y-gap="16">

    <!-- 主题域选择框 -->
    <NGi>
      <div class="flex items-center w-full mt-4">
        <div class="text-dark dark:text-white w-18 ml-8 justify-center">主题域</div>
        <NSelect v-model:value="props.formData.selectValue" :options="props.selectOptions" placeholder="请选择主题域"
          class="dark:bg-slate-700" />
      </div>
    </NGi>

    <!-- 三个单选组 -->
    <NGi v-for="group in radioGroups" :key="group.radiotitle">
      <div class="flex items-center w-full mt-4">
        <div class="text-dark dark:text-white w-20 ml-12 ">{{ group.radiotitle }}</div>
        <NRadioGroup :value="props.formData[group.radioType]"
          @update:value="(val) => handleValueChange(group.radioType, val)">
          <NRadioButton v-for="item in group.options" :key='item.value' :value="item.value" :label="item.label"
            class="dark:bg-slate-700" />
        </NRadioGroup>
      </div>
    </NGi>
  </NGrid>
</template>
