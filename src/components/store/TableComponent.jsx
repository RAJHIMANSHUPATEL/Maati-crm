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
import { storeAPI } from "../../api";
import { useState } from "react";
import { toast } from "react-toastify";
import { resolveImageUrl } from "../../utils/imageUrl";
import { isOwner } from "../../utils/staffSession";

const TableComponent = ({ stores, setStores }) => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("all");

  const handleStatusToggle = async (_id, status) => {
    try {
      const newStatus = status === "active" ? "deactive" : "active";
      const data = { _id, status: newStatus };
      const res = await storeAPI.updateStoreStatus(data, authToken);

      if (res.success) {
        setStores((prevStores) =>
          prevStores.map((store) =>
            store._id === _id ? { ...store, status: newStatus } : store
          )
        );
        toast.success(
          `Store successfully ${
            newStatus === "active" ? "activated" : "deactivated"
          }`
        );
      }
    } catch (error) {
      console.error("Error Updating Sotre Status ", error);
      toast.error("Failed to update store status");
    }
  };

  const filteredStores =
    filterStatus === "all"
      ? stores
      : stores.filter((store) => store.status === filterStatus);

  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead className="text-nowrap">
        <CTableRow>
          <CTableHeaderCell className="bg-body-tertiary text-center">
            <CIcon icon={cilPeople} />
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            Store
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
        {filteredStores.length === 0 ? (
          <CTableRow>
            <CTableDataCell colSpan={4} className="text-center text-muted">
              No Store available
            </CTableDataCell>
          </CTableRow>
        ) : (
          filteredStores.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <CAvatar
                  size="md"
                  src={
                    item?.cover
                      ? resolveImageUrl(item?.cover)
                      : `https://ui-avatars.com/api/?name=Store&background=ddd&color=555`
                  }
                  status={item.status === "active" ? "success" : "danger"}
                  className="avatar-circle responsive-avatar"
                />
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.name}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <CFormSwitch
                  checked={item.status === "active"}
                  disabled={!isOwner()}
                  onChange={() => handleStatusToggle(item._id, item.status)}
                />
              </CTableDataCell>
              <CTableDataCell>
                {isOwner() ? (
                  <CButton
                    color="primary"
                    onClick={() => navigate(`/store/${item._id}`)}
                  >
                    View
                  </CButton>
                ) : (
                  <span className="text-muted">Assigned</span>
                )}
              </CTableDataCell>
            </CTableRow>
          ))
        )}
      </CTableBody>
    </CTable>
  );
};

export default TableComponent;
