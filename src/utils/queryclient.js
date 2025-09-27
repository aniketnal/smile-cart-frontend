import { QueryClient, QueryCache } from "react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3_600_00,
    },
  },
});

export default queryClient;
