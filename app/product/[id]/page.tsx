"use client";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Main from "@/components/common/Main";
import { getProduct } from "@/services/ProductServices";
import useProductStore from "@/store/ProductStore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const [callGetProductDetails, setCallGetProductDetails] = useState(true);
  const { productDetails, setProductDetails } = useProductStore();

  const { data: res, isPending } = useQuery({
    queryKey: ["product-details"],
    queryFn: () => getProduct(id.toString()),
    enabled: !!callGetProductDetails,
  });

  useEffect(() => {
    if (res && !isPending) {
      setProductDetails(res.data.data);
      setCallGetProductDetails(false);
    }
  }, [res]);
  return (
    <Main>
      <>
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <LoadingSpinner />
            <p>Fetching Products ...</p>
          </div>
        ) : (
          <div>
            <p>{productDetails?.name}</p>
            <p>{productDetails?.sku}</p>
          </div>
        )}
      </>
    </Main>
  );
};

export default ProductDetails;
