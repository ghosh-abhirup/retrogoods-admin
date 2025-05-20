import axiosInstance from "@/axiosInstance"

export const addProduct = (payload: Object) => {
    return axiosInstance.post('/admin/add', payload);
}