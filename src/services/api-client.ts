import axios from "axios";

export default axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI_DEV}/api/v1`,
});