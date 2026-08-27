import {
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CButton,
  CRow,
  CCol,
  CFormFeedback,
} from "@coreui/react";
import { CFormSelect } from "@coreui/react";
import ImageUploader from "../ImageUploader";

const australiaCities = [
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Adelaide",
  "Canberra",
  "Hobart",
  "Darwin",
  "Gold Coast",
  "Newcastle",
  "Wollongong",
  "Geelong",
  "Townsville",
  "Cairns",
  "Toowoomba",
];

const CreateNewStore = ({
  mode,
  formData,
  setFormData,
  handleChange,
  errors,
  handleSubmit,
}) => {
  return (
    <div className="p-4">
      <h4>{mode === "edit" ? "Update" : "Create"} Store</h4>
      <CForm onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Store Name */}
        <CRow className="mb-3">
          <CCol>
            <CFormLabel>Store Name</CFormLabel>
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

        {/* Address */}
        <CRow className="mb-3">
          <CCol>
            <CFormLabel>Address</CFormLabel>
            <CFormInput
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              invalid={!!errors.address}
            />
            <CFormFeedback invalid>{errors.address}</CFormFeedback>
          </CCol>
        </CRow>

        {/* Opening and Closing Time */}
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Opening Time</CFormLabel>
            <CFormInput
              type="time"
              name="open_time"
              value={formData.open_time}
              onChange={handleChange}
              invalid={!!errors.open_time}
            />
            <CFormFeedback invalid>{errors.open_time}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel>Closing Time</CFormLabel>
            <CFormInput
              type="time"
              name="close_time"
              value={formData.close_time}
              onChange={handleChange}
              invalid={!!errors.close_time}
            />
            <CFormFeedback invalid>{errors.close_time}</CFormFeedback>
          </CCol>
        </CRow>

        {/* Commission and Mobile Number */}
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Commission (%)</CFormLabel>
            <CFormInput
              type="number"
              name="commission"
              value={formData.commission}
              onChange={handleChange}
              min="0"
              step="0.01"
              invalid={!!errors.commission}
            />
            <CFormFeedback invalid>{errors.commission}</CFormFeedback>
          </CCol>
          <CCol md={6}>
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

        {/* Description */}
        <CRow className="mb-3">
          <CCol>
            <CFormLabel>Notes</CFormLabel>
            <CFormTextarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              invalid={!!errors.notes}
            />
            <CFormFeedback invalid>{errors.notes}</CFormFeedback>
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
            <CFormLabel>PIN</CFormLabel>
            <CFormInput
              type="password"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              invalid={!!errors.pin}
            />
            <CFormFeedback invalid>{errors.pin}</CFormFeedback>
          </CCol>
        </CRow>

        {/* ABN and City */}
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>ABN Number</CFormLabel>
            <CFormInput
              type="text"
              name="abn"
              value={formData.abn}
              onChange={handleChange}
              invalid={!!errors.abn}
            />
            <CFormFeedback invalid>{errors.abn}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel>City</CFormLabel>
            <CFormSelect
              name="city"
              value={formData.city}
              onChange={handleChange}
              invalid={!!errors.city}
            >
              <option value="">Select a city</option>
              {australiaCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </CFormSelect>
            <CFormFeedback invalid>{errors.city}</CFormFeedback>
          </CCol>
        </CRow>

        {/* Delivery Charges */}
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Delivery Charges</CFormLabel>
            <CFormInput
              type="number"
              name="deliveryCharges"
              value={formData.deliveryCharges}
              onChange={handleChange}
              min="0"
              step="0.01"
              invalid={!!errors.deliveryCharges}
            />
            <CFormFeedback invalid>{errors.deliveryCharges}</CFormFeedback>
          </CCol>
        </CRow>

        {/* Image Upload */}

        <ImageUploader
          type="store"
          formData={formData}
          setFormData={setFormData}
          haveSupportingImage={false}
          errors={errors}
        />

        {/* Submit */}
        <CButton color="primary" type="submit">
          {mode === "edit" ? "Update Store" : "Create Store"}
        </CButton>
      </CForm>
    </div>
  );
};

export default CreateNewStore;
