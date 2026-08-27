import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import TableComponent from "../../components/banner/TableComponent";
import { CButton, CCol, CRow, CSpinner } from "@coreui/react";
import { bannerAPI } from "../../api";
import { useNavigate } from "react-router";

const ViewBanner = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [banners, setBanners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBanner, setFilteredBanner] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBanner = async () => {
    setLoading(true);
    try {
      const res = await bannerAPI.getBanner(authToken);

      if (res.success) {
        setBanners(res.data);
      }
    } catch (error) {
      console.error("Unable to fetch Banner", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  useEffect(() => {
    const filtered = banners.filter((banner) =>
      banner.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBanner(filtered);
  }, [searchTerm, banners]);

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
          <CButton color="primary" onClick={() => navigate("/banner/create-new")}>
            Create New
          </CButton>
        </CCol>
      </CRow>
      {/* TableComponent */}
      <div className="mt-3">
        {loading ? (
          <div className="text-center py-5">
            <CSpinner color="primary" />
            <div className="mt-2">Loading Banners...</div>
          </div>
        ) : (
          <TableComponent banners={filteredBanner} setBanners={setBanners} />
        )}
      </div>
    </div>
  );
};

export default ViewBanner;
