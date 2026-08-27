import { useEffect, useState } from "react";
import { CFormSwitch, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import SearchBar from "../../components/SearchBar";
import { userAPI } from "../../api";

const ViewCustomer = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await userAPI.getCustomers(authToken);
        if (res.success) setCustomers(res.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = customers.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const toggleStatus = async (customer) => {
    const status = customer.status === "active" ? "deactive" : "active";
    try {
      const res = await userAPI.updateUserStatus(
        { _id: customer._id, status },
        authToken
      );
      if (res.success) {
        setCustomers((prev) =>
          prev.map((item) =>
            item._id === customer._id ? { ...item, status } : item
          )
        );
        toast.success("Status updated");
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-3">
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
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Mobile</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filtered.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={4} className="text-center">
                    No customers found
                  </CTableDataCell>
                </CTableRow>
              ) : (
                filtered.map((customer) => (
                  <CTableRow key={customer._id}>
                    <CTableDataCell
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/customer/${customer._id}`)}
                    >
                      {customer.first_name} {customer.last_name}
                    </CTableDataCell>
                    <CTableDataCell>{customer.email}</CTableDataCell>
                    <CTableDataCell>{customer.mobile}</CTableDataCell>
                    <CTableDataCell>
                      <CFormSwitch
                        checked={customer.status === "active"}
                        onChange={() => toggleStatus(customer)}
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        )}
      </div>
    </div>
  );
};

export default ViewCustomer;
