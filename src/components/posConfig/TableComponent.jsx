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
import { posConfigAPI } from "../../api";
import { useState } from "react";
import { toast } from "react-toastify";

const TableComponent = ({ posConfigs, setPosConfigs }) => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("all");

  const handleStatusToggle = async (_id, status) => {
    try {
      const newStatus = status === "active" ? "deactive" : "active";
      const data = { _id, status: newStatus };
      const res = await posConfigAPI.updatePosConfigStatus(data, authToken);

      if (res.success) {
        setPosConfigs((prevPosConfigs) =>
          prevPosConfigs.map((posConfig) =>
            posConfig._id === _id
              ? { ...posConfig, status: newStatus }
              : posConfig
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

  const filteredPosConfigs =
    filterStatus === "all"
      ? posConfigs
      : posConfigs.filter((posConfig) => posConfig.status === filterStatus);

  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead className="text-nowrap">
        <CTableRow>
          <CTableHeaderCell className="bg-body-tertiary text-center">
            <CIcon icon={cilPeople} />
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            POS Name
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            Store
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            MAC Address
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
        {filteredPosConfigs.length === 0 ? (
          <CTableRow>
            <CTableDataCell colSpan={6} className="text-center text-muted">
              No POS Config available
            </CTableDataCell>
          </CTableRow>
        ) : (
          filteredPosConfigs.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <CAvatar
                  size="md"
                  src={
                    item?.cover
                      ? `${import.meta.env.VITE_IMAGE_URL}${item?.cover}`
                      : `https://ui-avatars.com/api/?name=${item.pos_name}&background=ddd&color=555`
                  }
                  status={item.status === "active" ? "success" : "danger"}
                />
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.pos_name}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.store.name}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.mac_address}</div>
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
                  onClick={() => navigate(`/pos-config/${item._id}`)}
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
