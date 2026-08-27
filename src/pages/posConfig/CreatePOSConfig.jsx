import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { posConfigAPI, storeAPI } from "../../api";
import CreateNewPOSConfig from "../../components/posConfig/CreateNewPOSConfig";
import { toast } from "react-toastify";

const CreatePOSConfig = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const isEditMode = Boolean(_id);
  const authToken = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    store_ip: "",
    mac_address: "",
    weight_scale_port: "",
    store: "",
    baud_rate: "",
    data_bits: "",
    parity: "none",
    stop_bits: "",
    flow_type: false,
    printer_ip: "",
    printer_port: "",
    surcharge: "",
    pos_name: "",
    pos_pin: "",
  });

  const [errors, setErrors] = useState({});
  const [storeList, setStoreList] = useState([]);

  const viewPosConfig = async () => {
    try {
      const res = await posConfigAPI.getPosConfig(authToken, { _id });

      if (res.success) {
        setFormData({
          ...res.data,
          store: res.data.store._id,
        });
      }
    } catch (error) {
      console.error("Failed to fetch config", error);
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
    getStoreList();
    if (isEditMode) viewPosConfig();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let parsedValue =
      type === "checkbox"
        ? checked
        : [
            "baud_rate",
            "data_bits",
            "stop_bits",
            "printer_port",
            "surcharge",
          ].includes(name)
        ? parseInt(value, 10) || 0
        : value;

    if (name === "pos_name") parsedValue = value.toUpperCase();

    setFormData({
      ...formData,
      [name]: parsedValue,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};

    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const macRegex = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;

    if (!ipRegex.test(formData.store_ip)) newErrors.store_ip = "Invalid IP";
    if (!macRegex.test(formData.mac_address))
      newErrors.mac_address = "Invalid MAC address";
    if (!formData.weight_scale_port) newErrors.weight_scale_port = "Required";
    if (!formData.store) newErrors.store = "Required";
    if (!formData.baud_rate || formData.baud_rate < 0)
      newErrors.baud_rate = "Must be a positive number";
    if (!formData.data_bits) newErrors.data_bits = "Required";
    if (!["none", "even", "odd"].includes(formData.parity))
      newErrors.parity = "Invalid parity";
    if (!formData.stop_bits) newErrors.stop_bits = "Required";
    if (formData.flow_type === null) newErrors.flow_type = "Required";
    if (!ipRegex.test(formData.printer_ip)) newErrors.printer_ip = "Invalid IP";
    if (formData.printer_port < 0 || formData.printer_port > 65535)
      newErrors.printer_port = "Invalid port";
    if (formData.surcharge < 0)
      newErrors.surcharge = "Surcharge must be positive";
    if (!formData.pos_name) newErrors.pos_name = "POS name required";
    if (!/^\d{4}$/.test(formData.pos_pin))
      newErrors.pos_pin = "POS PIN must be 4 digits";

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
      const cleanedData = {
        ...formData,
        baud_rate: Number(formData.baud_rate),
        data_bits: Number(formData.data_bits),
        stop_bits: Number(formData.stop_bits),
        printer_port: Number(formData.printer_port),
        surcharge: Number(formData.surcharge),
      };
      let res;
      if (isEditMode) {
        res = await posConfigAPI.updatePosConfig(
          { _id, ...cleanedData },
          authToken
        );
      } else {
        res = await posConfigAPI.createPosConfig(cleanedData, authToken);
      }

      if (res.success) {
        toast.success(
          `POS Configuration ${
            isEditMode ? "updated" : "created"
          } successfully!`
        );
        setFormData(res.data);
        navigate("/pos-config");
      } else {
        toast.error("Failed to save POS configuration.");
      }
    } catch (error) {
      console.error("Error saving POS Configuration:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <CreateNewPOSConfig
      mode={isEditMode ? "edit" : "create"}
      formData={formData}
      handleChange={handleChange}
      errors={errors}
      handleSubmit={handleSubmit}
      storeList={storeList}
    />
  );
};

export default CreatePOSConfig;
