import { useCallback, useEffect, useState } from "react";
import CreateNewBanner from "../../components/banner/CreateNewBanner";
import { useNavigate, useParams } from "react-router";
import { bannerAPI, storeAPI } from "../../api";
import { toast } from "react-toastify";

const CreateBanner = () => {
  const { _id } = useParams(); // edit or view
  const navigate = useNavigate();
  const isEditMode = Boolean(_id);
  const authToken = localStorage.getItem("authToken");

  const [formData, setFormData] = useState({
    name: "",
    store: "",
    images: [],
    position: "",
    page: "",
  });

  const [storeList, setStoreList] = useState([]);
  const [errors, setErrors] = useState({});

  const getStoreList = useCallback(async () => {
    try {
      const res = await storeAPI.getStore(authToken);
      if (res.success) setStoreList(res.data);
    } catch (error) {
      console.error("Error fetching store list", error);
    }
  }, [authToken]);

  const fetchBanner = async () => {
    try {
      const res = await bannerAPI.getBanner(authToken, { _id });
      if (res.success) {
        const data = res.data;
        setFormData({
          name: data.name || "",
          store: data.store?._id || "",
          images: data.images,
          position: data.position || "",
          page: data.page || "",
        });
      }
    } catch (error) {
      console.error("Error fetching Banner", error);
    }
  };

  useEffect(() => {
    getStoreList();
    if (isEditMode) fetchBanner();
  }, [isEditMode, getStoreList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Banner name is required";
    if (!formData.store) newErrors.store = "Store is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.page.trim()) newErrors.page = "Page is required";
    if (!formData.images || formData.images.length === 0) {
      newErrors.images = { _error: "Please add at least one image" };
    } else {
      const imageErrors = {};
      formData.images.forEach((img) => {
        const imgErr = {};
        if (!img.url) imgErr.url = "Image is required";
        if (!img.altText?.trim()) imgErr.altText = "Alt Text is required";
        if (!img.text?.trim()) imgErr.text = "Text is required";
        if (Object.keys(imgErr).length > 0) {
          imageErrors[img.id] = imgErr;
        }
      });

      if (Object.keys(imageErrors).length > 0) {
        newErrors.images = imageErrors;
      }
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const sanitizedFormData = {
        ...formData,
        name: formData.name?.toUpperCase() || "",
        images: formData.images.map((img) => {
          const imageObj = {
            url: img.url,
            altText: img.altText,
          };

          if (img.text && img.text.trim() !== "") {
            imageObj.text = img.text;
          }

          if (img.link && img.link.trim() !== "") {
            imageObj.link = img.link;
          }

          return imageObj;
        }),
      };

      let res;
      if (isEditMode) {
        res = await bannerAPI.updateBanner(
          { _id, ...sanitizedFormData },
          authToken
        );
      } else {
        res = await bannerAPI.createBanner(sanitizedFormData, authToken);
      }

      if (res.success) {
        toast.success(
          `Banner ${isEditMode ? "updated" : "created"} successfully!`
        );
        navigate("/banner"); // 👈 change if route is different
      } else {
        toast.error("Failed to save banner");
      }
    } catch (error) {
      console.error("Error saving banner", error);
      toast.error(
        "An error occurred: " + error?.data?.message || error.message
      );
    }
  };

  return (
    <CreateNewBanner
      mode={isEditMode ? "edit" : "create"}
      formData={formData}
      setFormData={setFormData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      storeList={storeList}
      errors={errors}
    />
  );
};

export default CreateBanner;
