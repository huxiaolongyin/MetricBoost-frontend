<script setup lang="ts">
import { watchEffect } from "vue";
import { useEcharts } from "@/hooks/common/echarts";
import type { MetricData } from "@/typings/metrics";

const props = defineProps<{
  metricData: MetricData;
}>();

const isScale = props.metricData.chartType === "line";

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
    type: props.metricData.chartType,
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
    setTimeout(resolve, 1000);
  });

  updateOptions((opts) => {
    opts.series.type = props.metricData.chartType;
    opts.series.data = props.metricData.data.map((item) => item.value);
    return opts;
  });
}

// async function init() {
//     mockData();
// }

watchEffect(() => {
  if (props.metricData) {
    updateChartData();
  }
});

// init
// init();
</script>

<template>
  <div ref="domRef" class="h-full w-full"></div>
</template>
