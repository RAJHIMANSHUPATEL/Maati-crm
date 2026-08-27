import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { couponAPI } from "../../api";
import { CButton, CCol, CRow, CSpinner } from "@coreui/react";
import SearchBar from "../../components/SearchBar";
import TableComponent from "../../components/coupon/TableComponent";

const ViewCoupon = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [coupons, setCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCoupon = async () => {
    setLoading(true);
    try {
      const res = await couponAPI.getCoupon(authToken);

      if (res.success) {
        setCoupons(res.data);
      }
    } catch (error) {
      console.error("Unable to fetch Coupon", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoupon();
  }, []);

  useEffect(() => {
    const filtered = coupons.filter((coupon) => {
      const codeMatch = coupon.couponCode
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const storeNameMatch = coupon.store?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      return codeMatch || storeNameMatch;
    });
    setFilteredCoupons(filtered);
  }, [searchTerm, coupons]);
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
          <CButton color="primary" onClick={() => navigate("/coupon/create-new")}>
            Create New
          </CButton>
        </CCol>
      </CRow>
      {/* TableComponent */}
      <div className="mt-3">
        {loading ? (
          <div className="text-center py-5">
            <CSpinner color="primary" />
            <div className="mt-2">Loading Coupons...</div>
          </div>
        ) : (
          <TableComponent coupons={filteredCoupons} setCoupons={setCoupons} />
        )}
      </div>
    </div>
  );
};

export default ViewCoupon;
