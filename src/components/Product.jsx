import React, { useEffect, useState } from "react";

import axios from "axios";
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
      const response = await axios.get(
        "https://smile-cart-backend-staging.neetodeployapp.com/products/infinix-inbook-2"
      );

      setProduct(response.data);
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

  const {
    name,
    description,
    mrp,
    offer_price: offerPrice,
    image_urls: imageUrls,
    image_url: imageUrl,
  } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  return (
    <div className="px-6 pb-6">
      <div className="mt-16 flex">
        <div className="flex justify-center gap-4">
          {isNotNil(imageUrls) ? (
            <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
          ) : (
            <img alt={name} className="w-48" src={imageUrl} />
          )}
        </div>
        <div>
          <Typography className="py-2 text-4xl font-semibold" style="h1">
            {name}
          </Typography>
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
  );
};

export default Product;
