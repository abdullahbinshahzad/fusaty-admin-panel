import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { applyTheme } from "../utils/theme";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import {
  FaUsers,
  FaUsersCog,
  FaMoneyBillWave,
  FaUserPlus,
  FaClipboardList,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEye,
  FaThumbsUp,
  FaThumbsDown,
  FaChevronDown,
  FaArrowUp,
  FaArrowDown,
  FaUser,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { t } = useTranslation();
  const mode = useSelector((state) => state.theme.mode);
  const language = useSelector((state) => state.language.language);

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  // Mock data - replace with actual API calls
  const dashboardData = {
    totalUsers: 3210,
    activeProviders: 540,
    pendingPayouts: 27,
    newProviderRequests: 18,
    ordersToday: 167,
    totalRevenue: 10500,
    orderStatus: {
      completed: 100,
      pending: 40,
      cancelled: 17,
    },
    pendingPayoutsList: [
      "Provider Name",
      "Provider Name",
      "Provider Name",
      "Provider Name",
      "Provider Name",
      "Provider Name",
      "Provider Name",
      "Provider Name",
      "Provider Name",
      "Provider Name",
      "Provider Name",
      "Provider Name",
    ],
    newProviderRequestsList: [
      { name: "Provider Name", category: "Category Name" },
      { name: "Provider Name", category: "Category Name" },
      { name: "Provider Name", category: "Category Name" },
      { name: "Provider Name", category: "Category Name" },
      { name: "Provider Name", category: "Category Name" },
    ],
    revenueData: [
      { day: "Mon", value: 15 },
      { day: "Tue", value: 18 },
      { day: "Wed", value: 22 },
      { day: "Thu", value: 20 },
      { day: "Fri", value: 25 },
      { day: "Sat", value: 28 },
      { day: "Sun", value: 30 },
    ],
  };

  const MetricCard = ({
    icon,
    title,
    value,
    trend,
    trendType,
    action,
    onActionClick,
  }) => (
    <div className="bg-background-card rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="w-8 h-8 p-1  bg-background-main rounded flex items-center justify-center">
          <span className="text-2xl text-accent">{icon}</span>
        </div>
        {action && (
          <button
            onClick={onActionClick}
            className="text-sm text-text-secondary hover:text-accent transition-colors"
          >
            {action}
          </button>
        )}
        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trendType === "up" ? "text-[#55CE63]" : "text-[#FF4D4F]"
            }`}
          >
            {trendType === "up" ? <FaArrowUp /> : <FaArrowDown />}
            {trend}
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">{title}</h3>
      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold text-text-primary">{value}</p>
      </div>
    </div>
  );

  const OrderStatusCard = () => (
    <div className="bg-background-card rounded-xl p-6 shadow-sm">
      <div className="items-center justify-between mb-4 border-b pb-4">
        <h3 className="text-xl font-semibold text-text-primary">
          {t("dashboard.ordersToday")}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-text-primary">
            {dashboardData.ordersToday}
          </span>
          <span className="text-sm text-[#55CE63] font-medium  bg-[#00B05014] rounded-full px-1.5 py-0.5">
            +12%
          </span>
        </div>
      </div>

      <div className="space-y-7">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-text-primary">
            {t("dashboard.orderStatus")}
          </h4>
          <h4 className="font-bold text-text-primary">
            {t("dashboard.numberOfOrders")}
          </h4>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-[1fr_4fr_0fr] items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">
                {t("dashboard.completed")}
              </span>
            </div>
            
              <div
                className="bg-[#55CE63] h-5 rounded-full"
                style={{ width: "100%" }}
              ></div>
            <span className="text-sm font-medium text-text-primary">
              {dashboardData.orderStatus.completed}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-[1fr_4fr_0fr] items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">
                {t("dashboard.pending")}
              </span>
            </div>
          
              <div
                className="bg-[#FFBC34] h-5 rounded-full"
                style={{ width: "40%" }}
              ></div>
            <span className="text-sm font-medium text-text-primary">
              {dashboardData.orderStatus.pending}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-[1fr_4fr_0fr] items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">
                {t("dashboard.cancel")}
              </span>
            </div>
              <div
                className="bg-[#FF4D4F] h-5 rounded-full"
                style={{ width: "17%" }}
              ></div>
            <span className="text-sm font-medium text-text-primary">
              {dashboardData.orderStatus.cancelled}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // const RevenueCard = () => (
  //   <div className="bg-background-card rounded-xl p-6 shadow-sm">
  //     <div className="flex items-center justify-between">
  //       <h3 className="text-xl font-semibold text-text-primary">
  //         {t("dashboard.totalRevenue")}
  //       </h3>
  //       <div className="relative">
  //         <select className="appearance-none bg-background-sidemodal text-input-text px-3 py-2 pr-8 rounded-md text-sm border border-navbar-divider focus:outline-none focus:ring-2 focus:ring-accent">
  //           <option>{t("dashboard.thisWeek")}</option>
  //         </select>
  //         <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary text-xs" />
  //       </div>
  //     </div>
  //     <div className="flex items-center gap-2">
  //       <span className="text-2xl font-bold text-text-primary">
  //         {dashboardData.totalRevenue} {t("dashboard.sar")}
  //       </span>
  //       <span className="text-sm text-[#55CE63] font-medium  bg-[#00B05014] rounded-full px-1.5 py-0.5">
  //         +12%
  //       </span>
  //     </div>

  //     <div className="h-32 flex items-end justify-between gap-1">
  //       {dashboardData.revenueData.map((item, index) => (
  //         <div key={index} className="flex flex-col items-center">
  //           <div
  //             className="w-8 bg-accent rounded-t-sm"
  //             style={{ height: `${(item.value / 30) * 100}%` }}
  //           ></div>
  //           <span className="text-xs text-text-secondary mt-2">{item.day}</span>
  //         </div>
  //       ))}
  //     </div>

  //     <div className="flex justify-between text-xs text-text-secondary mt-2">
  //       <span>10k</span>
  //       <span>20k</span>
  //       <span>30k</span>
  //     </div>
  //   </div>
  // );

  const RevenueCard = () => {
    // CHANGED: dropdown state
    const [timeRange, setTimeRange] = useState("week");

    // CHANGED: dynamic X-axis labels depending on time range
    const getRevenueData = () => {
      if (timeRange === "week") {
        return [
          { day: "Mon", value: 10 },
          { day: "Tue", value: 15 },
          { day: "Wed", value: 18 },
          { day: "Thu", value: 12 },
          { day: "Fri", value: 20 },
          { day: "Sat", value: 25 },
          { day: "Sun", value: 22 },
        ];
      } else if (timeRange === "month") {
        return Array.from({ length: 30 }, (_, i) => ({
          day: i + 1,
          value: Math.floor(Math.random() * 30) + 5,
        }));
      } else {
        return [
          { day: "Jan", value: 15 },
          { day: "Feb", value: 18 },
          { day: "Mar", value: 22 },
          { day: "Apr", value: 25 },
          { day: "May", value: 20 },
          { day: "Jun", value: 28 },
          { day: "Jul", value: 30 },
          { day: "Aug", value: 27 },
          { day: "Sep", value: 22 },
          { day: "Oct", value: 26 },
          { day: "Nov", value: 24 },
          { day: "Dec", value: 29 },
        ];
      }
    };

    const chartData = getRevenueData();

    return (
      <div className="bg-background-card rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-text-primary">
            {t("dashboard.totalRevenue")}
          </h3>

          {/* CHANGED: dropdown */}
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-background-sidemodal text-input-text px-3 py-2 pr-8 rounded-md text-sm border border-navbar-divider focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="week">{t("dashboard.thisWeek")}</option>
              <option value="month">{t("dashboard.thisMonth")}</option>
              <option value="year">{t("dashboard.thisYear")}</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary text-xs" />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-2xl font-bold text-text-primary">
            {dashboardData.totalRevenue} {t("dashboard.sar")}
          </span>
          <span className="text-sm text-[#55CE63] font-medium bg-[#00B05014] rounded-full px-1.5 py-0.5">
            +12%
          </span>
        </div>

        {/* CHANGED: Recharts Line Graph */}
        <div className="h-48 mt-4">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              {/* dotted horizontal lines */}
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              {/* X and Y axes */}
              <XAxis dataKey="day" />
              <YAxis
                domain={[10, 30]}
                ticks={[10, 20, 30]}
                tickFormatter={(val) => `${val}k`}
              />

              {/* Tooltip on hover */}
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border border-gray-200 shadow-md rounded-md px-3 py-2 text-sm">
                        <p className="font-medium text-gray-500 border-b">
                          {label} Revenue
                        </p>
                        <p className="text-gray-700">
                          <span className="w-5 h-5 rounded-full"></span>
                          {payload[0].value}k {t("dashboard.sar")}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {/* Line itself */}
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8345E9"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "#fff",
                  stroke: "#8345E9",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const PendingPayoutsCard = () => (
    <div className="bg-background-card rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-text-primary">
          {t("dashboard.pendingPayouts")}
        </h3>
      </div>

      <div className="mb-4">
        <p className="text-2xl font-bold text-text-primary">
          38,000 {t("dashboard.sar")}{" "}
          <span className="text-sm text-text-secondary">
            (12 {t("dashboard.providers")})
          </span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {dashboardData.pendingPayoutsList.map((provider, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm text-text-secondary"
          >
            <FaUser className="text-text-secondary bg-background-user rounded-full" />
            <span>{provider}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-background-card text-accent border border-accent py-2 px-4 rounded-lg hover:bg-accent/10 transition-colors">
          {t("dashboard.releaseNow")}
        </button>
        <button className="flex-1 bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent/80 transition-colors">
          {t("dashboard.viewDetails")}
        </button>
      </div>
    </div>
  );

  const NewProviderRequestsCard = () => (
    <div className="bg-background-card rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-text-primary">
          {t("dashboard.newProviderRequest")}
        </h3>
        <button className="text-sm text-text-secondary hover:text-accent transition-colors">
          {t("dashboard.viewAll")}
        </button>
      </div>

      <div className="space-y-1">
        <div className="grid grid-cols-[1.5fr_2fr_1fr] items-center py-2 border-b border-border-field">
          <p className="text-sm font-semibold text-text-primary">
            Provider Name
          </p>
          <p className="text-sm font-semibold text-text-primary">Category</p>
          <p className="text-sm font-semibold text-text-primary">Action</p>
        </div>
        {dashboardData.newProviderRequestsList.map((request, index) => (
          <div
            key={index}
            className="grid grid-cols-[1.5fr_2fr_1fr] items-center py-2 border-b border-border-field last:border-b-0"
          >
            <div className="flex items-center gap-2">
              <FaUser className="text-text-secondary bg-background-user rounded-full" />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {request.name}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-xs text-text-secondary">{request.category}</p>
            </div>
            <div className="flex gap-2">
              <button className="text-xs text-[#55CE63] hover:text-[#55CE63]/80 font-medium">
                {t("dashboard.approve")}
              </button>
              <button className="text-xs text-[#FF4D4F] hover:text-[#FF4D4F]/80 font-medium">
                {t("dashboard.reject")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background-main">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          {/* Top Row - Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              icon={<FaUsers />}
              title={t("dashboard.totalUsers")}
              value={dashboardData.totalUsers.toLocaleString()}
              trend="3%"
              trendType="up"
            />
            <MetricCard
              icon={<FaUsersCog />}
              title={t("dashboard.activeProviders")}
              value={dashboardData.activeProviders.toLocaleString()}
              trend="3%"
              trendType="down"
            />
            <MetricCard
              icon={<FaMoneyBillWave />}
              title={t("dashboard.pendingPayouts")}
              value={dashboardData.pendingPayouts}
              action={t("dashboard.viewAll")}
              onActionClick={() => console.log("View all payouts")}
            />
            <MetricCard
              icon={<FaUserPlus />}
              title={t("dashboard.newProviderRequest")}
              value={dashboardData.newProviderRequests}
              action={t("dashboard.viewAll")}
              onActionClick={() => console.log("View all requests")}
            />
          </div>

          {/* Middle Row - Orders and Revenue */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <OrderStatusCard />
            <RevenueCard />
          </div>

          {/* Bottom Row - Pending Payouts and New Requests */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PendingPayoutsCard />
            <NewProviderRequestsCard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
