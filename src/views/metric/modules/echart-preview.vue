<template>
  <div ref="domRef" class="h-full w-full"></div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from "vue";
import { useEcharts } from "@/hooks/common/echarts";
import { watch, nextTick } from 'vue';

// 双向绑定数据
const metricData = defineModel<Api.Metric.MetricData>('metricData', { required: true })

// 判断是否需要缩放
const isScale = metricData.value.chartType === "line";

const { domRef, updateOptions } = useEcharts(() => ({
  grid: {
    left: "3%",
    right: "4%",
    bottom: "10%",
    top: "3%",
  },
  xAxis: { type: "category", show: false },
  yAxis: { type: "value", show: false, splitLine: { show: false }, scale: isScale },
  series: {
    type: metricData.value.chartType,
    data: [] as number[],
    itemStyle: { color: "#165DFF" },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(22,93,255,0.3)'
        }, {
          offset: 1,
          color: 'rgba(22,93,255,0)'
        }]
      }
    }
  },
}));

async function updateChartData() {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });


  updateOptions((opts) => {
    opts.series.type = metricData.value.chartType;
    opts.series.data = metricData.value.data.map((item) => item.value);

    return opts;
  });
}

// 监听 metricData 的变化，更新图表
watch(
  () => metricData.value?.data,
  async (newdata) => updateChartData(),
  { immediate: true }
);
</script>
