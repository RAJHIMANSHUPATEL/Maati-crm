import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { categoryAPI, subCategoryAPI } from "../../api";
import CreateNewSubCategory from "../../components/subCategory/CreateNewSubCategory";
import { toast } from "react-toastify";

const CreateSubCategory = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const isEditMode = Boolean(_id);
  const authToken = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    store: "",
    cover: null,
  });
  const [categoryList, setCategoryList] = useState([]);
  const [errors, setErrors] = useState({});

  const viewSubCategory = async () => {
    try {
      const res = await subCategoryAPI.getSubCategory(authToken, { _id });

      if (res.success) {
        const subCategory = res.data;
        setFormData({
          name: subCategory.name || "",
          category: subCategory.category._id || "",
          cover: subCategory.cover,
        });
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const getCategoryList = async () => {
    try {
      const res = await categoryAPI.getCategory(authToken);
      if (res.success) {
        setCategoryList(res.data);
      }
    } catch (error) {
      console.error("Error getting category ", error);
    }
  };

  useEffect(() => {
    if (isEditMode) viewSubCategory();
    getCategoryList();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newValue = value;

    if (name === "name") newValue = value.toUpperCase();

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
    if (!formData.name.trim()) newErrors.name = "Subcategory name is required";
    if (!formData.cover) newErrors.cover = "Image is required";
    if (!formData.category) newErrors.category = "Category is required";
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
      let res;
      if (isEditMode) {
        const updatedPayload = {
          _id,
          ...formData,
        };
        res = await subCategoryAPI.updateSubCategory(updatedPayload, authToken);
      } else {
        res = await subCategoryAPI.createSubCategory(formData, authToken);
      }

      if (res.success) {
        toast.success(
          `Sub Category ${isEditMode ? "updated" : "created"} successfully!`
        );
        setFormData(res.data);
        navigate("/sub-category");
      } else {
        toast.error("Failed to save Sub Category.");
      }
    } catch (error) {
      console.error("Error creating Category ", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <CreateNewSubCategory
      mode={isEditMode ? "edit" : "create"}
      formData={formData}
      setFormData={setFormData}
      handleChange={handleChange}
      errors={errors}
      handleSubmit={handleSubmit}
      categoryList={categoryList}
    />
  );
};

export default CreateSubCategory;
