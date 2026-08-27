import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { userAPI } from "../api";
import AppSidebar from "../components/AppSidebar";
import AppHeader from "../components/header/AppHeader";
import AppContent from "../components/AppContent";

const DefaultLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await userAPI.verifyUser(token);

        if (!res.success) {
          // Token invalid
          localStorage.removeItem("authToken");
          navigate("/login");
        } else {
          const userData = await res.message;
          // You can store user data in context here
          console.log("User verified", userData);
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    };

    verifyToken();
  }, [location.pathname]); // Runs on every route change

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  );
};

export default DefaultLayout;
