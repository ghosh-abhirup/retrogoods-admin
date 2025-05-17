import axiosInstance from "@/axiosInstance"

export const getUser = async () => {
    const res = await axiosInstance.get("/users/profile", { withCredentials: true });
    return res.data.data;
}

export const editUser = async (payload: {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
}) => {
    const { id, ...data } = payload;
    return axiosInstance.put(`/users/${id}/edit`, data);
}