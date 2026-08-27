import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from "@coreui/react";

import { AppSidebarNav } from "./AppSidebarNav";
import navigation from "../_nav";
import { set } from "../features/mainSlice/mainSlice";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.app.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.app.sidebarShow);
  return (
    <CSidebar
      className="border-end"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(set({ sidebarShow: visible }));
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <span className="sidebar-brand-full">Maati</span>
          <span className="sidebar-brand-narrow">M</span>
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          onClick={() => dispatch(set({ sidebarShow: false }))}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch(set({ sidebarUnfoldable: !unfoldable }))}
        />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
