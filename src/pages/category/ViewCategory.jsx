import SearchBar from "../../components/SearchBar";
import { CButton, CRow, CCol, CSpinner } from "@coreui/react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { categoryAPI } from "../../api";
import { useState } from "react";
import TableComponent from "../../components/category/TableComponent";

const ViewCategory = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategory = async () => {
    setLoading(true);
    try {
      const res = await categoryAPI.getCategory(authToken);

      if (res.success) {
        setCategories(res.data);
      }
    } catch (error) {
      console.error("Unable to fetch Category", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

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
            onClick={() => navigate("/category/create-new")}
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
            <div className="mt-2">Loading categories...</div>
          </div>
        ) : (
          <TableComponent
            categories={filteredCategories}
            setCategories={setCategories}
          />
        )}
      </div>
    </div>
  );
};

export default ViewCategory;
