import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import TableComponent from "../../components/product/TableComponent";
import { useNavigate } from "react-router";
import { productAPI } from "../../api";
import { CButton, CCol, CRow, CSpinner } from "@coreui/react";

const ViewProduct = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await productAPI.getProduct(authToken);

      if (res.success) {
        setProducts(res.data);
      }
    } catch (error) {
      console.error("Unable to fetch Products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

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
          <CButton color="primary" onClick={() => navigate("/product/create-new")}>
            Create New
          </CButton>
        </CCol>
      </CRow>
      {/* TableComponent */}
      <div className="mt-3">
        {loading ? (
          <div className="text-center py-5">
            <CSpinner color="primary" />
            <div className="mt-2">Loading Products...</div>
          </div>
        ) : (
          <TableComponent
            products={filteredProducts}
            setProducts={setProducts}
          />
        )}
      </div>
    </div>
  );
};

export default ViewProduct;
