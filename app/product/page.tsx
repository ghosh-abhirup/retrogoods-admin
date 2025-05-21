"use client";

import Button from "@/components/common/Button";
import CommonBreadCrumbs from "@/components/common/CommonBreadCrumbs";
import CommonTable from "@/components/common/CommonTable";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Main from "@/components/common/Main";
import AddProduct from "@/components/Products/AddProduct";
import { getProduct } from "@/services/ProductServices";
import useProductStore from "@/store/ProductStore";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TableCell, TableRow } from "@/components/ui/table";

const breadcrumb = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Products",
    url: null,
  },
];

const ProductTableFields = ["name", "sku"];

const ProductsPage = () => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [callGetProduct, setcallGetProduct] = useState(true);
  const { setProducts, products } = useProductStore();

  const { data: res, isPending: isGetProductsPending } = useQuery({
    queryKey: ["get-product"],
    queryFn: getProduct,
    enabled: !!callGetProduct,
  });

  useEffect(() => {
    if (res && !isGetProductsPending) {
      console.log(res.data);
      setProducts(res.data.data);
      setcallGetProduct(false);
    }
  }, [res]);

  return (
    <Main>
      <div>
        <CommonBreadCrumbs data={breadcrumb} />

        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-bold uppercase">Products</p>
          <Button type="button" click={() => setIsAddProductModalOpen(true)}>
            <p className="flex items-center gap-2 text-sm">
              <FaPlus />

              <span>Add Product</span>
            </p>
          </Button>
        </div>
      </div>

      {isGetProductsPending ? (
        <div className="flex items-center justify-center gap-2">
          <LoadingSpinner />
          <p>Fetching Products ...</p>
        </div>
      ) : (
        <CommonTable tableFields={ProductTableFields}>
          <>
            {products?.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{product?.name}</TableCell>
                <TableCell>{product?.sku}</TableCell>
              </TableRow>
            ))}
          </>
        </CommonTable>
      )}

      {isAddProductModalOpen && <AddProduct open={isAddProductModalOpen} onChange={setIsAddProductModalOpen} callProduct={() => setcallGetProduct(true)} />}
    </Main>
  );
};

export default ProductsPage;
