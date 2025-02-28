export interface OrderStatisticsType {
  year: number
  month?: number // Không bắt buộc nếu dữ liệu là theo tuần hoặc ngày
  week?: number // Thêm để hỗ trợ thống kê theo tuần
  day?: number // Thêm để hỗ trợ thống kê theo ngày
  totalOrders: number
  totalRevenue: number
}
