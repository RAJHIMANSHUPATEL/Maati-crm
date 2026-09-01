import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CFormSelect,
  CFormTextarea,
  CSpinner,
} from "@coreui/react";
import { toast } from "react-toastify";
import { orderAPI } from "../../api";

const STATUSES = [
  "pending",
  "confirmed",
  "packed",
  "out_for_delivery",
  "completed",
  "cancelled",
];

const parseItems = (raw) => {
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const OrderDetail = () => {
  const { _id } = useParams();
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await orderAPI.getOrders(authToken, { id: _id });
        if (res.success) {
          setOrder(res.data);
          setStatus(res.data.order_status || "pending");
          setNotes(res.data.notes || "");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [_id]);

  const save = async () => {
    try {
      const res = await orderAPI.updateOrder(
        { _id, order_status: status, notes },
        authToken
      );
      if (res.success) {
        toast.success("Order updated");
        setOrder(res.data);
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  if (loading || !order) {
    return (
      <div className="text-center py-5">
        <CSpinner color="primary" />
      </div>
    );
  }

  const items = parseItems(order.product_details);

  return (
    <div className="p-3">
      <CButton color="secondary" variant="outline" className="mb-3" onClick={() => navigate("/order")}>
        Back
      </CButton>
      <CCard className="mb-3">
        <CCardHeader>
          {order.order_number} · ₹{Number(order.grand_total || 0).toFixed(2)}
        </CCardHeader>
        <CCardBody>
          <p>Store: {order.store_id?.name || "-"}</p>
          <p>
            Customer:{" "}
            {order.user_id ? (
              <CButton
                color="link"
                className="p-0"
                onClick={() => navigate(`/customer/${order.user_id._id}`)}
              >
                {order.user_id.first_name} {order.user_id.last_name}
              </CButton>
            ) : (
              "-"
            )}
          </p>
          <p>Address: {order.address}</p>
          <p>Platform: {order.order_platform === "pos" ? "POS" : "Web"}</p>
          <p>Payment: {order.payment_mode} ({order.payment_status})</p>
          {order.order_platform === "pos" ? (
            <>
              <p>Cashier: {order.cashier_name || "-"}</p>
              <p>Tender: ₹{Number(order.tender_amount || 0).toFixed(2)}</p>
              <p>Change: ₹{Number(order.change_amount || 0).toFixed(2)}</p>
            </>
          ) : null}
          <div className="mb-3" style={{ maxWidth: 280 }}>
            <CFormSelect value={status} onChange={(e) => setStatus(e.target.value)}>
              {STATUSES.map((item) => (
                <option key={item} value={item}>
                  {item.replaceAll("_", " ")}
                </option>
              ))}
            </CFormSelect>
          </div>
          <CFormTextarea
            className="mb-3"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Internal notes"
          />
          <CButton color="primary" onClick={save}>
            Save status
          </CButton>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>Items</CCardHeader>
        <CCardBody>
          {items.map((item, idx) => (
            <div key={idx} className="d-flex justify-content-between border-bottom py-2">
              <span>
                {item.name || item.product}{" "}
                {item.weight
                  ? `· ${item.weight} ${item.unit || ""}`
                  : `× ${item.quantity || 1}`}
              </span>
              <span>₹{Number(item.line_total || item.price || 0).toFixed(2)}</span>
            </div>
          ))}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default OrderDetail;
