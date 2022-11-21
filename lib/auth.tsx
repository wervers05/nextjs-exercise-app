import axios from "axios";

export const getUserProfile = async () => {
  const { data } = await axios.get("/api/profile");
  return data;
};
