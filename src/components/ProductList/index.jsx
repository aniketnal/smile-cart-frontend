import { useState } from "react";

import { Header } from "components/commons";
import useDebounce from "hooks/Debounce";
import { useFetchProduct } from "hooks/reactQuery/useProductsApi";
import { Search } from "neetoicons";
import { Input, NoData, Spinner } from "neetoui";
import { isEmpty } from "ramda";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");
  const debouncedSearchKey = useDebounce(searchKey);

  const { data: { products = [] } = {}, isLoading } = useFetchProduct({
    searchTerm: debouncedSearchKey,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <Header
        // to give count of items inside cart
        shouldShowBackButton={false}
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder="Search Item"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem
              key={product.slug}
              // gives all fields in product as props
              {...product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
