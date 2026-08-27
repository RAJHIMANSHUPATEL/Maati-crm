import SearchBar from "../../components/SearchBar";
import { CButton, CRow, CCol, CSpinner } from "@coreui/react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { posConfigAPI } from "../../api";
import { useState } from "react";
import TableComponent from "../../components/posConfig/TableComponent";

const ViewPOSConfig = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [posConfigs, setPosConfigs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosConfigs, setFilteredPosConfigs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosConfig = async () => {
    setLoading(true);
    try {
      const res = await posConfigAPI.getPosConfig(authToken);

      if (res.success) {
        setPosConfigs(res.data);
      }
    } catch (error) {
      console.error("Unable to fetch POS Config", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosConfig();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();

    const filtered = posConfigs.filter((posConfig) => {
      return (
        posConfig.pos_name?.toLowerCase().includes(term) ||
        posConfig.mac_address?.toLowerCase().includes(term) ||
        posConfig.store?.name?.toLowerCase().includes(term)
      );
    });

    setFilteredPosConfigs(filtered);
  }, [searchTerm, posConfigs]);

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
            onClick={() => navigate("/pos-config/create-new")}
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
            <div className="mt-2">Loading POS Configs...</div>
          </div>
        ) : (
          <TableComponent
            posConfigs={filteredPosConfigs}
            setPosConfigs={setPosConfigs}
          />
        )}
      </div>
    </div>
  );
};

export default ViewPOSConfig;
