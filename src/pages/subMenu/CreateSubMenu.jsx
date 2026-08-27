import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import CreateNewSubMenu from "../../components/subMenu/CreateNewSubMenu";
import { categoryAPI, storeAPI, subMenuAPI } from "../../api";

const CreateSubMenu = () => {
  const { _id } = useParams(); // edit or view
  const navigate = useNavigate();
  const isEditMode = Boolean(_id);
  const authToken = localStorage.getItem("authToken");

  const [formData, setFormData] = useState({
    name: "",
    store: "",
    categories: [],
  });

  const [storeList, setStoreList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [errors, setErrors] = useState({});

  // 🔄 Store List Fetch
  const getStoreList = useCallback(async () => {
    try {
      const res = await storeAPI.getStore(authToken);
      if (res.success) setStoreList(res.data);
    } catch (error) {
      console.error("Error fetching store list", error);
    }
  }, [authToken]);

  // 🔄 Category List Fetch (based on store)
  const getCategoryList = useCallback(
    async (storeId) => {
      try {
        const res = await categoryAPI.getCategoryByStore(storeId, authToken);
        if (res) setCategoryList(res);
      } catch (error) {
        console.error("Error fetching category list", error);
      }
    },
    [authToken]
  );

  // 🔍 Edit mode data fetch
  const fetchSubMenu = async () => {
    try {
      const res = await subMenuAPI.getSubMenu(authToken, { _id });
      if (res.success) {
        const data = res.data;
        setFormData({
          name: data.name || "",
          store: data.store?._id || "",
          categories:
            data.subMenu?.map((cat) => ({
              value: cat._id,
              label: cat.name,
            })) || [],
        });
        if (data.store?._id) getCategoryList(data.store._id);
      }
    } catch (error) {
      console.error("Error fetching sub menu", error);
    }
  };

  useEffect(() => {
    getStoreList();
    if (isEditMode) fetchSubMenu();
  }, [isEditMode, getStoreList]);

  // 🔄 On Store Change, Reset Categories
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if(name === "name") newValue = value.toUpperCase()

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
      ...(name === "store" && { categories: [] }), // Reset categories if store changes
    }));

    if (name === "store") {
      getCategoryList(newValue);
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // 🔍 Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Menu name is required";
    if (!formData.store) newErrors.store = "Store is required";
    if (formData.categories.length === 0)
      newErrors.categories = "Please select at least one category";
    return newErrors;
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        store: formData.store,
        subMenu: formData.categories.map((c) => c.value),
      };

      let res;
      if (isEditMode) {
        res = await subMenuAPI.updateSubMenu({ _id, ...payload }, authToken);
      } else {
        res = await subMenuAPI.createSubMenu(payload, authToken);
      }

      if (res.success) {
        toast.success(
          `Menu ${isEditMode ? "updated" : "created"} successfully!`
        );
        navigate("/menu"); // 👈 change if route is different
      } else {
        toast.error("Failed to save menu");
      }
    } catch (error) {
      console.error("Error saving menu", error);
      toast.error("An error occurred: " + error?.data?.message || error.message);
    }
  };

  return (
    <CreateNewSubMenu
      mode={isEditMode ? "edit" : "create"}
      formData={formData}
      setFormData={setFormData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      storeList={storeList}
      categoryList={categoryList}
      errors={errors}
    />
  );
};

export default CreateSubMenu;
