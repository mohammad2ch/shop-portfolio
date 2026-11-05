import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useUsdRate from "./useUsdRate";

const EMPTY = []; //  بی‌خودی دوباره حساب نکنه

const getBestSellers = async () => {
  const res = await axios.get("http://localhost:3001/products", {
    params: { _limit: 8 },
  });
  return res.data;
};

const useBestSellers = () => {
  const query = useQuery({
    queryKey: ["products", "best-sellers"],
    queryFn: getBestSellers,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
  });

  const { products, loading: rateLoading, error: rateError } = useUsdRate(
    query.data ?? EMPTY
  );

  return { ...query, data: products, rateLoading, rateError };
};

export default useBestSellers;