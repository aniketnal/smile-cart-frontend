import { keysToCamelCase } from "neetocist";
import { parse } from "qs";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();
  // ignores http://localhost:3000/products? takes: page and page_size
  const queryParams = parse(location.search, { ignoreQueryPrefix: true });

  // converts page and page_size to camelCase then returns them.
  return keysToCamelCase(queryParams);
};

export default useQueryParams;
