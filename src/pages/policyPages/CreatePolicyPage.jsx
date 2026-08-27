import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { policyPagesAPI } from "../../api";
import CreateNewPolicyPage from "../../components/policyPages/CreateNewPolicyPage";
import { toast } from "react-toastify";

const CreatePolicyPage = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const isEditMode = Boolean(_id);
  const authToken = localStorage.getItem("authToken");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({});

  const viewPolicyPage = async () => {
    try {
      const res = await policyPagesAPI.getPolicyPage(authToken, { _id });

      if (res.success) {
        setFormData({
          title: res.data.title || "",
          content: res.data.content || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch policy page", error);
    }
  };

  useEffect(() => {
    if (isEditMode) viewPolicyPage();
  }, [isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      let res;
      if (isEditMode) {
        res = await policyPagesAPI.updatePolicyPage(
          { _id, ...formData },
          authToken
        );
      } else {
        res = await policyPagesAPI.createPolicyPage(formData, authToken);
      }

      if (res.success) {
        toast.success(
          `Policy Page ${isEditMode ? "updated" : "created"} successfully!`
        );
        navigate("/policy-page");
      } else {
        toast.error("Failed to save Policy Page.");
      }
    } catch (error) {
      console.error("Error saving Policy Page:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <CreateNewPolicyPage
      mode={isEditMode ? "edit" : "create"}
      formData={formData}
      handleChange={handleChange}
      errors={errors}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreatePolicyPage;
