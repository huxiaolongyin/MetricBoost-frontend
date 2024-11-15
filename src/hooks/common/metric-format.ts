
// 使用对象映射方法的方式格式化数值显示
export const formatTypeHandlers: Record<Api.Metric.FormatType, (value: number) => number> = {
    'number': (value: number) => value,
    'currency': (value: number) => value,
    'percent': (value: number) => value * 100,
    'flow': (value: number) => value / 1024 / 1024,
    'default': (value: number) => value,
};

//格式化处理数据
export const getFormattedValue = (item: Api.Metric.MetricData) => {
    // 获取最新周期的数据
    const formatType = (item.formatType as Api.Metric.FormatType) || 'default';
    const formatter = formatTypeHandlers[formatType]
    return formatter(item.data[item.data.length - 1].value)
};