import { useGetOrdersStatistics } from '@/hooks/querys/dashboard.query';
import { OrderStatisticsType } from '@/types/Statistics.type';
import formatPrice from '@/utils/formatPrice';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const RevenueStatisticsChart: React.FC = () => {
  const { data } = useGetOrdersStatistics();
  const [chartData, setChartData] = useState<{ categories: string[]; series: number[] }>({
    categories: [],
    series: [],
  });

  useEffect(() => {
    if (data) {
      // Chuyển đổi dữ liệu API thành dữ liệu biểu đồ
      const categories = data.map((item: OrderStatisticsType) =>
        new Date(item.year, item.month - 1).toLocaleString("vi-VN", { month: "short" })
      );
      const series = data.map((item: OrderStatisticsType) => item.totalRevenue);
      console.log('categories', categories);
      console.log('series', series);
      setChartData({ categories, series });
    }
  }, [data]);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#80CAEE', '#80CAEE'],
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
      strokeColors: ['#80CAEE', '#80CAEE'],
      strokeWidth: 3,
      // strokeOpacity: 0.9,
      // strokeDashArray: 0,
      // fillOpacity: 1,
      // discrete: [],
      // hover: {
      //   size: undefined,
      //   sizeOffset: 5,
      // },
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
        y: {
          formatter: (val) => val.toLocaleString("vi-VN") + " VND",
        },
      },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-2 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Doanh Thu</p>
              <p className="text-sm font-medium">
                {data && chartData.categories.length > 0
                  ? `${chartData.categories[0].replace('Tháng','')}/${data[0].year} - ${chartData.categories[chartData.categories.length - 1].replace('Tháng','')}/${data[data.length - 1].year}`
                  : "Đang tải..."}
              </p>

            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Ngày
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Tuần
            </button>
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Tháng
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            // series={state.series}
            series={[{ name: "Doanh Thu", data: chartData.series }]}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default RevenueStatisticsChart;
