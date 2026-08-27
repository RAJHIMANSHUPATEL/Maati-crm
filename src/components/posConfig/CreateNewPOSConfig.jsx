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

const CreateNewPOSConfig = ({
  mode,
  formData,
  handleChange,
  errors,
  handleSubmit,
  storeList,
}) => {
  return (
    <div className="p-4">
      <h4>{mode === "edit" ? "Update" : "Create"} POS Configuration</h4>
      <CForm onSubmit={handleSubmit} encType="multipart/form-data">
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>POS Name</CFormLabel>
            <CFormInput
              name="pos_name"
              value={formData.pos_name}
              onChange={handleChange}
              invalid={!!errors.pos_name}
            />
            <CFormFeedback invalid>{errors.pos_name}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel>POS PIN</CFormLabel>
            <CFormInput
              name="pos_pin"
              value={formData.pos_pin}
              onChange={handleChange}
              invalid={!!errors.pos_pin}
            />
            <CFormFeedback invalid>{errors.pos_pin}</CFormFeedback>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Store IP</CFormLabel>
            <CFormInput
              name="store_ip"
              value={formData.store_ip}
              onChange={handleChange}
              invalid={!!errors.store_ip}
            />
            <CFormFeedback invalid>{errors.store_ip}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel>MAC Address</CFormLabel>
            <CFormInput
              name="mac_address"
              value={formData.mac_address}
              onChange={handleChange}
              invalid={!!errors.mac_address}
            />
            <CFormFeedback invalid>{errors.mac_address}</CFormFeedback>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Weight Scale Port</CFormLabel>
            <CFormInput
              name="weight_scale_port"
              value={formData.weight_scale_port}
              onChange={handleChange}
              invalid={!!errors.weight_scale_port}
            />
            <CFormFeedback invalid>{errors.weight_scale_port}</CFormFeedback>
          </CCol>
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

        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Baud Rate</CFormLabel>
            <CFormInput
              type="number"
              name="baud_rate"
              value={formData.baud_rate}
              onChange={handleChange}
              invalid={!!errors.baud_rate}
            />
            <CFormFeedback invalid>{errors.baud_rate}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel>Data Bits</CFormLabel>
            <CFormInput
              type="number"
              name="data_bits"
              value={formData.data_bits}
              onChange={handleChange}
              invalid={!!errors.data_bits}
            />
            <CFormFeedback invalid>{errors.data_bits}</CFormFeedback>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Parity</CFormLabel>
            <CFormSelect
              name="parity"
              value={formData.parity}
              onChange={handleChange}
              invalid={!!errors.parity}
            >
              <option value="none">None</option>
              <option value="even">Even</option>
              <option value="odd">Odd</option>
            </CFormSelect>
            <CFormFeedback invalid>{errors.parity}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel>Stop Bits</CFormLabel>
            <CFormInput
              type="number"
              name="stop_bits"
              value={formData.stop_bits}
              onChange={handleChange}
              invalid={!!errors.stop_bits}
            />
            <CFormFeedback invalid>{errors.stop_bits}</CFormFeedback>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Flow Type</CFormLabel>
            <CFormSelect
              name="flow_type"
              value={formData.flow_type ? "true" : "false"}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "flow_type",
                    value: e.target.value === "true",
                  },
                })
              }
              invalid={!!errors.flow_type}
            >
              <option value="">-- Select Flow Type --</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </CFormSelect>
            <CFormFeedback invalid>{errors.flow_type}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel>Printer IP</CFormLabel>
            <CFormInput
              name="printer_ip"
              value={formData.printer_ip}
              onChange={handleChange}
              invalid={!!errors.printer_ip}
            />
            <CFormFeedback invalid>{errors.printer_ip}</CFormFeedback>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Printer Port</CFormLabel>
            <CFormInput
              type="number"
              name="printer_port"
              value={formData.printer_port}
              onChange={handleChange}
              invalid={!!errors.printer_port}
            />
            <CFormFeedback invalid>{errors.printer_port}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel>Surcharge</CFormLabel>
            <CFormInput
              type="number"
              name="surcharge"
              value={formData.surcharge}
              onChange={handleChange}
              invalid={!!errors.surcharge}
            />
            <CFormFeedback invalid>{errors.surcharge}</CFormFeedback>
          </CCol>
        </CRow>

        <CButton color="primary" type="submit">
          {mode === "edit"
            ? "Update POS Configuration"
            : "Create POS Configuration"}
        </CButton>
      </CForm>
    </div>
  );
};

export default CreateNewPOSConfig;
