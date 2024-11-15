<template>
    <div class="px-6 mt-2">
        <NCard class="bg-white dark:bg-slate-700 rounded-xl" title="数据趋势">
            <div ref="domRef" class="h-full w-full" style="height: 400px; width: 100%;"></div>
        </NCard>
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import { useEcharts } from "@/hooks/common/echarts";
import type { SeriesOption } from "echarts";
import { CallbackDataParams } from 'echarts/types/dist/shared'

// 双向绑定数据
const metricData = defineModel<Api.Metric.MetricData>("metricData", { required: false })

const { domRef, updateOptions } = useEcharts(() => ({}));
// 在你的组件中添加图表实例的引用
const chartInstance = ref<echarts.ECharts>();

// 根据获取到的数据进行渲染 Echart 图表
// 如果只有 date + value，则只有单系列
// 如果有除上面以外的维度，超过1个，使用多系列处理。目前无更好方式处理超过2个及以上的情况
watch(() => metricData.value, () => {
    if (!metricData.value?.data || !Array.isArray(metricData.value.data) || metricData.value.data.length === 0) {
        // 如果没有数据，您可以在这里处理，或者直接返回
        return;
    }
    const data = metricData.value.data;

    // const format
    // 获取所有去重日期作为 x 轴
    const xAxisData = [... new Set(data.map(item => item.date))];

    // 获取除 date、 value 之外的所有维度
    const dimensions = Object.keys(data[0] ?? {}).filter(key => key !== 'date' && key !== 'value');

    // 初步配置图表配置
    const chartOption = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        // 图表工具
        toolbox: {
            show: true,
            feature: {
                magicType: { show: true, type: ['line', 'bar'] },
                saveAsImage: { show: true }
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: { type: 'category', data: xAxisData },
        yAxis: { type: 'value' },
        legend: {
            // selectedMode: 'single',
            textStyle: {
                fontSize: 12, // Set legend text size
                fontWeight: 'normal'
            },
        }, // 自动生成图例
        series: [] as SeriesOption[]
    }

    if (dimensions.length === 0) {
        // 单系列情况
        const seriesData = [{
            name: '数据',
            type: metricData.value.chartType || 'line',
            label: {
                show: true,
                position: 'top',
                formatter: (params: CallbackDataParams) => params.value,// Display the value
                fontSize: 12,
                color: '#666',
                // Optional: Format number with decimal places
                // formatter: (params) => params.value.toFixed(2)
            },
            data: data.map(item => item.value),
        }]
        chartOption.series = seriesData;
    } else {
        // 多系列，根据第一个维度自动生成系列
        const dimensionName = dimensions[0]; // 使用第一个维度
        const dimensionValues = [...new Set(data.map(item => item[dimensionName]))]; // 获取维度的唯一值


        const seriesData = dimensionValues.map(dimValue => {
            const filteredData = data.filter(item => item[dimensionName] === dimValue);
            return {
                name: dimValue,
                type: metricData.value?.chartType || 'line',
                stack: 'Total',
                emphasis: {
                    focus: 'series'
                },
                areaStyle: {},
                label: {
                    show: false,
                    // show: true,
                    // position: 'top',
                    // // formatter: '{c}', // Display the value
                    // fontSize: 12,
                    // color: '#666',
                    // Optional: Format number with decimal places
                    // formatter: (params) => params.value.toFixed(2)
                },
                data: xAxisData.map(date => {
                    // Find matching data point for this date and dimension value
                    const point = filteredData.find(item => item.date === date);
                    return point ? point.value : 0;
                })
            };
        });
        chartOption.series = seriesData;
        // 更新图表
    }
    updateOptions(() => chartOption);

    // 添加图例hover事件监听

})

</script>