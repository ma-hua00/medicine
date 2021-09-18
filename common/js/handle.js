// 处理时间
export function handleTime() {
    return function (value) {
        let da = new Date(value)
        return da.getFullYear() + '年' + (da.getMonth() + 1)  + '月' + da.getDate() + '号'
    }
}