import { Product } from "@/utility/types";
import { create } from "zustand";

interface ProductStore {
    page: number,
    products: Array<Product> | null,
    pagination: {
        totalPages: number,
        page: number
    } | null,
    setProducts: (data: Array<Product> | null) => void,
    setPagination: (data: {
        totalPages: number,
        page: number
    } | null) => void,
    setPage: (data: number) => void,

    productDetails: Product | null,
    setProductDetails: (data: Product | null) => void

}

const useProductStore = create<ProductStore>((set) => ({
    page: 1,
    products: null,
    pagination: null,
    setProducts: (data) => set({ products: data }),
    setPagination: (data) => set({ pagination: data }),
    setPage: (data) => set({ page: data }),
    productDetails: null,
    setProductDetails: (data) => set({ productDetails: data })
}))

export default useProductStore;