import {
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CRow,
  CCol,
  CFormFeedback,
  CFormSelect,
} from "@coreui/react";
import ImageUploader from "../ImageUploader";

const CreateNewSubCategory = ({
  mode,
  formData,
  setFormData,
  handleChange,
  errors,
  handleSubmit,
  categoryList,
}) => {
  return (
    <div className="p-4">
      <h4>{mode === "edit" ? "Update" : "Create"} Sub Category</h4>
      <CForm onSubmit={handleSubmit}>
        {/* Category Name */}
        <CRow className="mb-3">
          <CCol>
            <CFormLabel>Sub Category Name</CFormLabel>
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
            <CFormLabel>Select Category</CFormLabel>
            <CFormSelect
              name="category"
              value={formData.category}
              onChange={handleChange}
              invalid={!!errors.category}
            >
              <option value="">-- Select Category --</option>
              {categoryList.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </CFormSelect>
            <CFormFeedback invalid>{errors.category}</CFormFeedback>
          </CCol>
        </CRow>

        {/* Image Upload and Preview */}

        <ImageUploader
          type="sub_category"
          formData={formData}
          setFormData={setFormData}
          haveSupportingImage={false}
          errors={errors}
        />

        {/* Submit Button */}
        <CButton color="primary" type="submit">
          {mode === "edit" ? "Update Sub Category" : "Create Sub Category"}
        </CButton>
      </CForm>
    </div>
  );
};

export default CreateNewSubCategory;
