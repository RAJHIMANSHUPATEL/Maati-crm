import { useEffect, useState } from "react";
import { CFormSelect, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useNavigate } from "react-router";
import SearchBar from "../../components/SearchBar";
import { orderAPI } from "../../api";

const ViewOrder = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await orderAPI.getOrders(authToken);
        if (res.success) setOrders(res.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = orders.filter((order) => {
    const matchesSearch = `${order.order_number} ${order.store_id?.name || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.order_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-3">
      <div className="d-flex flex-wrap gap-3 align-items-center mb-4">
        <div className="flex-grow-1">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <CFormSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ maxWidth: 220 }}
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="packed">Packed</option>
          <option value="out_for_delivery">Out for delivery</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </CFormSelect>
      </div>
      {loading ? (
        <div className="text-center py-5">
          <CSpinner color="primary" />
        </div>
      ) : (
        <CTable hover responsive bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Order</CTableHeaderCell>
              <CTableHeaderCell>Customer</CTableHeaderCell>
              <CTableHeaderCell>Store</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Total</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filtered.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan={6} className="text-center">
                  No orders found
                </CTableDataCell>
              </CTableRow>
            ) : (
              filtered.map((order) => (
                <CTableRow
                  key={order._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/order/${order._id}`)}
                >
                  <CTableDataCell>{order.order_number}</CTableDataCell>
                  <CTableDataCell>
                    {order.user_id
                      ? `${order.user_id.first_name || ""} ${order.user_id.last_name || ""}`
                      : "-"}
                  </CTableDataCell>
                  <CTableDataCell>{order.store_id?.name || "-"}</CTableDataCell>
                  <CTableDataCell className="text-capitalize">
                    {order.order_status}
                  </CTableDataCell>
                  <CTableDataCell>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString("en-IN")
                      : "-"}
                  </CTableDataCell>
                  <CTableDataCell>
                    ₹{Number(order.grand_total || 0).toFixed(2)}
                  </CTableDataCell>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
      )}
    </div>
  );
};

export default ViewOrder;
