import axios from "axios";

const show = slug => axios.get(`products/${slug}`);

const fetch = () => axios.get("products");

const productApi = { show, fetch };

export default productApi;
