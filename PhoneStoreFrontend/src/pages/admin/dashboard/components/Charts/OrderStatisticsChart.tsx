import { useGetOrdersStatistics } from '@/hooks/querys/dashboard.query';
import { OrderStatisticsType } from '@/types/statistics.type';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const OrderStatisticsChart: React.FC = () => {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("month");
  const { data } = useGetOrdersStatistics(viewMode);


  const [chartData, setChartData] = useState<{ categories: string[]; series: number[] }>({
    categories: [],
    series: [],
  });
  useEffect(() => {
    if (data) {
      const categories = data.map((item: OrderStatisticsType) =>
        viewMode === "week"
          ? `Tuần ${item.week} - ${item.year}`
          : viewMode === "day"
            ? `${item.day}/${item.month}/${item.year}`
            : new Date(item.year, (item.month ?? 1) - 1).toLocaleString("vi-VN", { month: "short" })
      );

      const series = data.map((item: OrderStatisticsType) => item.totalOrders);
      setChartData({ categories, series });
    }
  }, [data, viewMode]);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: chartData.categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
      // max: 100,
    },
    tooltip: {
      enabled: true,
      intersect: false,
      y: {
        formatter: (value: number, { dataPointIndex }) => {
          // Lấy doanh thu tương ứng với điểm đang hover
          const revenue = data ? data[dataPointIndex]?.totalRevenue ?? 0 : 0;
          return `${value} - Doanh thu: ${revenue.toLocaleString()} VNĐ`;
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-2 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary2">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary2"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary2">Đơn Hàng</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            {(["day", "week", "month"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`rounded py-1 px-3 text-xs font-medium hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark 
          ${viewMode === mode ? "bg-white text-black shadow-card dark:bg-boxdark dark:text-white" : "text-black dark:text-white"}`}
              >
                {mode === "day" ? "Ngày" : mode === "week" ? "Tuần" : "Tháng"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={[{ name: "Đơn hàng", data: chartData.series }]}
            // series={[
            //   { name: "Đơn hàng", data: chartData.series.orders },
            //   { name: "Doanh thu", data: chartData.series.revenue },
            // ]}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderStatisticsChart;
