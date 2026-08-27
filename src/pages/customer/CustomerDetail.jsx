import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CButton, CCard, CCardBody, CCardHeader, CSpinner } from "@coreui/react";
import { orderAPI, userAPI } from "../../api";

const CustomerDetail = () => {
  const { _id } = useParams();
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [userRes, orderRes] = await Promise.all([
          userAPI.getCustomers(authToken, { _id }),
          orderAPI.getOrdersByUserId({ userId: _id }, authToken),
        ]);
        if (userRes.success) setCustomer(userRes.data);
        if (orderRes.success) setOrders(orderRes.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [_id]);

  if (loading || !customer) {
    return (
      <div className="text-center py-5">
        <CSpinner />
      </div>
    );
  }

  return (
    <div className="p-3">
      <CButton color="secondary" variant="outline" className="mb-3" onClick={() => navigate("/customer")}>
        Back
      </CButton>
      <CCard className="mb-3">
        <CCardHeader>
          {customer.first_name} {customer.last_name}
        </CCardHeader>
        <CCardBody>
          <p>Email: {customer.email}</p>
          <p>Mobile: {customer.mobile}</p>
          <p>Status: {customer.status}</p>
          <h6 className="mt-3">Addresses</h6>
          {(customer.address || []).length === 0 && <p>No addresses</p>}
          {(customer.address || []).map((addr) => (
            <p key={addr._id}>
              {addr.street}, {addr.city}, {addr.state} {addr.zip}, {addr.country}
            </p>
          ))}
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>Orders</CCardHeader>
        <CCardBody>
          {orders.length === 0 && <p>No orders</p>}
          {orders.map((order) => (
            <div
              key={order._id}
              className="d-flex justify-content-between border-bottom py-2"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/order/${order._id}`)}
            >
              <span>{order.order_number}</span>
              <span className="text-capitalize">{order.order_status}</span>
              <span>₹{Number(order.grand_total || 0).toFixed(2)}</span>
            </div>
          ))}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default CustomerDetail;
