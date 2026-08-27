import { lazy } from 'react'

const Login = lazy(() => import("./pages/login/Login"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const ViewStore = lazy(() => import("./pages/store/ViewStore"));
const CreateStore = lazy(() => import("./pages/store/CreateStore"));
const ViewCategory = lazy(() => import("./pages/category/ViewCategory"))
const CreateCategory = lazy(() => import("./pages/category/CreateCategory"))
const ViewSubCategory = lazy(() => import("./pages/subCategory/ViewSubCategory"))
const CreateSubCategory = lazy(() => import("./pages/subCategory/CreateSubCategory"))
const ViewPOSConfig = lazy(() => import("./pages/posConfig/ViewPOSConfig"))
const CreatePOSConfig = lazy(() => import("./pages/posConfig/CreatePOSConfig"))
const ViewPolicyPages = lazy(() => import("./pages/policyPages/ViewPolicyPages"))
const CreatePolicyPage = lazy(() => import("./pages/policyPages/CreatePolicyPage"))
const CreateProduct = lazy(() => import("./pages/product/CreateProduct"))
const ViewProduct = lazy(() => import("./pages/product/ViewProduct"))
const CreateCoupon = lazy(() => import("./pages/coupon/CreateCoupon"))
const ViewCoupon = lazy(() => import("./pages/coupon/ViewCoupon"))
const CreateSubMenu = lazy(() => import("./pages/subMenu/CreateSubMenu"))
const ViewSubMenu = lazy(() => import("./pages/subMenu/ViewSubMenu"))
const CreateBanner = lazy(() => import("./pages/banner/CreateBanner"))
const ViewBanner = lazy(() => import("./pages/banner/ViewBanner"))
const ViewUser = lazy(() => import("./pages/user/ViewUser"))
const CreateUser = lazy(() => import("./pages/user/CreateUser"))
const ViewOrder = lazy(() => import("./pages/order/ViewOrder"))
const OrderDetail = lazy(() => import("./pages/order/OrderDetail"))
const ViewCustomer = lazy(() => import("./pages/customer/ViewCustomer"))
const CustomerDetail = lazy(() => import("./pages/customer/CustomerDetail"))
const Inventory = lazy(() => import("./pages/inventory/Inventory"))
const Reports = lazy(() => import("./pages/reports/Reports"))
const Settings = lazy(() => import("./pages/settings/Settings"))

const routes = [
    { path: "/login", exact: true, name: "login", element: Login },
    { path: "/", exact: true, name: "Dashboard", element: Dashboard },
    { path: "/store", exact: true, name: "View Store", element: ViewStore },
    { path: "/store/create-new", exact: true, name: "Create New", element: CreateStore },
    { path: "/store/:_id", exact: true, name: "Update Store", element: CreateStore },
    { path: "/category", exact: true, name: "View Category", element: ViewCategory },
    { path: "/category/create-new", exact: true, name: "Create Category", element: CreateCategory },
    { path: "/category/:_id", exact: true, name: "Update Category", element: CreateCategory },
    { path: "/sub-category", exact: true, name: "View Sub Category", element: ViewSubCategory },
    { path: "/sub-category/create-new", exact: true, name: "Create Sub Category", element: CreateSubCategory },
    { path: "/sub-category/:_id", exact: true, name: "Update Sub Category", element: CreateSubCategory },
    { path: "/pos-config", exact: true, name: "View POS Config", element: ViewPOSConfig },
    { path: "/pos-config/create-new", exact: true, name: "Create POS Config", element: CreatePOSConfig },
    { path: "/pos-config/:_id", exact: true, name: "Update POS Config", element: CreatePOSConfig },
    { path: "/policy-page", exact: true, name: "View Policy Page", element: ViewPolicyPages },
    { path: "/policy-page/create-new", exact: true, name: "Create Policy Page", element: CreatePolicyPage },
    { path: "/policy-page/:_id", exact: true, name: "Update Policy Page", element: CreatePolicyPage },
    { path: "/product", exact: true, name: "View Product", element: ViewProduct },
    { path: "/product/create-new", exact: true, name: "Create Product", element: CreateProduct },
    { path: "/product/:_id", exact: true, name: "Update Product", element: CreateProduct },
    { path: "/coupon", exact: true, name: "View Coupon", element: ViewCoupon },
    { path: "/coupon/create-new", exact: true, name: "Create Coupon", element: CreateCoupon },
    { path: "/coupon/:_id", exact: true, name: "Update Coupon", element: CreateCoupon },
    { path: "/menu", exact: true, name: "View Menu", element: ViewSubMenu },
    { path: "/menu/create-new", exact: true, name: "Create Menu", element: CreateSubMenu },
    { path: "/menu/:_id", exact: true, name: "Update Menu", element: CreateSubMenu },
    { path: "/banner", exact: true, name: "View Banner", element: ViewBanner },
    { path: "/banner/create-new", exact: true, name: "Create Banner", element: CreateBanner },
    { path: "/banner/:_id", exact: true, name: "Update Banner", element: CreateBanner },
    { path: "/user", exact: true, name: "View User", element: ViewUser },
    { path: "/user/create-new", exact: true, name: "Create User", element: CreateUser },
    { path: "/user/:_id", exact: true, name: "Update User", element: CreateUser },
    { path: "/order", exact: true, name: "Orders", element: ViewOrder },
    { path: "/order/:_id", exact: true, name: "Order Detail", element: OrderDetail },
    { path: "/customer", exact: true, name: "Customers", element: ViewCustomer },
    { path: "/customer/:_id", exact: true, name: "Customer Detail", element: CustomerDetail },
    { path: "/inventory", exact: true, name: "Inventory", element: Inventory },
    { path: "/reports", exact: true, name: "Reports", element: Reports },
    { path: "/settings", exact: true, name: "Settings", element: Settings },
]

export default routes
