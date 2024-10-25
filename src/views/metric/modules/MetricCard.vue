<script setup lang="ts">

import EChartComponent from "./EChartPreview.vue";
import { MetricData } from "@/typings/metrics";
import { Icon } from "@iconify/vue";
import { useRouterPush } from '@/hooks/common/router';

defineOptions({
  name: "MetricCard",
});

// 获取卡片数据
defineProps<{
  MetricCardData: MetricData[];
}>();

// 获取数值，如果是 百分数，则*100
const getFormattedValue = (item: MetricData) => {
  return item.formatType === "percent"
    ? item.data[item.data.length - 1].value * 100
    : item.data[item.data.length - 1].value;
};

// 获取小数位数，设置金额的小数位数为 0 ，其他为 2 位
const getDemicals = (FormatType: string) => (FormatType === "currency" ? 0 : 2);
// 获取后缀
const getSuffix = (FormatType: string) => (FormatType === "percent" ? "%" : "");
// 获取前缀
const getPrefix = (FormatType: string) => (FormatType === "currency" ? "￥" : "");

const menuOption = [
  { label: '基本信息', key: "metric-detail" },
  { label: '指标探索', key: "metricExploration" },
  { label: '发布分享', key: "publishShare" },
  { label: '生成报告', key: "generateReport" },
  { label: 'AI分析', key: "aiAnalysis" },
  { label: '收藏', key: "saveToFavorites" },
]

const handleSelect = (key: string, item: MetricData) => {
  const { routerPushByKey } = useRouterPush(false);
  routerPushByKey('metric-detail', { params: { id: item.id } });
}
</script>

<template>
  <NCard :bordered="false" class="bg-transparent">

    <!-- 设置边距、大小、屏幕适应 -->
    <NGrid cols="s:1 m:2 l:4" responsive="screen" :x-gap="16" :y-gap="16">
      <NGi v-for="item in MetricCardData" :key="item.id">
        <div class="rd-8px px-16px pb-4px pt-12px text-dark dark:text-white shadow-md bg-white dark:bg-slate-700">
          <NGrid cols="2">
            <!-- 左侧 -->
            <NGi>
              <h3 class="text-16px">{{ item.chineseName }}</h3>
              <div class="flex justify-between pt-12px">

                <!-- 添加动态的数字动画 -->
                <CountTo :start-value="0" :end-value="getFormattedValue(item)" :decimals="getDemicals(item.formatType)"
                  :suffix="getSuffix(item.formatType)" :prefix="getPrefix(item.formatType)"
                  class="text-26px font-semibold mb-4" />
              </div>
              <div class="tags">
                <span class="bg-slate-100 dark:bg-slate-500 px-4px py-1px mr-2 rounded" v-for="tag in item.tags"
                  :key="tag">{{ tag }}</span>
              </div>
            </NGi>

            <!-- 右侧 -->
            <NGi>
              <!-- 菜单栏 -->
              <div class="flex justify-end">
                <NDropdown placement="bottom-end" trigger="click" :options="menuOption"
                  @select="(key) => handleSelect(key, item)">
                  <Icon icon="mdi:dots-horizontal" width="24" height="24" class="text-slate-400" />
                </NDropdown>
              </div>

              <!-- 图表 -->
              <EChartComponent :metricData="item" />
            </NGi>
          </NGrid>
        </div>
      </NGi>
    </NGrid>
  </NCard>
</template>