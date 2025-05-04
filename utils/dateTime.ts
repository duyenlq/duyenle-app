export function getDatetoString(date: Date) {
    const day = date.getDate();          // Lấy ngày (1-31)
    const month = date.getMonth() + 1;   // Lấy tháng (0-11), nên cần +1 để chính xác
    const year = date.getFullYear();     // Lấy năm (4 chữ số)
    return day.toString().padStart(2, '0') +'-'+ month.toString().padStart(2, '0') + '-' + year
}