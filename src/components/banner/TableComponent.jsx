import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  CAvatar,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormSwitch,
  CFormSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPeople } from "@coreui/icons";
import { toast } from "react-toastify";
import { bannerAPI } from "../../api";
import { resolveImageUrl } from "../../utils/imageUrl";

const TableComponent = ({ banners, setBanners }) => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("all");

  const handleStatusToggle = async (_id, status) => {
    try {
      const newStatus = status === "active" ? "deactive" : "active";
      const data = { _id, status: newStatus };
      const res = await bannerAPI.updateBannerStatus(data, authToken);

      if (res.success) {
        setBanners((prevBanners) =>
          prevBanners.map((banner) =>
            banner._id === _id ? { ...banner, status: newStatus } : banner
          )
        );
        toast.success(
          `POS Config successfully ${
            newStatus === "active" ? "activated" : "deactivated"
          }`
        );
      }
    } catch (error) {
      console.error("Error Updating POS Config Status ", error);
      toast.error("Failed to update POS Config status");
    }
  };

  const filteredBanners =
    filterStatus === "all"
      ? banners
      : banners.filter((banner) => banner.status === filterStatus);

  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead className="text-nowrap">
        <CTableRow>
          <CTableHeaderCell className="bg-body-tertiary text-center">
            <CIcon icon={cilPeople} />
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            Name
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            Store
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            Page
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            <div className="d-flex align-items-center gap-2">
              <span>Status:</span>
              <CFormSelect
                size="sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ width: "auto" }}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="deactive">Deactive</option>
              </CFormSelect>
            </div>
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            Action
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {filteredBanners.length === 0 ? (
          <CTableRow>
            <CTableDataCell colSpan={6} className="text-center text-muted">
              No Banner available
            </CTableDataCell>
          </CTableRow>
        ) : (
          filteredBanners.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <CAvatar
                  size="md"
                  src={
                    item?.cover
                      ? resolveImageUrl(item?.cover)
                      : `https://ui-avatars.com/api/?name=${item.name}&background=ddd&color=555`
                  }
                  status={item.status === "active" ? "success" : "danger"}
                />
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.name}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.store.name}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.page}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <CFormSwitch
                  checked={item.status === "active"}
                  onChange={() => handleStatusToggle(item._id, item.status)}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="primary"
                  onClick={() => navigate(`/banner/${item._id}`)}
                >
                  View
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))
        )}
      </CTableBody>
    </CTable>
  );
};

export default TableComponent;
