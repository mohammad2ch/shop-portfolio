import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createProduct = async (productData) => {
  const { data } = await axios.post(
    "http://localhost:3001/products",
    productData
  );

  return data;
};

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export default useCreateProduct;