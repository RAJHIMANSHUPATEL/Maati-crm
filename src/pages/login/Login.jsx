import { useState } from "react";
import {
  CAlert,
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
  CSpinner,
} from "@coreui/react";
import { useNavigate } from "react-router";
import { userAPI } from "../../api";
import { toast } from "react-toastify";
import { persistStaff } from "../../utils/staffSession";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!userData.email.trim() || !userData.password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await userAPI.loginUser({
        email: userData.email,
        password: userData.password,
      });
      if (response.success) {
        localStorage.setItem("authToken", response.authToken);
        persistStaff(response.data || {});
        toast.success("Login successful!");
        navigate("/");
      } else {
        setError("Invalid credentials.");
      }
    } catch (e) {
      setError("Login failed. Please try again.");
      console.error("Error login user ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5} lg={4}>
            <p className="login-mark mb-2">Maati</p>
            <p className="text-body-secondary mb-4">The counter. Sign in to run the shop.</p>
            {error && (
              <CAlert color="danger" className="text-center">
                {error}
              </CAlert>
            )}
            <CForm
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <CFormInput
                className="mb-3"
                placeholder="Email"
                autoComplete="username"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value.trimStart() })
                }
              />
              <CFormInput
                className="mb-4"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              <CButton type="submit" color="primary" className="px-4" disabled={loading}>
                {loading ? (
                  <>
                    <CSpinner size="sm" /> Logging in...
                  </>
                ) : (
                  "Sign in"
                )}
              </CButton>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
