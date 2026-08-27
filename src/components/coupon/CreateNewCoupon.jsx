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

const CreateNewCoupon = ({
  mode,
  formData,
  handleChange,
  errors,
  handleSubmit,
  storeList,
}) => {
  return (
    <div className="p-4">
      <h4>{mode === "edit" ? "Update" : "Create"} Coupon</h4>

      <CForm onSubmit={handleSubmit}>
        {/* Coupon Code */}
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Coupon Code</CFormLabel>
            <CFormInput
              type="text"
              name="couponCode"
              value={formData.couponCode}
              onChange={handleChange}
              invalid={!!errors.couponCode}
            />
            <CFormFeedback invalid>{errors.couponCode}</CFormFeedback>
          </CCol>

          {/* Store */}
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

        {/* Description */}
        <CRow className="mb-3">
          <CCol>
            <CFormLabel>Description</CFormLabel>
            <CFormInput
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              invalid={!!errors.description}
            />
            <CFormFeedback invalid>{errors.description}</CFormFeedback>
          </CCol>
        </CRow>

        {/* Discount Type and Value */}
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Discount Type</CFormLabel>
            <CFormSelect
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              invalid={!!errors.discountType}
            >
              <option value="">-- Select Discount Type --</option>
              <option value="percent">Percentage</option>
              <option value="flat">Flat</option>
            </CFormSelect>
            <CFormFeedback invalid>{errors.discountType}</CFormFeedback>
          </CCol>

          <CCol md={6}>
            <CFormLabel>Discount Value</CFormLabel>
            <CFormInput
              type="number"
              name="discountValue"
              value={formData.discountValue}
              onChange={handleChange}
              invalid={!!errors.discountValue}
            />
            <CFormFeedback invalid>{errors.discountValue}</CFormFeedback>
          </CCol>
        </CRow>

        {/* Expiry Date */}
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Expiry Date & Time</CFormLabel>
            <CFormInput
              type="datetime-local"
              name="exp_date"
              value={formData.exp_date}
              onChange={handleChange}
              invalid={!!errors.exp_date}
            />
            <CFormFeedback invalid>{errors.exp_date}</CFormFeedback>
          </CCol>
        </CRow>

        {/* Submit Button */}
        <CButton color="primary" type="submit">
          {mode === "edit" ? "Update Coupon" : "Create Coupon"}
        </CButton>
      </CForm>
    </div>
  );
};

export default CreateNewCoupon;
