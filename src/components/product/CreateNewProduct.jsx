import React, { forwardRef } from "react";
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CFormLabel,
  CFormFeedback,
  CButton,
  CRow,
  CCol,
} from "@coreui/react";
import ImageUploader from "../ImageUploader";

const CreateNewProduct = (
  {
    mode,
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    storeList = [],
    categoryList = [],
    subCategoryList = [],
    errors = {},
    storeLocked = false,
  },
  ref
) => {
  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 className="mb-3">
          {mode === "edit" ? "Update" : "Create"} Product
        </h4>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Product Name</CFormLabel>
              <CFormInput
                name="name"
                value={formData.name}
                onChange={handleChange}
                invalid={!!errors.name}
              />
              <CFormFeedback invalid>{errors.name}</CFormFeedback>
            </CCol>

            <CCol md={6}>
              <CFormLabel>Select Store</CFormLabel>
              <CFormSelect
                name="store"
                value={formData.store}
                onChange={handleChange}
                invalid={!!errors.store}
                disabled={storeLocked}
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
            <CCol md={6}>
              <CFormLabel>Select Category</CFormLabel>
              <CFormSelect
                name="category"
                value={formData.category}
                onChange={handleChange}
                invalid={!!errors.category}
              >
                <option value="">Select Category</option>
                {categoryList.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </CFormSelect>
              <CFormFeedback invalid>{errors.category}</CFormFeedback>
            </CCol>

            <CCol md={6}>
              <CFormLabel>Select Sub Category</CFormLabel>
              <CFormSelect
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                invalid={!!errors.subCategory}
              >
                <option value="">Select Sub Category</option>
                {subCategoryList.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </CFormSelect>
              <CFormFeedback invalid>{errors.subCategory}</CFormFeedback>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={4}>
              <CFormLabel>Online Price (₹)</CFormLabel>
              <CFormInput
                type="number"
                name="onlinePrice"
                value={formData.onlinePrice}
                onChange={handleChange}
                invalid={!!errors.onlinePrice}
              />
              <CFormFeedback invalid>{errors.onlinePrice}</CFormFeedback>
            </CCol>

            <CCol md={4}>
              <CFormLabel>Discount (%)</CFormLabel>
              <CFormInput
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                invalid={!!errors.discount}
              />
              <CFormFeedback invalid>{errors.discount}</CFormFeedback>
            </CCol>

            <CCol md={4}>
              <CFormLabel>Selling Price (₹)</CFormLabel>
              <CFormInput
                type="text"
                name="sellingPrice"
                value={formData.sellingPrice}
                style={{ backgroundColor: "#f5f5f5" }}
                readOnly
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={4}>
              <CFormLabel>Discount Given (₹)</CFormLabel>
              <CFormInput
                type="text"
                name="discountGiven"
                value={formData.discountGiven}
                style={{ backgroundColor: "#f5f5f5" }}
                readOnly
              />
            </CCol>

            <CCol md={4}>
              <CFormLabel>POS Price (₹)</CFormLabel>
              <CFormInput
                type="number"
                name="posPrice"
                value={formData.posPrice}
                onChange={handleChange}
                invalid={!!errors.posPrice}
              />
              <CFormFeedback invalid>{errors.posPrice}</CFormFeedback>
            </CCol>

            <CCol md={4}>
              <CFormLabel>Quantity</CFormLabel>
              <CFormInput
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                invalid={!!errors.quantity}
              />
              <CFormFeedback invalid>{errors.quantity}</CFormFeedback>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Quantity Unit</CFormLabel>
              <CFormSelect
                name="quantityUnit"
                value={formData.quantityUnit}
                onChange={handleChange}
                invalid={!!errors.quantityUnit}
              >
                <option value="">Select Unit</option>
                <option value="Kilogram">Kilogram</option>
                <option value="Gram">Gram</option>
                <option value="Liter">Liter</option>
                <option value="Millilitre">Millilitre</option>
                <option value="Pieces">Pieces</option>
                <option value="Pack">Pack</option>
                <option value="Box">Box</option>
                <option value="Carton">Carton</option>
              </CFormSelect>
              <CFormFeedback invalid>{errors.quantityUnit}</CFormFeedback>
            </CCol>

            <CCol md={6}>
              <CFormLabel>Size</CFormLabel>
              <CFormSelect
                name="size"
                value={formData.size}
                onChange={handleChange}
                invalid={!!errors.size}
              >
                <option value="">Select Size Type</option>
                <option value="slider">Slider</option>
                <option value="with">With Variation</option>
                <option value="without">Without Variation</option>
              </CFormSelect>
              <CFormFeedback invalid>{errors.size}</CFormFeedback>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Stock Status</CFormLabel>
              <CFormSelect
                name="stockStatus"
                value={formData.stockStatus}
                onChange={handleChange}
                invalid={!!errors.stockStatus}
              >
                <option value="">Select Stock Status</option>
                <option value={true}>In Stock</option>
                <option value={false}>Out Of Stock</option>
              </CFormSelect>
              <CFormFeedback invalid>{errors.stockStatus}</CFormFeedback>
            </CCol>
          </CRow>

          {/* Image Upload */}

          <ImageUploader
            ref={ref}
            type="product"
            formData={formData}
            setFormData={setFormData}
            haveSupportingImage={true}
            errors={errors}
          />

          <CRow className="mb-4">
            <CCol>
              <CFormLabel>Product Description</CFormLabel>
              <CFormTextarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                invalid={!!errors.description}
              />
              <CFormFeedback invalid>{errors.description}</CFormFeedback>
            </CCol>
          </CRow>

          {/* Submit Button */}
          <CButton color="primary" type="submit">
            {mode === "edit" ? "Update Product" : "Create Product"}
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default forwardRef(CreateNewProduct);
