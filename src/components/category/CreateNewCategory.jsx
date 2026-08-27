import {
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CRow,
  CCol,
  CFormFeedback,
  CFormSelect,
  CFormCheck,
} from "@coreui/react";
import ImageUploader from "../ImageUploader";

const CreateNewCategory = ({
  mode,
  formData,
  setFormData,
  handleChange,
  errors,
  handleSubmit,
  storeList,
}) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  return (
    <div className="p-4">
      <h4>{mode === "edit" ? "Update" : "Create"} Category</h4>
      <CForm onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Category Name */}
        <CRow className="mb-3">
          <CCol>
            <CFormLabel>Category Name</CFormLabel>
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

        {/* Ecommerce Category Checkbox */}
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormCheck
              label="Is this an Ecommerce Category?"
              name="isEcommerce"
              checked={formData.isEcommerce || false}
              onChange={handleCheckboxChange}
            />
          </CCol>
        </CRow>

        {/* Image Upload and Preview */}
        <ImageUploader
          type="category"
          formData={formData}
          setFormData={setFormData}
          haveSupportingImage={false}
          errors={errors}
        />

        {/* Submit Button */}
        <CButton color="primary" type="submit">
          {mode === "edit" ? "Update Category" : "Create Category"}
        </CButton>
      </CForm>
    </div>
  );
};

export default CreateNewCategory;
