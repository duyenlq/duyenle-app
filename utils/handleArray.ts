// Sử dụng filter và includes để lọc phần tử trùng lặp.
export function unique(arr: any[]) {
    var newArr: any[] = []
    newArr = arr.filter(function (item: any) {
        return newArr.includes(item) ? '' : newArr.push(item)
    })
    return newArr
}