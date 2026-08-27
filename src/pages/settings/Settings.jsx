import { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { toast } from "react-toastify";
import { settingsAPI } from "../../api";

const Settings = () => {
  const authToken = localStorage.getItem("authToken");
  const [form, setForm] = useState({
    supportEmail: "",
    supportPhone: "",
    currencySymbol: "₹",
    lowStockThreshold: 5,
  });
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [settingsRes, contactRes] = await Promise.all([
          settingsAPI.getSettings(authToken),
          settingsAPI.getContacts(authToken),
        ]);
        if (settingsRes.success) {
          setForm({
            supportEmail: settingsRes.data.supportEmail || "",
            supportPhone: settingsRes.data.supportPhone || "",
            currencySymbol: settingsRes.data.currencySymbol || "₹",
            lowStockThreshold: settingsRes.data.lowStockThreshold ?? 5,
          });
        }
        if (contactRes.success) setContacts(contactRes.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      const res = await settingsAPI.updateSettings(
        { ...form, lowStockThreshold: Number(form.lowStockThreshold) },
        authToken
      );
      if (res.success) toast.success("Settings saved");
      else toast.error(res.message || "Failed");
    } catch {
      toast.error("Failed to save settings");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <CSpinner />
      </div>
    );
  }

  return (
    <div className="p-3">
      <CCard className="mb-4">
        <CCardHeader>Site settings</CCardHeader>
        <CCardBody>
          <form onSubmit={save} className="d-grid gap-3" style={{ maxWidth: 480 }}>
            <CFormInput
              label="Support email"
              value={form.supportEmail}
              onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
            />
            <CFormInput
              label="Support phone"
              value={form.supportPhone}
              onChange={(e) => setForm({ ...form, supportPhone: e.target.value })}
            />
            <CFormInput
              label="Currency symbol"
              value={form.currencySymbol}
              onChange={(e) => setForm({ ...form, currencySymbol: e.target.value })}
            />
            <CFormInput
              type="number"
              min="0"
              label="Low stock threshold"
              value={form.lowStockThreshold}
              onChange={(e) =>
                setForm({ ...form, lowStockThreshold: e.target.value })
              }
            />
            <CButton color="primary" type="submit">
              Save
            </CButton>
          </form>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>Contact submissions</CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Contact</CTableHeaderCell>
                <CTableHeaderCell>Notes</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {contacts.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={4} className="text-center">
                    No submissions
                  </CTableDataCell>
                </CTableRow>
              ) : (
                contacts.map((item) => (
                  <CTableRow key={item._id}>
                    <CTableDataCell>{item.full_name}</CTableDataCell>
                    <CTableDataCell>{item.email}</CTableDataCell>
                    <CTableDataCell>{item.contact}</CTableDataCell>
                    <CTableDataCell>{item.notes}</CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Settings;
