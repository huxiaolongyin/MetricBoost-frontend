import { ref } from 'vue'

interface SelectOption {
    label: string
    value: string | number
}

type ApiResponse<T> = {
    data: {
        records: T[]
    } | null
}

/**
 * 提供一个钩子来从异步数据源获取和管理选择选项。
 *
 * @param fetchFn -一个异步函数，用于获取选择选项的数据。
 * @param options -具有以下属性的可选对象：
 *   -labelFormatter -格式化每个选择选项的标签的函数。
 *   -valueKey -数据对象中应用作每个选择选项的值的键。
 * @returns 具有以下属性的对象：
 *   -options -一系列选择选项，每个选项都有一个标签和值。
 *   -加载 -一个布尔值，指示当前是否正在加载选项。
 *   -错误 -加载选项时发生的任何错误。
 *   -loadOptions -可以调用来加载选项的函数。
 */
export function useSelectOptions<T>(
    fetchFn: () => Promise<ApiResponse<T>>,
    {
        labelFormatter = (item: T) => String(item),
        valueKey = 'id' as keyof T,
    }: {
        labelFormatter?: (item: T) => string
        valueKey?: keyof T
    } = {}
) {
    const options = ref<SelectOption[]>([])
    const loading = ref(false)
    const error = ref<Error | null>(null)

    const loadOptions = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await fetchFn()
            options.value = response.data?.records.map(item => ({
                label: labelFormatter(item),
                value: String(item[valueKey])
            })) ?? []
        } catch (err) {
            error.value = err as Error
            options.value = []
        } finally {
            loading.value = false
        }
    }

    return {
        options,
        loading,
        error,
        loadOptions
    }
}