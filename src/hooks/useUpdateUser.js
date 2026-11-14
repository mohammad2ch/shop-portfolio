import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateUser = async ({ id, userData }) => {
  const { data } = await axios.patch(
    `http://localhost:3001/users/${id}`,
    userData
  );

  return data;
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export default useUpdateUser;