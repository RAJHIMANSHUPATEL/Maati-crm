import { useEffect, useState } from "react";
import CreateNewCategory from "../../components/category/CreateNewCategory";
import { useNavigate, useParams } from "react-router";
import { categoryAPI, storeAPI } from "../../api";
import { toast } from "react-toastify";
import { isManager, shouldLockStore } from "../../utils/staffSession";

const CreateCategory = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const isEditMode = Boolean(_id);
  const authToken = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    name: "",
    store: "",
    cover: null,
    isEcommerce: false,
  });
  const [storeList, setStoreList] = useState([]);
  const [errors, setErrors] = useState({});

  const viewCategory = async () => {
    try {
      const res = await categoryAPI.getCategory(authToken, { _id });

      if (res.success) {
        const category = res.data;
        setFormData({
          name: category.name || "",
          store: category.store._id || "",
          cover: category.cover,
          isEcommerce: category.isEcommerce || false,
        });
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const getStoreList = async () => {
    try {
      const res = await storeAPI.getStore(authToken);
      if (res.success) {
        setStoreList(res.data);
        if (isManager() && res.data[0]?._id) {
          setFormData((prev) => prev.store ? prev : { ...prev, store: res.data[0]._id });
        }
      }
    } catch (error) {
      console.error("Error getting store ", error);
    }
  };

  useEffect(() => {
    if (isEditMode) viewCategory();
    getStoreList();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newValue = value;

    if (name === "name") {
      newValue = value.toUpperCase();
    }

    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: newValue,
      });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Category name is required";
    if (!formData.store) newErrors.store = "Store is required";
    if (!formData.cover) newErrors.cover = "Category image is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // const data = new FormData();
    // data.append("name", formData.name);
    // data.append("cover", formData.image.name);

    try {
      let res;
      if (isEditMode) {
        const updatedPayload = {
          _id,
          ...formData,
        };
        res = await categoryAPI.updateCategory(updatedPayload, authToken);
      } else {
        res = await categoryAPI.createCategory(formData, authToken);
      }

      if (res.success) {
        toast.success(
          `Category ${isEditMode ? "updated" : "created"} successfully!`
        );
        setFormData(res.data);
        navigate("/category");
      } else {
        toast.error("Failed to save Category.");
      }
    } catch (error) {
      console.error("Error creating Category ", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <CreateNewCategory
      mode={isEditMode ? "edit" : "create"}
      formData={formData}
      setFormData={setFormData}
      handleChange={handleChange}
      errors={errors}
      handleSubmit={handleSubmit}
      storeList={storeList}
      storeLocked={shouldLockStore(storeList)}
    />
  );
};

export default CreateCategory;
