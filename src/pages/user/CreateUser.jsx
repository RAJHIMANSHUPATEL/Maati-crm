import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { userAPI } from "../../api";
import { useEffect } from "react";
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
  });

  const [errors, setErrors] = useState({});

  const viewUser = async () => {
    try {
      const res = await userAPI.getUser(authToken, { _id });

      if (res.success) {
        const user = res.data;
        setFormData({
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email || "",
          gender: user.gender || "",
          mobile: user.mobile || "",
          country_code: user.country_code || "",
        });
      }
    } catch (error) {
      console.error("Error fetching User:", error);
    }
  };

  useEffect(() => {
    if (isEditMode) viewUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Remove error on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
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

    try {
      let res;
      if (isEditMode) {
        const updatedPayload = {
          _id,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          gender: formData.gender,
          mobile: formData.mobile,
          country_code: formData.country_code,
        };
        res = await userAPI.updateUser(updatedPayload, authToken);
      } else {
        res = await userAPI.registerUser(
          {
            ...formData,
            type: "admin",
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
      errors={errors}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateUser;
