import axios from "axios";

const show = slug => axios.get(`products/${slug}`);

const fetch = params => axios.get("products", { params });

const productApi = { show, fetch };

export default productApi;
