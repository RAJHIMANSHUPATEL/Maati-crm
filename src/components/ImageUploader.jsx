import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  CFormLabel,
  CFormInput,
  CFormFeedback,
  CCol,
  CRow,
  CButton,
  CSpinner,
} from "@coreui/react";
import { uploadImageAPI } from "../api";
import { toast } from "react-toastify";
import { resolveImageUrl } from "../utils/imageUrl";

const ImageUploader = forwardRef(
  ({ type, formData, setFormData, haveSupportingImage, errors = {} }, ref) => {
    const authToken = localStorage.getItem("authToken");
    const [coverPreview, setCoverPreview] = useState("");
    const [supportingImages, setSupportingImages] = useState([]);
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const [uploadingSupportIds, setUploadingSupportIds] = useState(new Set());

    const maxFileSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/gif",
    ];

    useEffect(() => {
      if (formData?.cover) {
        setCoverPreview(resolveImageUrl(formData.cover));
      }
      if (formData?.images?.length) {
        const previews = formData.images.map((filename) => ({
          id: Date.now() + Math.random(), // give unique id
          preview: resolveImageUrl(filename),
          filename,
        }));
        setSupportingImages(previews);
      }
    }, [formData.cover, formData.images?.length]);

    // Sync back to formData whenever supportingImages changes
    useEffect(() => {
      setFormData((prev) => ({
        ...prev,
        images: supportingImages.map((img) => img.filename),
      }));
    }, [supportingImages]);

    const validateFile = (file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PNG, JPG, JPEG, GIF, and WEBP files are allowed.");
        return false;
      }
      if (file.size > maxFileSize) {
        toast.error("File size must be less than or equal to 2MB.");
        return false;
      }
      return true;
    };

    const handleCoverChange = async (e) => {
      const file = e.target.files[0];
      if (!file || !validateFile(file)) return;

      setCoverPreview(URL.createObjectURL(file));
      setIsUploadingCover(true);

      try {
        const form = new FormData();
        form.append("image", file);

        const imageName = await uploadImageAPI.uploadImage(
          form,
          authToken,
          type
        );
        if (imageName?.public_id) {
          setFormData((prev) => ({ ...prev, cover: imageName.public_id }));
          // ✅ Clear the cover error here if it exists
          if (errors.cover) errors.cover = null;
        }
      } catch (err) {
        console.error("Cover upload failed", err);
        toast.error("Error uploading image..");
      } finally {
        setIsUploadingCover(false);
      }
    };

    const handleSupportingChange = async (e, id) => {
      const file = e.target.files[0];
      if (!file || !validateFile(file)) return;

      const tempUrl = URL.createObjectURL(file);
      setUploadingSupportIds((prev) => new Set(prev).add(id));
      try {
        const form = new FormData();
        form.append("image", file);
        const imageName = await uploadImageAPI.uploadImage(
          form,
          authToken,
          type
        );

        if (imageName?.public_id) {
          setSupportingImages((prev) =>
            prev.map((img) =>
              img.id === id
                ? { ...img, preview: tempUrl, filename: imageName.public_id }
                : img
            )
          );
        }
      } catch (err) {
        console.error("Supporting upload failed", err);
        toast.error("Error uploading supporting image.");
      } finally {
        setUploadingSupportIds((prev) => {
          const updated = new Set(prev);
          updated.delete(id);
          return updated;
        });
      }
    };

    const handleAddImage = () => {
      setSupportingImages((prev) => [
        ...prev,
        { id: Date.now(), preview: "", filename: "" },
      ]);
    };

    const handleRemoveImage = (id) => {
      setSupportingImages((prev) => prev.filter((img) => img.id !== id));
    };

    // Call this function before form submit
    useImperativeHandle(ref, () => ({
      validateSupportingBeforeSubmit: () => {
        const hasEmpty = supportingImages.some((img) => !img.filename);
        if (hasEmpty) {
          toast.error(
            "Please upload all supporting images or remove the empty ones."
          );
          return false;
        }
        return true;
      },
    }));

    return (
      <div className="mb-4">
        {/* Cover Image Upload */}
        <CRow className="mb-3">
          <CCol xs={12} md={6}>
            <CFormLabel>
              Cover Image <span className="text-danger">*</span>
            </CFormLabel>
            <CFormInput
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              invalid={Boolean(errors.cover)}
            />
            <CFormFeedback invalid>{errors.cover}</CFormFeedback>
          </CCol>
          {isUploadingCover ? (
            <CCol xs={12} md={6} className="d-flex align-items-end">
              <CSpinner color="primary" />
              <span className="ms-2">Uploading cover...</span>
            </CCol>
          ) : (
            coverPreview && (
              <CCol xs={12} md={6} className="d-flex align-items-end">
                <img
                  src={coverPreview}
                  alt="Cover Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "120px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    padding: "4px",
                  }}
                />
              </CCol>
            )
          )}
        </CRow>

        {/* Supporting Images */}
        {haveSupportingImage && (
          <>
            <CRow className="mb-3">
              <CCol>
                <CButton color="primary" onClick={handleAddImage}>
                  + Add Supporting Image
                </CButton>
              </CCol>
            </CRow>

            {supportingImages.map((img, i) => (
              <CRow className="mb-3" key={img.id}>
                <CCol md={5}>
                  <CFormLabel>Supporting Image {i + 1}</CFormLabel>
                  <CFormInput
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSupportingChange(e, img.id)}
                  />
                </CCol>

                {uploadingSupportIds.has(img.id) ? (
                  <CCol md={5} className="d-flex align-items-center">
                    <CSpinner color="primary" />
                    <span className="ms-2">Uploading...</span>
                  </CCol>
                ) : (
                  img.preview && (
                    <CCol md={5} className="d-flex align-items-end">
                      <img
                        src={img.preview}
                        alt={`Preview ${i + 1}`}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "120px",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                          padding: "4px",
                        }}
                      />
                    </CCol>
                  )
                )}
                <CCol md={2} className="d-flex align-items-end">
                  <CButton
                    color="danger"
                    onClick={() => handleRemoveImage(img.id)}
                  >
                    ❌
                  </CButton>
                </CCol>
              </CRow>
            ))}
          </>
        )}
      </div>
    );
  }
);

export default ImageUploader;
