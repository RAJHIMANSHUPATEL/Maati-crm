import { useEffect, useMemo, useState } from "react";
import {
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  useColorModes,
} from "@coreui/react";
import { CChartBar } from "@coreui/react-chartjs";
import { useNavigate } from "react-router";
import { orderAPI, productAPI, userAPI } from "../../api";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatMoney = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

const Dashboard = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { colorMode } = useColorModes("coreui-free-react-admin-template-theme");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    pending: 0,
    customers: 0,
    lowStock: 0,
  });
  const [monthly, setMonthly] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const year = new Date().getFullYear();
        const [productCount, orderCount, customerCount, lowStock, byMonth, orders] =
          await Promise.all([
            productAPI.getProductCount(authToken),
            orderAPI.getOrderCount(authToken),
            userAPI.getUserCount(authToken, { type: "user" }),
            productAPI.getLowStock(authToken),
            orderAPI.getOrdersByMonth({ year }, authToken),
            orderAPI.getOrders(authToken),
          ]);
        setStats({
          products: productCount.total || 0,
          orders: orderCount.total || 0,
          revenue: orderCount.revenue || 0,
          pending: orderCount.pending || 0,
          customers: customerCount.total || 0,
          lowStock: lowStock.total || 0,
        });
        setMonthly(byMonth.orderCount || []);
        setRecentOrders((orders.data || []).slice(0, 8));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const chartData = MONTHS.map(
    (month) => monthly.find((row) => row.month === month)?.orders || 0
  );
  const yearTotal = chartData.reduce((sum, count) => sum + count, 0);
  const maxOrders = Math.max(...chartData, 0);

  const chartColors = useMemo(() => {
    const styles = getComputedStyle(document.documentElement);
    return {
      muted: styles.getPropertyValue("--cui-secondary-color").trim() || "rgba(28, 25, 23, 0.62)",
      grid: styles.getPropertyValue("--cui-border-color").trim() || "#d4cbbd",
    };
  }, [colorMode]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <CSpinner color="primary" />
      </div>
    );
  }

  const statItems = [
    { label: "Orders", value: stats.orders, to: "/order" },
    { label: "Pending", value: stats.pending, to: "/order", alert: stats.pending > 0 },
    { label: "Products", value: stats.products, to: "/product" },
    { label: "Customers", value: stats.customers, to: "/customer" },
    { label: "Low stock", value: stats.lowStock, to: "/inventory", alert: stats.lowStock > 0 },
  ];

  return (
    <div className="dash">
      <div className="dash-board">
        <button type="button" className="dash-hero" onClick={() => navigate("/order")}>
          <p className="dash-kicker">Today</p>
          <p className="dash-revenue">{formatMoney(stats.revenue)}</p>
          <p className="dash-revenue-label">Revenue so far</p>
        </button>
        {statItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`dash-stat${item.alert ? " is-alert" : ""}`}
            onClick={() => navigate(item.to)}
          >
            <span className="dash-stat-label">{item.label}</span>
            <span className="dash-stat-value">{item.value}</span>
          </button>
        ))}
      </div>

      <section className="dash-panel">
        <div className="dash-panel-head">
          <h2>Orders this year</h2>
          <span className="dash-panel-meta">{yearTotal} placed</span>
        </div>
        <div className="dash-chart">
          <CChartBar
            customTooltips={false}
            data={{
              labels: MONTHS,
              datasets: [
                {
                  label: "Orders",
                  data: chartData,
                  backgroundColor: "rgba(139, 58, 42, 0.88)",
                  hoverBackgroundColor: "#6f2c20",
                  borderWidth: 0,
                  borderRadius: 999,
                  borderSkipped: false,
                  barPercentage: 0.38,
                  categoryPercentage: 0.64,
                  maxBarThickness: 14,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              resizeDelay: 0,
              interaction: { mode: "index", intersect: false },
              layout: { padding: { top: 10, right: 6 } },
              plugins: {
                legend: { display: false },
                tooltip: {
                  enabled: true,
                  backgroundColor: "#1c1917",
                  titleColor: "#f3eee4",
                  bodyColor: "#f3eee4",
                  displayColors: false,
                  padding: 10,
                },
              },
              scales: {
                x: {
                  grid: { display: false },
                  border: { display: false },
                  ticks: {
                    color: chartColors.muted,
                    font: { family: "Source Sans 3", size: 12 },
                  },
                },
                y: {
                  beginAtZero: true,
                  grace: "12%",
                  ticks: {
                    color: chartColors.muted,
                    precision: 0,
                    ...(maxOrders <= 12 ? { stepSize: 1 } : {}),
                    font: { family: "Source Sans 3", size: 12 },
                  },
                  grid: { color: chartColors.grid, drawTicks: false },
                  border: { display: false },
                },
              },
            }}
          />
        </div>
      </section>

      <section className="dash-panel">
        <div className="dash-panel-head">
          <h2>Recent orders</h2>
          <button type="button" className="dash-link" onClick={() => navigate("/order")}>
            All orders
          </button>
        </div>
        <CTable hover responsive className="dash-table">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Order</CTableHeaderCell>
              <CTableHeaderCell>Store</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell className="text-end">Total</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {recentOrders.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan={4} className="text-center text-body-secondary">
                  No orders yet
                </CTableDataCell>
              </CTableRow>
            ) : (
              recentOrders.map((order) => (
                <CTableRow
                  key={order._id}
                  className="dash-row"
                  onClick={() => navigate(`/order/${order._id}`)}
                >
                  <CTableDataCell>{order.order_number}</CTableDataCell>
                  <CTableDataCell>{order.store_id?.name || "—"}</CTableDataCell>
                  <CTableDataCell className="text-capitalize">
                    {order.order_status}
                  </CTableDataCell>
                  <CTableDataCell className="text-end">
                    {formatMoney(order.grand_total)}
                  </CTableDataCell>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
      </section>
    </div>
  );
};

export default Dashboard;
