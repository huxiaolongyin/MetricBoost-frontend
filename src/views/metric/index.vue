<template>
  <div>
    <NFlex vertical :size="16" class="mt-5">
      <Search v-model:formData="formState" :select-options="selectOptions" />
      <MetricCard :metricData="filteredMetricData" />
    </NFlex>
    <NFloatButton :right="50" :bottom="60" shape="circle" width="60" height="60" class="bg-red-500" @click="handleAdd">
      <Icon icon="mdi:plus" class="text-white" width="35" height="35" />
    </NFloatButton>
  </div>
</template>

<script setup lang="ts">
import MetricCard from "./modules/metric-card.vue";
import { ref, watchEffect, computed } from "vue";
// import { fetchCardData } from "@/data/cardData";
import { fetchMetric } from "@/service/api";
import Search from "./modules/search-filter.vue";
import { Icon } from "@iconify/vue";
import { useRouterPush } from "@/hooks/common/router";

// 获取指标数据列表
const metricData = ref<Api.Metric.MetricData[]>([]);

// 初始化搜索、筛选查询
const formState = ref({
  searchValue: "",
  selectValue: "",
  favoriteStatus: null,
  sensitiveValue: "",
  publishValue: "",
});

const selectOptions = ref<{ value: string; label: string }[]>([]); // 明确指定类型

const filteredMetricData = computed(() => {
  let filteredData = metricData.value;

  // 搜索框过滤
  if (formState.value.searchValue) {
    filteredData = filteredData.filter(
      (item) =>
        item.chineseName
          .toLowerCase()
          .includes(formState.value.searchValue.toLowerCase()) ||
        item.englishName
          .toLowerCase()
          .includes(formState.value.searchValue.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(formState.value.searchValue.toLowerCase())
        )
    );
  }
  // 主题域过滤
  if (formState.value.selectValue) {
    filteredData = filteredData.filter((item) =>
      item.tags.includes(formState.value.selectValue)
    );
  }

  // 单选项过滤
  if (formState.value.favoriteStatus) {
    filteredData = filteredData.filter(
      (item) => item.favoriteStatus === formState.value.favoriteStatus
    );
  }

  if (formState.value.publishValue) {
    filteredData = filteredData.filter(
      (item) => item.publishStatus === formState.value.publishValue
    );
  }

  if (formState.value.sensitiveValue) {
    filteredData = filteredData.filter(
      (item) => item.sensitivity === formState.value.sensitiveValue
    );
  }

  return filteredData;
});

// 跳转到新增页
// const routerPush = useRouterPush();
// const handleAdd = () => {
//   routerPush('/metric/add');
// }

const handleAdd = () => {
  const { routerPushByKey } = useRouterPush(false);
  routerPushByKey("metric-detail", { params: { id: "add" } });
};

watchEffect(async () => {
  const response = await fetchMetric()
  metricData.value = responsedata;
  // 获取所有标签
  const allTags = metricData.value.flatMap((item) => item.tags);
  // 去重
  const uniqueTags: string[] = Array.from(new Set(allTags));
  // 转换格式
  selectOptions.value = [
    { value: "", label: "不限" },
    ...uniqueTags.map((tag) => ({
      value: tag, // 使用原始标签作为 value
      label: tag, // 使用原始标签作为 label
    })),
  ];
});
</script>
