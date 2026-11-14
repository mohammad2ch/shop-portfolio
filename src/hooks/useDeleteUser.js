
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteUser = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:3001/users/${id}`
  );

  return data;
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export default useDeleteUser;
