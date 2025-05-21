import axiosInstance from "@/axiosInstance"

export const addProduct = (payload: Object) => {
    return axiosInstance.post('/admin/add', payload);
}
export const getProduct = () => {
    return axiosInstance.get('/admin/products', {
        params: {
            page: 1
        }
    });
}