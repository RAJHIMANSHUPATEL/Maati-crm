import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import CreateNewProduct from "../../components/product/CreateNewProduct";
import { useNavigate, useParams } from "react-router";
import { categoryAPI, productAPI, storeAPI, subCategoryAPI } from "../../api";
import { isManager, shouldLockStore } from "../../utils/staffSession";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const isEditMode = Boolean(_id);
  const uploaderRef = useRef();
  const authToken = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    name: "",
    store: "",
    category: "",
    subCategory: "",
    onlinePrice: "",
    discount: "",
    sellingPrice: "",
    discountGiven: "",
    posPrice: "",
    quantity: "",
    quantityUnit: "",
    size: "",
    stockStatus: "",
    description: "",
    cover: null,
    images: [],
  });

  const [storeList, setStoreList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [errors, setErrors] = useState({});

  const viewProduct = useCallback(async () => {
    try {
      const res = await productAPI.getProduct(authToken, { _id });

      if (res.success) {
        const product = res.data;

        if (product.store?._id) {
          await getCategoryList(product.store._id);
        }
        if (product.category?._id) {
          await getSubCategoryList(product.category._id);
        }

        setFormData({
          name: product.name || "",
          store: product.store?._id || "",
          category: product.category?._id || "",
          subCategory: product.subCategory?._id || "",
          onlinePrice: product.onlinePrice || 0,
          discount: product.discount || 0,
          sellingPrice: product.sellingPrice || 0,
          discountGiven: product.discountGiven || 0,
          posPrice: product.posPrice || 0,
          quantity: product.quantity || 0,
          quantityUnit: product.quantityUnit || "",
          size: product.size || "", // Might be an object/variation — adjust accordingly
          stockStatus: product.stockStatus || "",
          description: product.description || "",
          cover: product.cover || null,
          images: product.images || [],
        });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }, [_id, authToken]);

  const getStoreList = useCallback(async () => {
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
  }, [authToken]);

  const getCategoryList = useCallback(
    async (storeId) => {
      try {
        const res = await categoryAPI.getCategoryByStore(storeId, authToken);
        if (res) {
          setCategoryList(res);
        }
      } catch (error) {
        console.error("Error getting category ", error);
      }
    },
    [authToken]
  );

  const getSubCategoryList = useCallback(
    async (categoryId) => {
      try {
        const res = await subCategoryAPI.getSubCategoryByCategory(
          categoryId,
          authToken
        );
        if (res) {
          setSubCategoryList(res);
        }
      } catch (error) {
        console.error("Error getting subcategories: ", error);
      }
    },
    [authToken]
  );

  // Fetch Store + Product Data
  useEffect(() => {
    if (isEditMode) viewProduct();
    getStoreList();
  }, []);

  // When Store Changes → Clear old values and fetch categories
  useEffect(() => {
    if (!formData.store) return;

    getCategoryList(formData.store);
    if (!isEditMode) {
      setCategoryList([]); // Clear old list during transition
      setSubCategoryList([]);
      setFormData((prev) => ({ ...prev, category: "", subCategory: "" }));
    }
  }, [formData.store]);

  // When Category Changes → Clear old value and fetch subcategories
  useEffect(() => {
    if (!formData.category) return;
    getSubCategoryList(formData.category);
    if (!isEditMode) {
      setSubCategoryList([]);
      setFormData((prev) => ({ ...prev, subCategory: "" }));
    }
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...formData, [name]: value };

    if (["onlinePrice", "discount"].includes(name)) {
      const online =
        parseFloat(name === "onlinePrice" ? value : formData.onlinePrice) || 0;
      const discount =
        parseFloat(name === "discount" ? value : formData.discount) || 0;

      const selling = online - (online * discount) / 100;
      updated.sellingPrice = selling.toFixed(2);
      updated.discountGiven = (online - selling).toFixed(2);
    }

    if (name === "name") updated.name = value.toUpperCase();

    setFormData(updated);
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = {
      name: "Product Name",
      store: "Store",
      category: "Category",
      subCategory: "Subcategory",
      onlinePrice: "Online Price",
      posPrice: "POS Price",
      quantity: "Quantity",
      quantityUnit: "Quantity Unit",
      size: "Size",
      stockStatus: "Stock Status",
      cover: "Cover Image",
      description: "Description"
    };
    Object.entries(requiredFields).forEach(([key, label]) => {
      if (!formData[key]) newErrors[key] = `${label} is required`;
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploaderRef.current.validateSupportingBeforeSubmit()) return;
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form");
      return;
    }
    const payload = {
      ...formData,
      onlinePrice: Number(formData.onlinePrice),
      sellingPrice: Number(formData.sellingPrice),
      discount: Number(formData.discount),
      quantity: Number(formData.quantity),
      posPrice: Number(formData.posPrice),
      stockStatus: formData.stockStatus === "true" ? true : false,
    };
    try {
      let res;
      if (isEditMode) {
        res = await productAPI.updateProduct({ _id, ...payload }, authToken);
      } else {
        res = await productAPI.createProduct(payload, authToken);
      }

      if (res.success) {
        toast.success(
          `Product ${isEditMode ? "updated" : "created"} successfully!`
        );
        setFormData(res.data);
        navigate("/product");
      } else {
        toast.error("Failed to save Product.");
      }
    } catch (error) {
      console.error("Error creating Product ", error);
      toast.error("An error occurred. Please try again.");
    }

    // toast.success("Form submitted successfully!");
    // console.log("Submit Data", formData);
  };

  return (
    <CreateNewProduct
      ref={uploaderRef}
      mode={isEditMode ? "edit" : "create"}
      formData={formData}
      setFormData={setFormData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      storeList={storeList}
      categoryList={categoryList}
      subCategoryList={subCategoryList}
      errors={errors}
      storeLocked={shouldLockStore(storeList)}
    />
  );
};

export default CreateProduct;
