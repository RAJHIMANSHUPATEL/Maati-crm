import SearchBar from "../../components/SearchBar";
import { CButton, CRow, CCol, CSpinner } from "@coreui/react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { subMenuAPI } from "../../api";
import { useState } from "react";
import TableComponent from "../../components/subMenu/TableComponent";

const ViewSubMenu = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [subMenus, setSubMenus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSubMenus, setFilteredSubMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSubMenu = async () => {
    setLoading(true);
    try {
      const res = await subMenuAPI.getSubMenu(authToken);

      if (res.success) {
        setSubMenus(res.data);
      }
    } catch (error) {
      console.error("Unable to fetch Sub Menu", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubMenu();
  }, []);

  useEffect(() => {
    const filtered = subMenus.filter((subMenu) =>
      subMenu.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubMenus(filtered);
  }, [searchTerm, subMenus]);

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
            onClick={() => navigate("/menu/create-new")}
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
            <div className="mt-2">Loading Sub Menus...</div>
          </div>
        ) : (
          <TableComponent
            subMenus={filteredSubMenus}
            setSubMenus={setSubMenus}
          />
        )}
      </div>
    </div>
  );
};

export default ViewSubMenu;
