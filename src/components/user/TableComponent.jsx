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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPeople } from "@coreui/icons";
import { useNavigate } from "react-router";
import { userAPI } from "../../api";
import { toast } from "react-toastify";
import { resolveImageUrl } from "../../utils/imageUrl";

const TableComponent = ({ users, setUsers }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const handleStatusToggle = async (_id, status) => {
    try {
      const newStatus = status === "active" ? "deactive" : "active";
      const res = await userAPI.updateUserStatus(
        { _id, status: newStatus },
        authToken
      );
      if (res.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === _id ? { ...user, status: newStatus } : user
          )
        );
        toast.success("User status updated");
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead className="text-nowrap">
        <CTableRow>
          <CTableHeaderCell className="bg-body-tertiary text-center">
            <CIcon icon={cilPeople} />
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            User Name
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            Role
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            Operator
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            <div className="d-flex align-items-center gap-2">
              <span>Email</span>
            </div>
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            Status
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">
            Action
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {users.length === 0 ? (
          <CTableRow>
            <CTableDataCell colSpan={7} className="text-center text-muted">
              No User available
            </CTableDataCell>
          </CTableRow>
        ) : (
          users.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <CAvatar
                  size="md"
                  src={
                    item?.cover
                      ? resolveImageUrl(item?.cover)
                      : `https://ui-avatars.com/api/?name=${item.first_name}+${item.last_name}&background=ddd&color=555`
                  }
                  status={item.status === "active" ? "success" : "danger"}
                  className="avatar-circle responsive-avatar"
                />
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.first_name} {item.last_name}</div>
              </CTableDataCell>
              <CTableDataCell className="text-capitalize">
                {item.type === "admin" ? "owner" : item.type}
              </CTableDataCell>
              <CTableDataCell>
                {item.staff_code || "-"}
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.email}</div>
              </CTableDataCell>
              <CTableDataCell>
                <CFormSwitch
                  checked={item.status === "active"}
                  onChange={() => handleStatusToggle(item._id, item.status)}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="primary"
                  onClick={() => navigate(`/user/${item._id}`)}
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
