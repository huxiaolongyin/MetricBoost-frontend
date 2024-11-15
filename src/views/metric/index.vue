<template>
  <div>
    <NFlex vertical :size="16" class="mt-5">
      <Search v-model:formData="searchParams" />
      <MetricCard v-model:metricData="metricData" />
    </NFlex>
    <NFloatButton :right="50" :bottom="60" shape="circle" width="60" height="60" class="bg-red-500" @click="handleAdd">
      <Icon icon="mdi:plus" class="text-white" width="35" height="35" />
    </NFloatButton>
  </div>
</template>

<script setup lang="ts">
import MetricCard from "./modules/metric-card.vue";
import { onMounted, ref, watch } from "vue";
import { fetchMetric } from "@/service/api";
import Search from "./modules/search-filter.vue";
import { Icon } from "@iconify/vue";
import { useRouterPush } from "@/hooks/common/router";
import { useAuthStore } from '@/store/modules/auth';

// 获取指标数据列表
const metricData = ref<Api.Metric.MetricData[]>([]);

// 初始化搜索、筛选查询
const searchParams = ref<Api.Metric.MetricSearchParams>({
  chineseName: "",
  sensitivity: '',
  displayStatus: '',
  favoritePerson: '',
  publishStatus: '',
  topicDomain: null,
  createBy: "",
  current: 1,
  size: 10
});


// 获取指标数据列表
const fetchMetricWithSearch = async (searchParams: Api.Metric.MetricSearchParams) => {
  const response = await fetchMetric({
    ...searchParams
  });
  return response;
};

// 跳转到新增指标页面
const handleAdd = () => {
  const { routerPushByKey } = useRouterPush(false);
  routerPushByKey("metric-detail", { params: { id: "add" } });
};

// 页面加载时获取指标数据列表
onMounted(async () => {
  const { displayStatus, ...requestParams } = searchParams.value;
  const response = await fetchMetricWithSearch(requestParams);
  metricData.value = response.data?.records ?? [];
})

// 监听搜索参数的变化
watch(searchParams, async (newParams) => {
  const { displayStatus, ...requestParams } = newParams;
  const authStore = useAuthStore();
  if (displayStatus === '1') {
    // 获取当前用户信息
    newParams.createBy = authStore.userInfo.userName;
    newParams.favoritePerson = '';
  }
  else if (displayStatus === '2') {
    newParams.favoritePerson = authStore.userInfo.userName;
    newParams.createBy = '';
  }
  else {
    newParams.createBy = '';
    newParams.favoritePerson = '';
  }
  const response = await fetchMetricWithSearch(requestParams);
  metricData.value = response.data?.records ?? [];
}, { deep: true });
</script>
