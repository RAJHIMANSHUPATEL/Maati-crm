import React from "react";
import {
  CForm,
  CFormInput,
  CFormLabel,
  CFormFeedback,
  CFormSelect,
  CRow,
  CCol,
  CButton,
  CFormCheck,
} from "@coreui/react";

const countryCodes = ["+61", "+91", "+1", "+44"];

const CreateNewUser = ({
  mode,
  formData,
  handleChange,
  handleStoreToggle,
  errors,
  handleSubmit,
  storeList = [],
}) => {
  const needsStores = formData.type === "manager" || formData.type === "cashier";
  const showTillFields = formData.type === "owner" || needsStores;

  return (
    <div className="p-4">
      <h4>{mode === "edit" ? "Update" : "Create"} User</h4>
      <CForm onSubmit={handleSubmit} encType="multipart/form-data">
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

        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Role</CFormLabel>
            <CFormSelect
              name="type"
              value={formData.type}
              onChange={handleChange}
              invalid={!!errors.type}
            >
              <option value="owner">Owner</option>
              <option value="manager">Manager</option>
              <option value="cashier">Cashier</option>
            </CFormSelect>
            <CFormFeedback invalid>{errors.type}</CFormFeedback>
          </CCol>
          {showTillFields ? (
            <>
              <CCol md={3}>
                <CFormLabel>Operator number</CFormLabel>
                <CFormInput
                  type="text"
                  name="staff_code"
                  maxLength={4}
                  value={formData.staff_code}
                  onChange={handleChange}
                  invalid={!!errors.staff_code}
                />
                <CFormFeedback invalid>{errors.staff_code}</CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel>Staff PIN</CFormLabel>
                <CFormInput
                  type="password"
                  name="staff_pin"
                  maxLength={4}
                  value={formData.staff_pin}
                  onChange={handleChange}
                  invalid={!!errors.staff_pin}
                />
                <CFormFeedback invalid>{errors.staff_pin}</CFormFeedback>
              </CCol>
            </>
          ) : null}
        </CRow>

        {needsStores ? (
          <CRow className="mb-3">
            <CCol>
              <CFormLabel>Stores</CFormLabel>
              <div className={errors.stores ? "is-invalid" : ""}>
                {storeList.map((store) => (
                  <CFormCheck
                    key={store._id}
                    id={`store-${store._id}`}
                    label={store.name}
                    checked={(formData.stores || []).includes(store._id)}
                    onChange={() => handleStoreToggle(store._id)}
                  />
                ))}
              </div>
              {errors.stores ? (
                <div className="invalid-feedback d-block">{errors.stores}</div>
              ) : null}
            </CCol>
          </CRow>
        ) : null}

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

        <CButton color="primary" type="submit">
          {mode === "edit" ? "Update User" : "Create User"}
        </CButton>
      </CForm>
    </div>
  );
};

export default CreateNewUser;
