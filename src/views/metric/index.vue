<script setup lang="ts">
import MetricCard from "./modules/MetricCard.vue";
import { ref, watchEffect, computed } from "vue";
import { MetricData } from "@/typings/metrics";
import { fetchCardData } from "@/data/cardData";
import Search from "./modules/searchAndFilter.vue";

const MetricCardData = ref<MetricData[]>([]);

// 初始化搜索、筛选查询
const formState = ref({
  searchValue: '',
  selectValue: '',
  showTypeValue: '',
  sensitiveValue: '',
  publishValue: ''
})

const selectOptions = ref<{ value: string; label: string; }[]>([]); // 明确指定类型

watchEffect(async () => {
  MetricCardData.value = await fetchCardData();
  // 获取所有标签
  const allTags = MetricCardData.value.flatMap(item => item.tags);
  // 去重
  const uniqueTags: string[] = Array.from(new Set(allTags));
  // 转换格式
  selectOptions.value = [
    { value: '', label: '不限' },
    ...uniqueTags.map(tag => ({
      value: tag,               // 使用原始标签作为 value
      label: tag                // 使用原始标签作为 label
    }))];
});

const filteredMetricData = computed(() => {
  let filteredData = MetricCardData.value

  // 搜索框过滤
  if (formState.value.searchValue) {
    filteredData = filteredData.filter(item =>
      item.chineseName.toLowerCase().includes(formState.value.searchValue.toLowerCase()) ||
      item.englishName.toLowerCase().includes(formState.value.searchValue.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(formState.value.searchValue.toLowerCase()))
    )
  }
  // 主题域过滤
  if (formState.value.selectValue) {
    filteredData = filteredData.filter(item => item.tags.includes(formState.value.selectValue))
  }

  // 单选项过滤
  if (formState.value.showTypeValue) {
    filteredData = filteredData.filter(item => item.showType === formState.value.showTypeValue)
  }

  if (formState.value.publishValue) {
    filteredData = filteredData.filter(item => item.publishStatus === formState.value.publishValue)
  }

  if (formState.value.sensitiveValue) {
    filteredData = filteredData.filter(item => item.sensitivity === formState.value.sensitiveValue)
  }

  return filteredData
})


</script>

<template>
  <NSpace vertical :size="16">
    <Search v-model:formData="formState" :select-options="selectOptions" />
    <MetricCard :MetricCardData="filteredMetricData" />
  </NSpace>
</template>
