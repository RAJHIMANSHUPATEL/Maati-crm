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
import { productAPI, subCategoryAPI } from "../../api";
import { useState } from "react";
import { toast } from "react-toastify";
import { resolveImageUrl } from "../../utils/imageUrl";

const TableComponent = ({ products, setProducts }) => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("all");

  const handleStatusToggle = async (_id, status) => {
    try {
      const newStatus = status === "active" ? "deactive" : "active";
      const data = { _id, status: newStatus };
      const res = await productAPI.updateProductStatus(data, authToken);

      if (res.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === _id ? { ...product, status: newStatus } : product
          )
        );
        toast.success(
          `Product successfully ${
            newStatus === "active" ? "activated" : "deactivated"
          }`
        );
      }
    } catch (error) {
      console.error("Error Updating Product Status ", error);
      toast.error("Failed to update product status");
    }
  };

  const filteredProducts =
    filterStatus === "all"
      ? products
      : products.filter((product) => product.status === filterStatus);

  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead className="text-nowrap">
        <CTableRow>
          <CTableHeaderCell className="bg-body-tertiary text-center">
            <CIcon icon={cilPeople} />
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            Product
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            Category
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            Online Price
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
        {filteredProducts.length === 0 ? (
          <CTableRow>
            <CTableDataCell colSpan={6} className="text-center text-muted">
              No Product available
            </CTableDataCell>
          </CTableRow>
        ) : (
          filteredProducts.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <CAvatar
                  size="md"
                  src={
                    item?.cover
                      ? resolveImageUrl(item?.cover)
                      : `https://ui-avatars.com/api/?name=Product&background=ddd&color=555`
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
              <CTableDataCell>
                <div>₹{item.onlinePrice}</div>
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
                  onClick={() => navigate(`/product/${item._id}`)}
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
