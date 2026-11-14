
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUsers = async () => {
  const { data } = await axios.get("http://localhost:3001/users");

  // حذف رمز عبور از داده‌ای که وارد Query Cache می‌شود
  return data.map(({ password, ...user }) => user);
};

const useUsers = (enabled = true) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

export default useUsers;
