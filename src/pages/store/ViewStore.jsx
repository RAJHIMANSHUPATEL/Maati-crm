import TableComponent from "../../components/store/TableComponent";
import SearchBar from "../../components/SearchBar";
import { CButton, CRow, CCol, CSpinner } from "@coreui/react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { storeAPI } from "../../api";
import { isOwner } from "../../utils/staffSession";

const ViewStore = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStore = async () => {
    setLoading(true);
    try {
      const res = await storeAPI.getStore(authToken);

      if (res.success) {
        setStores(res.data);
      }
    } catch (error) {
      console.error("Unable to fetch Store", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStore();
  }, []);

  useEffect(() => {
    const filtered = stores.filter((store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStores(filtered);
  }, [searchTerm, stores]);

  return (
    <div className="p-3">
      {" "}
      {/* Optional padding around the page */}
      {/* Top Row: SearchBar + Create New */}
      <CRow className="align-items-center mb-4">
        <CCol xs={12} md={6}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </CCol>
        {isOwner() ? (
          <CCol xs={12} md={6} className="text-md-end mt-3 mt-md-0">
            <CButton color="primary" onClick={() => navigate("/store/create-new")}>
              Create New
            </CButton>
          </CCol>
        ) : null}
      </CRow>
      {/* TableComponent */}
      <div className="mt-3">
        {loading ? (
          <div className="text-center py-5">
            <CSpinner color="primary" />
            <div className="mt-2">Loading Stores...</div>
          </div>
        ) : (
          <TableComponent stores={filteredStores} setStores={setStores} />
        )}
      </div>
    </div>
  );
};

export default ViewStore;
