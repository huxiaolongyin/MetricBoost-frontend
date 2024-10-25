type FormatType = 'percent' | 'number' | 'currency';
type chartType = 'line' | 'bar';

export interface MetricData {
    id: string;                // 唯一标识符
    chineseName: string;       // 中文名
    englishName: string;       // 英文名
    alias: string;             // 别名
    sensitivity: string;       // 敏感度
    dataModel: string;         // 选用数据模型
    formatType: FormatType;    // 格式类型
    businessScope: string;     // 业务口径
    chartType: chartType;       // 图表类型
    chartDisplayDate: string;   // 图表显示日期
    statisticColumn: string;    // 统计字段
    statisticType: string;      // 统计方式
    showType: string;           // 收藏状态
    publishStatus: string;      // 发布状态
    tags: string[];
    data: Array<{
        date: string;            // 数据日期，假设使用字符串表示日期
        value: number;           // 数据值
        [key: string]: any;
    }>;
}