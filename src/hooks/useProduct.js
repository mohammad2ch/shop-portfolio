import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getProduct = async (id) => {
  const res = await axios.get(`http://localhost:3001/products/${id}`);
  return res.data;
};

const useProduct = (id) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id),
    staleTime: 1000 * 60 * 2,
    retry: 1, // اگر محصول وجود نداشت، زود خطا بدهد
  });

export default useProduct;