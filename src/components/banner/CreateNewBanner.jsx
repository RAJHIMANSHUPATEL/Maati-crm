import {
  CCard,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormFeedback,
  CButton,
  CRow,
  CCol,
} from "@coreui/react";
import ImagesSection from "./ImagesSection";

const CreateNewBanner = ({
  mode,
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  storeList = [],
  errors = {},
}) => {
  const handlePageChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      page: value,
      position: value === "catalogue" ? "top" : prev.position || "",
    }));
  };
  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 className="mb-3">{mode === "edit" ? "Update" : "Create"} Banner</h4>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            {/* Banner Name */}
            <CCol md={6}>
              <CFormLabel>Banner Name</CFormLabel>
              <CFormInput
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                invalid={!!errors.name}
              />
              <CFormFeedback invalid>{errors.name}</CFormFeedback>
            </CCol>

            {/* Store Dropdown */}
            <CCol md={6}>
              <CFormLabel>Select Store</CFormLabel>
              <CFormSelect
                name="store"
                value={formData.store || ""}
                onChange={handleChange}
                invalid={!!errors.store}
              >
                <option value="">Select Store</option>
                {storeList.map((store) => (
                  <option key={store._id} value={store._id}>
                    {store.name}
                  </option>
                ))}
              </CFormSelect>
              <CFormFeedback invalid>{errors.store}</CFormFeedback>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            {/* Page Dropdown */}
            <CCol md={6}>
              <CFormLabel>Select Page</CFormLabel>
              <CFormSelect
                name="page"
                value={formData.page || ""}
                onChange={handlePageChange}
                invalid={!!errors.page}
              >
                <option value="">Select Page</option>
                <option value="home">Home</option>
                <option value="catalogue">Catalogue</option>
              </CFormSelect>
              <CFormFeedback invalid>{errors.page}</CFormFeedback>
            </CCol>

            {/* Position Dropdown */}
            <CCol md={6}>
              <CFormLabel>Select Position</CFormLabel>
              <CFormSelect
                name="position"
                value={formData.position || ""}
                onChange={handleChange}
                invalid={!!errors.position}
                disabled={formData.page === "catalogue"}
              >
                <option value="">Select Position</option>
                {formData.page === "home" && (
                  <>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="between">Mid</option>
                  </>
                )}
                {formData.page === "catalogue" && (
                  <option value="top">Top</option>
                )}
              </CFormSelect>
              <CFormFeedback invalid>{errors.position}</CFormFeedback>
            </CCol>
          </CRow>

          <ImagesSection
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />

          {/* Submit Button */}
          <CButton color="primary" type="submit">
            {mode === "edit" ? "Update Banner" : "Create Banner"}
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default CreateNewBanner;
