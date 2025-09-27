import { Header, PageNotFound, PageLoader } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import i18n from "i18next";
import { Typography, Button } from "neetoui";
import { isNotNil } from "ramda";
import { useParams } from "react-router-dom";
import routes from "routes";
import withTitle from "utils/withTitle";

import Carousel from "./Carousel";

const Product = () => {
  const { slug } = useParams();

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const { data: product = {}, isLoading, isError } = useShowProduct(slug);

  // fetching data from api using axios
  // const fetchProducts = async () => {
  //   try {
  //     const product = await productsApi.show(slug);
  //     // no need for writing response.data --> direct response is sent, cz of axios response interceptors
  //     setProduct(product);
  //   } catch (error) {
  //     setIsError(true);
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // data is fetched on initial render
  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  if (isError) {
    return <PageNotFound />;
  }

  if (isLoading) {
    return <PageLoader />;
  }

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  return (
    <div className="px-2 pb-6">
      <div className="flex-col space-x-6">
        <div className="">
          <Header title={name} />
        </div>
        <div className="mt-6 flex justify-center gap-12">
          {isNotNil(imageUrls) ? (
            <Carousel />
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
            <div className="flex space-x-4">
              <AddToCart {...{ slug }} />
              <Button
                className="bg-neutral-800 hover:bg-neutral-950"
                label="Buy now"
                size="large"
                to={routes.checkout}
                onClick={() => setSelectedQuantity(selectedQuantity || 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTitle(Product, i18n.t("cart.product"));
