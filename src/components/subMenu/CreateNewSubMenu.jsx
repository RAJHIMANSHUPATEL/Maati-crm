import {
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormFeedback,
  CButton,
  CRow,
  CCol,
} from "@coreui/react";
import Select from "react-select";

const CreateNewSubMenu = ({
  mode,
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  storeList,
  categoryList,
  errors,
}) => {
  // 🔁 Format category list for react-select
  const categoryOptions = categoryList.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const handleCategoryChange = (selected) => {
    if (selected.length <= 6) {
      setFormData((prev) => ({
        ...prev,
        categories: selected,
      }));
      if (errors.categories) {
        // Clear error if previously shown
        setFormData((prev) => ({
          ...prev,
          errors: { ...errors, categories: null },
        }));
      }
    }
  };

  return (
    <div className="p-4">
      <h4>{mode === "edit" ? "Update" : "Create"} Menu</h4>

      <CForm onSubmit={handleSubmit}>
        {/* Menu Name */}
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Menu Name</CFormLabel>
            <CFormInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              invalid={!!errors.name}
            />
            <CFormFeedback invalid>{errors.name}</CFormFeedback>
          </CCol>
        </CRow>

        {/* Store Dropdown */}
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Select Store</CFormLabel>
            <CFormSelect
              name="store"
              value={formData.store}
              onChange={handleChange}
              invalid={!!errors.store}
            >
              <option value="">-- Select Store --</option>
              {storeList.map((store) => (
                <option key={store._id} value={store._id}>
                  {store.name}
                </option>
              ))}
            </CFormSelect>
            <CFormFeedback invalid>{errors.store}</CFormFeedback>
          </CCol>
        </CRow>

        {/* Category Multiselect */}
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Select Categories (Max 6)</CFormLabel>
            <Select
              isMulti
              name="categories"
              value={formData.categories}
              options={categoryOptions}
              onChange={handleCategoryChange}
              classNamePrefix="select"
              className={errors.categories ? "is-invalid" : ""}
            />
            {errors.categories && (
              <div className="invalid-feedback d-block">
                {errors.categories}
              </div>
            )}
          </CCol>
        </CRow>

        {/* Selected Category Names (read-only) */}
        {formData.categories.length > 0 && (
          <CRow className="mb-3">
            <CCol md={6}>
              <strong>Selected Categories:</strong>
              <ul>
                {formData.categories.map((cat) => (
                  <li key={cat.value}>{cat.label}</li>
                ))}
              </ul>
            </CCol>
          </CRow>
        )}

        {/* Submit Button */}
        <CButton color="primary" type="submit">
          {mode === "edit" ? "Update Menu" : "Create Menu"}
        </CButton>
      </CForm>
    </div>
  );
};

export default CreateNewSubMenu;
