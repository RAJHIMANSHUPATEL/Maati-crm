import React from "react";
import CreateNewCoupon from "../../components/coupon/CreateNewCoupon";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { couponAPI, storeAPI } from "../../api";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CreateCoupon = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const isEditMode = Boolean(_id);
  const authToken = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    couponCode: "",
    store: "",
    description: "",
    discountType: null,
    discountValue: null,
    exp_date: null,
  });
  const [storeList, setStoreList] = useState([]);
  const [errors, setErrors] = useState({});

  const viewCoupon = async () => {
    try {
      const res = await couponAPI.getCoupon(authToken, { _id });

      if (res.success) {
        const coupon = res.data;
        setFormData({
          couponCode: coupon.couponCode || "",
          store: coupon.store._id || "",
          description: coupon.description || "",
          discountType: coupon.discountType,
          discountValue: coupon.discountValue,
          exp_date: coupon.exp_date
            ? new Date(coupon.exp_date).toISOString().slice(0, 16)
            : "",
        });
      }
    } catch (error) {
      console.error("Error fetching coupon:", error);
    }
  };

  const getStoreList = async () => {
    try {
      const res = await storeAPI.getStore(authToken);
      if (res.success) {
        setStoreList(res.data);
      }
    } catch (error) {
      console.error("Error getting store ", error);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      viewCoupon();
    }
    getStoreList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "discountValue") {
      newValue = parseInt(value, 10);
      if (isNaN(newValue)) {
        newValue = ""; // fallback for invalid inputs like empty string
      }
    }

    if(name === "couponCode") newValue = value.toUpperCase();

    setFormData({
      ...formData,
      [name]: newValue,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.couponCode.trim())
      newErrors.couponCode = "Coupon code is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.store) newErrors.store = "Store is required";
    if (!formData.discountType)
      newErrors.discountType = "Discount type is required";
    if (!formData.discountValue)
      newErrors.discountValue = "Discount value is required";
    if (!formData.exp_date) newErrors.exp_date = "Expiry date is required";
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
        res = await couponAPI.updateCoupon({ _id, ...formData }, authToken);
      } else {
        res = await couponAPI.createCoupon(formData, authToken);
      }

      if (res.success) {
        toast.success(
          `Coupon ${isEditMode ? "updated" : "created"} successfully!`
        );
        navigate("/coupon");
      } else {
        toast.error("Failed to save coupon.");
      }
    } catch (error) {
      console.error("Error saving coupon: ", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <CreateNewCoupon
      mode={isEditMode ? "edit" : "create"}
      formData={formData}
      setFormData={setFormData}
      handleChange={handleChange}
      errors={errors}
      handleSubmit={handleSubmit}
      storeList={storeList}
    />
  );
};

export default CreateCoupon;
