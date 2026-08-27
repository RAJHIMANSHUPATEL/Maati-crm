import React, { useState, useEffect } from "react";
import {
  CFormLabel,
  CFormInput,
  CCol,
  CRow,
  CButton,
  CSpinner,
} from "@coreui/react";
import { uploadImageAPI } from "../../api";
import { toast } from "react-toastify";
import { resolveImageUrl } from "../../utils/imageUrl";

const allowedTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
];
const maxFileSize = 2 * 1024 * 1024; // 2MB

const ImagesSection = ({ formData, setFormData, errors = {} }) => {
  const authToken = localStorage.getItem("authToken");
  const [imagesList, setImagesList] = useState([
    {
      _id: Date.now(),
      url: "",
      altText: "",
      link: "",
      text: "",
      preview: "",
    },
  ]);
  const [uploadingIds, setUploadingIds] = useState(new Set());

  useEffect(() => {
    if (formData?.images?.length && formData.name) {
      const previews = formData.images.map((filename) => ({
        preview: resolveImageUrl(filename.url),
        _id: Date.now() + Math.random(),
        ...filename,
      }));
      setImagesList(previews);
    } else {
      // Ensure at least one image field always exists
      setImagesList([
        {
          _id: Date.now(),
          url: "",
          altText: "",
          link: "",
          text: "",
          preview: "",
        },
      ]);
    }
  }, [formData?.images?.length]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      images: imagesList.map((img) => {
        return {
          url: img.url,
          text: img.text,
          altText: img.altText,
          link: img.link,
        };
      }),
    }));
  }, [imagesList]);

  //URL.createObjectURL(file) revoking them.
  useEffect(() => {
    return () => {
      imagesList.forEach((img) => {
        if (img.preview) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [imagesList]);

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

  const handleImageChange = async (e, _id) => {
    const file = e.target.files[0];
    if (!file || !validateFile(file)) return;

    const tempUrl = URL.createObjectURL(file);
    setUploadingIds((prev) => new Set(prev).add(_id));

    try {
      const form = new FormData();
      form.append("image", file);

      const imageName = await uploadImageAPI.uploadImage(
        form,
        authToken,
        "banner"
      );

      if (imageName?.public_id) {
        setImagesList((prev) =>
          prev.map((img) =>
            img._id === _id
              ? {
                  ...img,
                  url: imageName.public_id,
                  preview: tempUrl,
                }
              : img
          )
        );
      }
    } catch (err) {
      console.error("Image upload failed", err);
      toast.error("Error uploading image.");
    } finally {
      setUploadingIds((prev) => {
        const updated = new Set(prev);
        updated.delete(_id);
        return updated;
      });
    }
  };

  const handleFieldChange = (_id, field, value) => {
    setImagesList((prev) =>
      prev.map((img) => (img._id === _id ? { ...img, [field]: value } : img))
    );
  };

  const handleAddImage = () => {
    setImagesList((prev) => [
      ...prev,
      {
        _id: Date.now(),
        url: "",
        altText: "",
        link: "",
        text: "",
        preview: "",
      },
    ]);
  };

  const handleRemoveImage = (_id) => {
    if (imagesList.length === 1) {
      toast.error("At least one image is required.");
      return;
    }
    setImagesList((prev) => prev.filter((img) => img._id !== _id));
  };

  return (
    <div className="mb-4">
      <CRow className="mb-3">
        <CCol>
          <CButton color="primary" onClick={handleAddImage}>
            + Add More Image
          </CButton>
        </CCol>
      </CRow>

      {imagesList.map((img, index) => (
        <CRow
          key={img._id}
          className="mb-3 p-2"
          style={{ border: "1px solid #ddd", borderRadius: "8px" }}
        >
          {/* Image Upload */}
          <CCol xs={12} md={3}>
            <CFormLabel>
              Image {index + 1} <span className="text-danger">*</span>
            </CFormLabel>
            <CFormInput
              key={img.id || img._id}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, img._id)}
              invalid={!img.url && errors.images}
            />
            {uploadingIds.has(img._id) ? (
              <CSpinner size="sm" className="mt-2" />
            ) : (
              img.preview &&
              img.preview.trim() !== "" && (
                <img
                  src={img.preview}
                  alt={`Preview ${index + 1}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "120px",
                    marginTop: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />
              )
            )}
          </CCol>

          {/* Alt Text */}
          <CCol xs={12} md={3}>
            <CFormLabel>
              Alt Text <span className="text-danger">*</span>
            </CFormLabel>
            <CFormInput
              type="text"
              value={img.altText}
              onChange={(e) =>
                handleFieldChange(img._id, "altText", e.target.value)
              }
              invalid={!img.altText && errors.images}
            />
          </CCol>

          {/* Link */}
          <CCol xs={12} md={3}>
            <CFormLabel>Link</CFormLabel>
            <CFormInput
              type="text"
              value={img.link}
              onChange={(e) =>
                handleFieldChange(img._id, "link", e.target.value)
              }
            />
          </CCol>

          {/* Text */}
          <CCol xs={12} md={2}>
            <CFormLabel>Text</CFormLabel>
            <CFormInput
              type="text"
              value={img.text}
              onChange={(e) =>
                handleFieldChange(img._id, "text", e.target.value)
              }
              invalid={!img.text && errors.images}
            />
          </CCol>

          {/* Remove Button */}
          <CCol xs={12} md={1} className="d-flex align-items-end">
            <CButton
              color="danger"
              variant="outline"
              onClick={() => handleRemoveImage(img._id)}
            >
              ❌
            </CButton>
          </CCol>
        </CRow>
      ))}
    </div>
  );
};

export default ImagesSection;
