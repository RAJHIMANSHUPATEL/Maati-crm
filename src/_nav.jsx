import CIcon from "@coreui/icons-react";
import {
  cilSpeedometer,
  cilBuilding,
  cilClipboard,
  cilTags,
  cilListRich,
  cilCart,
  cilSettings,
  cilImage,
  cilGift,
  cilFile,
  cilUser,
  cilList,
  cilPeople,
  cilInbox,
} from "@coreui/icons";
import { CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Shop",
  },
  {
    component: CNavItem,
    name: "Store",
    to: "/store",
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Orders",
    to: "/order",
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Customers",
    to: "/customer",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Inventory",
    to: "/inventory",
    icon: <CIcon icon={cilInbox} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Reports",
    to: "/reports",
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Category",
    to: "/category",
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Sub Category",
    to: "/sub-category",
    icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Product",
    to: "/product",
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Pages",
  },
  {
    component: CNavItem,
    name: "POS Config",
    to: "/pos-config",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Banner",
    to: "/banner",
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Coupon",
    to: "/coupon",
    icon: <CIcon icon={cilGift} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Policy Page",
    to: "/policy-page",
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Menu",
    to: "/menu",
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Admin",
  },
  {
    component: CNavItem,
    name: "User",
    to: "/user",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Settings",
    to: "/settings",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
];

export default _nav;
