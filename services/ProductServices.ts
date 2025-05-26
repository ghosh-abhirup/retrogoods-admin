import axiosInstance from "@/axiosInstance"
import { UUID } from "crypto";

export const addProduct = (payload: Object) => {
    return axiosInstance.post('/admin/add', payload);
}
export const getProducts = (page: number) => {
    return axiosInstance.get('/admin/products', {
        params: {
            page: page
        }
    });
}

export const getProduct = (id: string) => {
    return axiosInstance.get(`/admin/product/${id}`);
}