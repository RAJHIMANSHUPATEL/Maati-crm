import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { storeAPI, userAPI } from "../../api";
import { toast } from "react-toastify";
import CreateNewUser from "../../components/user/CreateNewUser";

const CreateUser = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const isEditMode = Boolean(_id);
  const authToken = localStorage.getItem("authToken");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    mobile: "",
    country_code: "",
    password: "",
    type: "manager",
    stores: [],
    staff_code: "",
    staff_pin: "",
  });
  const [storeList, setStoreList] = useState([]);
  const [errors, setErrors] = useState({});

  const viewUser = async () => {
    try {
      const res = await userAPI.getUser(authToken, { _id });

      if (res.success) {
        const user = res.data;
        const type = user.type === "admin" ? "owner" : user.type;
        setFormData({
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email || "",
          gender: user.gender || "",
          mobile: user.mobile || "",
          country_code: user.country_code || "",
          type: type || "manager",
          stores: (user.stores || []).map((store) => store._id || store),
          staff_code: user.staff_code || "",
          staff_pin: user.staff_pin || "",
        });
      }
    } catch (error) {
      console.error("Error fetching User:", error);
    }
  };

  useEffect(() => {
    storeAPI.getStore(authToken).then((res) => {
      if (res.success) setStoreList(res.data || []);
    });
    if (isEditMode) viewUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleStoreToggle = (storeId) => {
    setFormData((prev) => {
      const stores = prev.stores.includes(storeId)
        ? prev.stores.filter((id) => id !== storeId)
        : [...prev.stores, storeId];
      return { ...prev, stores };
    });
    if (errors.stores) {
      setErrors({ ...errors, stores: null });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First Name is required";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10,15}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    if (!formData.country_code.trim()) {
      newErrors.country_code = "Country code is required";
    }

    if (!formData.type) {
      newErrors.type = "Role is required";
    }

    if (formData.type === "manager" || formData.type === "cashier") {
      if (!/^\d{4}$/.test(formData.staff_code || "")) {
        newErrors.staff_code = "4-digit operator number";
      }
      if (!/^\d{4}$/.test(formData.staff_pin || "")) {
        newErrors.staff_pin = "4-digit PIN";
      }
      if (!formData.stores.length) {
        newErrors.stores = "Assign at least one store";
      }
    }

    if (!isEditMode) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
          formData.password
        )
      ) {
        newErrors.password =
          "8-20 chars with upper, lower, number, and special character";
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

    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      gender: formData.gender,
      mobile: formData.mobile,
      country_code: formData.country_code,
      type: formData.type,
      stores: formData.type === "owner" ? [] : formData.stores,
      staff_code: formData.staff_code || undefined,
      staff_pin: formData.staff_pin || undefined,
    };

    try {
      let res;
      if (isEditMode) {
        res = await userAPI.updateUser({ _id, ...payload }, authToken);
      } else {
        res = await userAPI.registerUser(
          {
            ...payload,
            password: formData.password,
            status: "active",
          },
          authToken
        );
      }
      if (res.success) {
        toast.success(
          `User ${isEditMode ? "updated" : "created"} successfully!`
        );
        navigate("/user");
      } else {
        toast.error(res.message || "Failed to save user.");
      }
    } catch (error) {
      console.error("ERROR Update User", error);
      toast.error(error?.data?.message || "An error occurred. Please try again.");
    }
  };
  return (
    <CreateNewUser
      mode={isEditMode ? "edit" : "create"}
      formData={formData}
      setFormData={setFormData}
      handleChange={handleChange}
      handleStoreToggle={handleStoreToggle}
      errors={errors}
      handleSubmit={handleSubmit}
      storeList={storeList}
    />
  );
};

export default CreateUser;
