import { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { orderAPI } from "../../api";

const Reports = () => {
  const authToken = localStorage.getItem("authToken");
  const today = new Date().toISOString().slice(0, 10);
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString()
    .slice(0, 10);
  const [startDate, setStartDate] = useState(monthStart);
  const [endDate, setEndDate] = useState(today);
  const [orders, setOrders] = useState([]);
  const [totals, setTotals] = useState({ count: 0, revenue: 0 });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await orderAPI.getOrdersByDate(
        { start_date: startDate, end_date: endDate },
        authToken
      );
      if (res.success) {
        setOrders(res.data || []);
        setTotals(res.totals || { count: (res.data || []).length, revenue: 0 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3">
      <h4 className="mb-3">Reports</h4>
      <CRow className="align-items-end mb-4 g-3">
        <CCol md={3}>
          <CFormInput
            type="date"
            label="Start"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="date"
            label="End"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </CCol>
        <CCol md={3}>
          <CButton color="primary" onClick={load}>
            Run report
          </CButton>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol md={6}>
          <CCard>
            <CCardBody>
              <div>Orders</div>
              <div className="fs-4 fw-semibold">{totals.count}</div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6}>
          <CCard>
            <CCardBody>
              <div>Revenue</div>
              <div className="fs-4 fw-semibold">
                ₹{Number(totals.revenue || 0).toFixed(2)}
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CCard>
        <CCardHeader>Orders in range</CCardHeader>
        <CCardBody>
          {loading ? (
            <div className="text-center py-4">
              <CSpinner />
            </div>
          ) : (
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Order</CTableHeaderCell>
                  <CTableHeaderCell>Store</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Total</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orders.map((order) => (
                  <CTableRow key={order._id}>
                    <CTableDataCell>{order.order_number}</CTableDataCell>
                    <CTableDataCell>{order.store_id?.name || "-"}</CTableDataCell>
                    <CTableDataCell className="text-capitalize">
                      {order.order_status}
                    </CTableDataCell>
                    <CTableDataCell>
                      ₹{Number(order.grand_total || 0).toFixed(2)}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Reports;
