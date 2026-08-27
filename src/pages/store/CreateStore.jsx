import { useEffect, useState } from "react";
import CreateNewStore from "../../components/store/CreateNewStore";
import { storeAPI } from "../../api";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const CreateStore = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const isEditMode = Boolean(_id);
  const authToken = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    open_time: "",
    close_time: "",
    commission: "",
    mobile: "",
    notes: "",
    abn: "",
    city: "",
    cover: "",
    email: "",
    pin: "",
    deliveryCharges: "",
  });

  const [errors, setErrors] = useState({});

  const viewStore = async () => {
    try {
      const res = await storeAPI.getStore(authToken, { _id });

      if (res.success) {
        const store = res.data;
        setFormData({
          name: store.name || "",
          address: store.address || "",
          open_time: store.open_time || "",
          close_time: store.close_time || "",
          commission: store.commission || "",
          mobile: store.mobile || "",
          notes: store.notes || "",
          abn: store.abn || "",
          city: store.city || "",
          cover: store.cover, // fallback if editing without re-upload
          email: store.email || "",
          pin: store.pin || "",
          deliveryCharges: store.deliveryCharges || "",
        });
      }
    } catch (error) {
      console.error("Error fetching store:", error);
    }
  };

  useEffect(() => {
    if (isEditMode) viewStore();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === "commission" || name === "deliveryCharges") {
      finalValue = parseFloat(value) || 0; // Ensures numeric type for commission and deliveryCharges
    }

    if (name === "name") {
      finalValue = value.toUpperCase();
    }
    setFormData({
      ...formData,
      [name]: finalValue,
    });

    // Remove error on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };
  // console.log(formData);
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Store Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.open_time) newErrors.open_time = "Opening Time is required";
    if (!formData.close_time) newErrors.open_time = "Closing Time is required";
    if (formData.commission == null || formData.commission === "")
      newErrors.commission = "Commission is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile Number is required";
    if (!formData.abn.trim()) newErrors.abn = "ABN Number is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.cover) newErrors.cover = "Image is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.pin.trim()) {
      newErrors.pin = "PIN is required";
    } else if (formData.pin.length < 4) {
      newErrors.pin = "PIN must be at least 4 characters";
    }

    if (formData.deliveryCharges === "" || formData.deliveryCharges < 0) {
      newErrors.deliveryCharges = "Delivery Charges must be a positive number";
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
    // console.log(validationErrors);
    try {
      let res;
      if (isEditMode) {
        const updatedPayload = {
          _id,
          ...formData, // includes name, address, etc.
        };
        res = await storeAPI.updateStore(updatedPayload, authToken);
      } else {
        res = await storeAPI.createStore(formData, authToken);
      }
      if (res.success) {
        toast.success(
          `Store ${isEditMode ? "updated" : "created"} successfully!`
        );
        navigate("/store");
      } else {
        toast.error("Failed to save Store.");
      }
    } catch (error) {
      console.error("ERROR CREATE STORE", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <CreateNewStore
        mode={isEditMode ? "edit" : "create"}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default CreateStore;
