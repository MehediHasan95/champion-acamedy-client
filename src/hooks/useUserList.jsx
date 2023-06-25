import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useUserList() {
  const {
    refetch,
    data: allUser,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users");
      return res.data;
    },
  });
  return [allUser, refetch, isLoading];
}

export default useUserList;
