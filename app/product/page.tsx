"use client";

import Button from "@/components/common/Button";
import CommonBreadCrumbs from "@/components/common/CommonBreadCrumbs";
import Main from "@/components/common/Main";
import AddProduct from "@/components/Products/AddProduct";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

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

const ProductsPage = () => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  return (
    <Main>
      <div>
        <CommonBreadCrumbs data={breadcrumb} />

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold uppercase">Products</p>
          <Button type="button" click={() => setIsAddProductModalOpen(true)}>
            <p className="flex items-center gap-2 text-sm">
              <FaPlus />

              <span>Add Product</span>
            </p>
          </Button>
        </div>
      </div>

      {isAddProductModalOpen && <AddProduct open={isAddProductModalOpen} onChange={setIsAddProductModalOpen} />}
    </Main>
  );
};

export default ProductsPage;
