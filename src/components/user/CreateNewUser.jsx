import React from "react";
import {
  CForm,
  CFormInput,
  CFormLabel,
  CFormFeedback,
  CFormSelect,
  CFormTextarea,
  CRow,
  CCol,
  CButton,
} from "@coreui/react";

const countryCodes = ["+61", "+91", "+1", "+44"];

const CreateNewUser = ({
  mode,
  formData,
  handleChange,
  errors,
  handleSubmit,
}) => {
  return (
    <div className="p-4">
      <h4>{mode === "edit" ? "Update" : "Create"} User</h4>
      <CForm onSubmit={handleSubmit} encType="multipart/form-data">
        {/* First & Last Name */}
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>First Name</CFormLabel>
            <CFormInput
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              invalid={!!errors.first_name}
            />
            <CFormFeedback invalid>{errors.first_name}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel>Last Name</CFormLabel>
            <CFormInput
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              invalid={!!errors.last_name}
            />
            <CFormFeedback invalid>{errors.last_name}</CFormFeedback>
          </CCol>
        </CRow>

        {/* Email and Gender */}
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Email</CFormLabel>
            <CFormInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              invalid={!!errors.email}
            />
            <CFormFeedback invalid>{errors.email}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel>Gender</CFormLabel>
            <CFormSelect
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              invalid={!!errors.gender}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </CFormSelect>
            <CFormFeedback invalid>{errors.gender}</CFormFeedback>
          </CCol>
        </CRow>

        {/* Country Code + Mobile Number */}
        <CRow className="mb-3">
          <CCol md={3}>
            <CFormLabel>Country Code</CFormLabel>
            <CFormSelect
              name="country_code"
              value={formData.country_code}
              onChange={handleChange}
              invalid={!!errors.country_code}
            >
              <option value="">Code</option>
              {countryCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </CFormSelect>
            <CFormFeedback invalid>{errors.country_code}</CFormFeedback>
          </CCol>
          <CCol md={9}>
            <CFormLabel>Mobile Number</CFormLabel>
            <CFormInput
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              invalid={!!errors.mobile}
            />
            <CFormFeedback invalid>{errors.mobile}</CFormFeedback>
          </CCol>
        </CRow>

        {mode !== "edit" && (
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Password</CFormLabel>
              <CFormInput
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                invalid={!!errors.password}
              />
              <CFormFeedback invalid>{errors.password}</CFormFeedback>
            </CCol>
          </CRow>
        )}

        {/* Submit */}
        <CButton color="primary" type="submit">
          {mode === "edit" ? "Update User" : "Create User"}
        </CButton>
      </CForm>
    </div>
  );
};

export default CreateNewUser;
