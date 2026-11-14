import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createUser = async (userData) => {
  const { data } = await axios.post(
    "http://localhost:3001/users",
    userData
  );

  return data;
};

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export default useCreateUser;