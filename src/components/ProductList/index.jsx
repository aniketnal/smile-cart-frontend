import { useState } from "react";

import { Header } from "components/commons";
import useDebounce from "hooks/Debounce";
import { useFetchProduct } from "hooks/reactQuery/useProductsApi";
import { Search } from "neetoicons";
import { Input, NoData, Spinner, Pagination } from "neetoui";
import { isEmpty } from "ramda";

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from "./constants";
import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");
  const debouncedSearchKey = useDebounce(searchKey);

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  const productParams = {
    searchTerm: debouncedSearchKey,
    page: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProduct(productParams);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen flex-col ">
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
              onChange={e => {
                setSearchKey(e.target.value);
                setCurrentPage(DEFAULT_PAGE_INDEX);
              }}
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
      <div className="mb-5 self-end">
        <Pagination
          className="flex justify-center"
          count={totalProductsCount}
          navigate={page => setCurrentPage(page)}
          pageNo={currentPage || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </>
  );
};

export default ProductList;
