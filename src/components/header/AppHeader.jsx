import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  useColorModes,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu, cilMoon, cilSun } from "@coreui/icons";
import AppHeaderDropdown from "./AppHeaderDropdown";
import AppBreadcrumb from "./AppBreadcrumb";
import { set } from "../../features/mainSlice/mainSlice";

const AppHeader = () => {
  const headerRef = useRef();
  const { colorMode, setColorMode } = useColorModes(
    "coreui-free-react-admin-template-theme"
  );

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.app.sidebarShow);
  const isDark = colorMode === "dark";

  useEffect(() => {
    document.addEventListener("scroll", () => {
      headerRef.current &&
        headerRef.current.classList.toggle(
          "shadow-sm",
          document.documentElement.scrollTop > 0
        );
    });
  }, []);

  return (
    <CHeader position="sticky" className="mb-3 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch(set({ sidebarShow: !sidebarShow }))}
          style={{ marginInlineStart: "-14px" }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="ms-auto align-items-center gap-2">
          <button
            type="button"
            className="btn"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setColorMode(isDark ? "light" : "dark")}
          >
            <CIcon icon={isDark ? cilSun : cilMoon} size="lg" />
          </button>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
