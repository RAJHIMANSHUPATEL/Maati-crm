import SearchBar from "../../components/SearchBar";
import { CButton, CRow, CCol, CSpinner } from "@coreui/react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { subCategoryAPI } from "../../api";
import { useState } from "react";
import TableComponent from "../../components/subCategory/TableComponent";

const ViewSubCategory = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSubCategory = async () => {
    setLoading(true);
    try {
      const res = await subCategoryAPI.getSubCategory(authToken);

      if (res.success) {
        setSubCategories(res.data);
      }
    } catch (error) {
      console.error("Unable to fetch Sub Category", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubCategory();
  }, []);

  useEffect(() => {
    const filtered = subCategories.filter((subCategory) =>
      subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubCategories(filtered);
  }, [searchTerm, subCategories]);

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
            onClick={() => navigate("/sub-category/create-new")}
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
            <div className="mt-2">Loading Sub Categories...</div>
          </div>
        ) : (
          <TableComponent
            subCategories={filteredSubCategories}
            setSubCategories={setSubCategories}
          />
        )}
      </div>
    </div>
  );
};

export default ViewSubCategory;
