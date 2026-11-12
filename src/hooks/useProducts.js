import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getProducts = async () => {
  const res = await axios.get("http://localhost:3001/products");
  return res.data;
};

const useProducts = () =>
  useQuery({
    queryKey: ["products", "all"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
  });

export default useProducts;
