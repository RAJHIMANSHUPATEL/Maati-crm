import { lazy, useEffect } from "react";
import { useColorModes } from "@coreui/react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify"; // ✅ Add this
import "react-toastify/dist/ReactToastify.css"; // ✅ Add this
import "./App.css";
import "./scss/style.scss";

// We use those styles to show code examples, you should remove them in your application.
import "./scss/examples.scss";

// Containers
const DefaultLayout = lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = lazy(() => import("./pages/login/Login"));

function App() {
  const { isColorModeSet, setColorMode } = useColorModes(
    "coreui-free-react-admin-template-theme"
  );
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
    const theme =
      urlParams.get("theme") &&
      urlParams.get("theme").match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme === "auto" ? "light" : theme);
      return;
    }

    if (isColorModeSet()) {
      const stored =
        window.localStorage.getItem("coreui-free-react-admin-template-theme") ||
        "";
      if (stored === "auto") {
        setColorMode("light");
      }
      return;
    }

    setColorMode("light");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* <BrowserRouter basename="/retailcrm"> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </BrowserRouter>

      {/* ✅ Global Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
}

export default App;
