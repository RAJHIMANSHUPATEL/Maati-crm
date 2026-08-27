import SearchBar from "../../components/SearchBar";
import { CButton, CRow, CCol, CSpinner } from "@coreui/react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { policyPagesAPI } from "../../api";
import { useState } from "react";
import TableComponent from "../../components/policyPages/TableComponent";

const ViewPolicyPages = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [policyPages, setPolicyPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPolicyPages, setFilteredPolicyPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPolicyPages = async () => {
    setLoading(true);
    try {
      const res = await policyPagesAPI.getPolicyPage(authToken);
      if (res.success) {
        setPolicyPages(res.data);
      }
    } catch (error) {
      console.error("Unable to fetch Policy Pages", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPolicyPages();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();

    const filtered = policyPages.filter((policyPage) =>
      policyPage.title?.toLowerCase().includes(term)
    );

    setFilteredPolicyPages(filtered);
  }, [searchTerm, policyPages]);

  return (
    <div className="p-3">
      {" "}
      {/* Optional padding around the page */}
      {/* Top Row: SearchBar + Create New */}
      <CRow className="align-items-center mb-4">
        <CCol xs={12} md={6}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </CCol>
        <CCol xs={12} md={6} className="text-md-end mt-3 mt-md-0">
          <CButton
            color="primary"
            onClick={() => navigate("/policy-page/create-new")}
          >
            Create New
          </CButton>
        </CCol>
      </CRow>
      {/* TableComponent */}
      <div className="mt-3">
        {loading ? (
          <div className="text-center py-5">
            <CSpinner color="primary" />
            <div className="mt-2">Loading Policy Pages...</div>
          </div>
        ) : (
          <TableComponent
            policyPages={filteredPolicyPages}
            setPolicyPages={setPolicyPages}
          />
        )}
      </div>
    </div>
  );
};

export default ViewPolicyPages;
