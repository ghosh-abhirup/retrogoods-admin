"use client";

import Button from "@/components/common/Button";
import CommonBreadCrumbs from "@/components/common/CommonBreadCrumbs";
import React from "react";
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
  return (
    <div>
      <CommonBreadCrumbs data={breadcrumb} />

      <div className="flex items-center justify-between">
        <p className="text-xl font-bold uppercase">Products</p>
        <Button type="button" click={() => {}}>
          <p>
            <span className="mr-2">
              <FaPlus />
            </span>
            Add Product
          </p>
        </Button>
      </div>
    </div>
  );
};

export default ProductsPage;
