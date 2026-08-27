import React from "react";
import { CFormInput } from "@coreui/react";

const SearchBar = ({ value, onChange, placeholder = "Search…" }) => {
  return (
    <CFormInput
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
