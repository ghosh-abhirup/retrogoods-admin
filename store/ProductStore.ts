import { Product } from "@/utility/types";
import { create } from "zustand";

interface ProductStore {
    products: Array<Product> | null,
    setProducts: (data: Array<Product> | null) => void,
}

const useProductStore = create<ProductStore>((set) => ({
    products: null,
    setProducts: (data) => set({ products: data })
}))

export default useProductStore;