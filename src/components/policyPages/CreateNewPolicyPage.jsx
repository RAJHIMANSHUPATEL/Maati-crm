import {
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CRow,
  CCol,
  CFormFeedback,
  CCard,
  CCardBody,
} from "@coreui/react";
import JoditEditor from "jodit-react";
import { useRef } from "react";

const CreateNewPolicyPage = ({
  mode,
  formData,
  handleChange,
  errors,
  handleSubmit,
}) => {
  const editor = useRef(null);

  return (
    <div className="p-3">
      <CCard className="shadow-sm border-0">
        <CCardBody>
          <h4 className="mb-4 fw-bold text-primary">
            {mode === "edit" ? "Update" : "Create"} Policy Page
          </h4>

          <CForm onSubmit={handleSubmit}>
            {/* Title */}
            <CRow className="mb-4">
              <CCol xs="12">
                <CFormLabel className="fw-semibold">Title</CFormLabel>
                <CFormInput
                  name="title"
                  placeholder="Enter policy title"
                  value={formData.title}
                  onChange={handleChange}
                  invalid={!!errors.title}
                />
                <CFormFeedback invalid>{errors.title}</CFormFeedback>
              </CCol>
            </CRow>

            {/* Content */}
            <CRow className="mb-4">
              <CCol xs="12">
                <CFormLabel className="fw-semibold">Content</CFormLabel>
                <div
                  className={`border rounded ${errors.content ? "border-danger" : "border-light"}`}
                >
                  <JoditEditor
                    ref={editor}
                    value={formData.content}
                    tabIndex={1}
                    onBlur={(newContent) =>
                      handleChange({ target: { name: "content", value: newContent } })
                    }
                  />
                </div>
                {errors.content && (
                  <CFormFeedback className="d-block text-danger mt-1">
                    {errors.content}
                  </CFormFeedback>
                )}
              </CCol>
            </CRow>

            {/* Submit Button */}
            <CRow>
              <CCol xs="12" className="text-end">
                <CButton color="primary" type="submit" className="px-4 py-2">
                  {mode === "edit" ? "Update Policy Page" : "Create Policy Page"}
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default CreateNewPolicyPage;
