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
import { useNavigate } from "react-router";
import { subCategoryAPI } from "../../api";
import { useState } from "react";
import { toast } from "react-toastify";

const TableComponent = ({ subCategories, setSubCategories }) => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("all");

  const handleStatusToggle = async (_id, status) => {
    try {
      const newStatus = status === "active" ? "deactive" : "active";
      const data = { _id, status: newStatus };
      const res = await subCategoryAPI.updateSubCategoryStatus(data, authToken);

      if (res.success) {
        setSubCategories((prevSubCatogeries) =>
          prevSubCatogeries.map((subCategory) =>
            subCategory._id === _id
              ? { ...subCategory, status: newStatus }
              : subCategory
          )
        );
        // Show success toast
        toast.success(
          `Sub-category successfully ${
            newStatus === "active" ? "activated" : "deactivated"
          }`
        );
      }
    } catch (error) {
      console.error("Error Updating Sub Category Status ", error);
      toast.error("Failed to update sub-category status");
    }
  };

  const filteredSubCategories =
    filterStatus === "all"
      ? subCategories
      : subCategories.filter(
          (subCategory) => subCategory.status === filterStatus
        );

  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead className="text-nowrap">
        <CTableRow>
          <CTableHeaderCell className="bg-body-tertiary text-center">
            <CIcon icon={cilPeople} />
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            Sub Category
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            Category
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
        {filteredSubCategories.length === 0 ? (
          <CTableRow>
            <CTableDataCell colSpan={5} className="text-center text-muted">
              No Sub Category available
            </CTableDataCell>
          </CTableRow>
        ) : (
          filteredSubCategories.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <CAvatar
                  size="md"
                  src={
                    item?.cover
                      ? `${import.meta.env.VITE_IMAGE_URL}${item?.cover}`
                      : `https://ui-avatars.com/api/?name=SubCategory&background=ddd&color=555`
                  }
                  status={item.status === "active" ? "success" : "danger"}
                />
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.name}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.category.name}</div>
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
                  onClick={() => navigate(`/sub-category/${item._id}`)}
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
