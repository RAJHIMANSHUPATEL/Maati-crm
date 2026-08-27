import { useEffect, useState } from "react";
import {
  CButton,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { toast } from "react-toastify";
import SearchBar from "../../components/SearchBar";
import { productAPI, settingsAPI } from "../../api";

const Inventory = () => {
  const authToken = localStorage.getItem("authToken");
  const [products, setProducts] = useState([]);
  const [threshold, setThreshold] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("manual_adjust");

  const load = async () => {
    setLoading(true);
    try {
      const [productRes, settingsRes] = await Promise.all([
        productAPI.getProduct(authToken),
        settingsAPI.getSettings(authToken),
      ]);
      if (productRes.success) setProducts(productRes.data || []);
      if (settingsRes.success) setThreshold(settingsRes.data.lowStockThreshold || 5);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const saveStock = async () => {
    try {
      const res = await productAPI.adjustStock(
        {
          _id: selected._id,
          quantity: Number(quantity),
          reason,
        },
        authToken
      );
      if (res.success) {
        toast.success("Stock updated");
        setSelected(null);
        load();
      } else {
        toast.error(res.message || "Failed");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed");
    }
  };

  return (
    <div className="p-3">
      <h4 className="mb-3">Inventory</h4>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <div className="mt-3">
        {loading ? (
          <div className="text-center py-5">
            <CSpinner />
          </div>
        ) : (
          <CTable hover responsive bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Product</CTableHeaderCell>
                <CTableHeaderCell>Store</CTableHeaderCell>
                <CTableHeaderCell>Qty</CTableHeaderCell>
                <CTableHeaderCell>Stock</CTableHeaderCell>
                <CTableHeaderCell></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filtered.map((product) => {
                const low = Number(product.quantity || 0) <= Number(threshold);
                return (
                  <CTableRow key={product._id} className={low ? "table-warning" : ""}>
                    <CTableDataCell>{product.name}</CTableDataCell>
                    <CTableDataCell>{product.store?.name || "-"}</CTableDataCell>
                    <CTableDataCell>{product.quantity}</CTableDataCell>
                    <CTableDataCell>
                      {product.stockStatus ? "In stock" : "Out"}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="primary"
                        size="sm"
                        onClick={() => {
                          setSelected(product);
                          setQuantity(String(product.quantity ?? 0));
                          setReason("manual_adjust");
                        }}
                      >
                        Adjust
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                );
              })}
            </CTableBody>
          </CTable>
        )}
      </div>
      <CModal visible={!!selected} onClose={() => setSelected(null)}>
        <CModalHeader>
          <CModalTitle>Adjust stock</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>{selected?.name}</p>
          <CFormInput
            className="mb-3"
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            label="New quantity"
          />
          <CFormInput
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            label="Reason"
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setSelected(null)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={saveStock}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Inventory;
