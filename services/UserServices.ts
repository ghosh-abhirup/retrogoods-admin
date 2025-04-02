import axiosInstance from "@/axiosInstance"

export const getUser = async () => {
    const res = await axiosInstance.get("/users/profile", { withCredentials: true });
    return res.data.data;
}