import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import { CButton, CRow, CCol, CSpinner } from "@coreui/react";
import { userAPI } from "../../api";
import TableComponent from "../../components/user/TableComponent";
import { useNavigate } from "react-router";

const ViewUser = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await userAPI.getUser(authToken);

      if (res.success) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error("Unable to fetch User", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);
  return (
    <div className="p-3">
      <CRow className="align-items-center mb-4">
        <CCol xs={12} md={6}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </CCol>
        <CCol xs={12} md={6} className="text-md-end mt-3 mt-md-0">
          <CButton color="primary" onClick={() => navigate("/user/create-new")}>
            Create New
          </CButton>
        </CCol>
      </CRow>
      {/* TableComponent */}
      <div className="mt-3">
        {loading ? (
          <div className="text-center py-5">
            <CSpinner color="primary" />
            <div className="mt-2">Loading Users...</div>
          </div>
        ) : (
          <TableComponent users={filteredUsers} setUsers={setUsers} />
        )}
      </div>
    </div>
  );
};

export default ViewUser;
