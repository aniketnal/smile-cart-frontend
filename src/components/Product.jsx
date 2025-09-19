import React, { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Typography, Spinner } from "neetoui";
import { append, isNotNil } from "ramda";

import Carousel from "./Carousel";

const Product = () => {
  // state to store the products data
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // fetching data from api using axios
  const fetchProducts = async () => {
    try {
      const product = await productsApi.show();
      // no need for writing response.data --> direct response is sent, cz axios interceptors are used
      setProduct(product);
    } catch (error) {
      console.log("Error fetching api response: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // data is fetched on initial render
  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  return (
    <div className="px-2 pb-6">
      <div className="mt-12 flex-col space-x-6">
        <div className="mt-2">
          <Typography className="mx-6 mb-2 mt-6" style="h1" weight="semibold">
            {name}
          </Typography>
          <hr className="neeto-ui-bg-black h-1" />
        </div>
        <div className="mt-6 flex justify-center gap-4">
          {isNotNil(imageUrls) ? (
            <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
          ) : (
            <img alt={name} className="w-48" src={imageUrl} />
          )}
          <div className="space-y-6 font-semibold">
            <Typography>{description}</Typography>
            <Typography>MRP: {mrp}</Typography>
            <Typography className="font-semibold">
              Offer price: {offerPrice}
            </Typography>
            <Typography className="font-semibold text-green-600">
              {discountPercentage}% off
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
