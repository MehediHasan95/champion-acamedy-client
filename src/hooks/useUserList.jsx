import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

function useUserList() {
  const { user, loading } = useAuth();
  const [instance] = useAxiosSecure();

  const {
    refetch,
    data: allUser,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    enabled: !loading,
    queryFn: async () => {
      const res = await instance.get(`/users?uid=${user?.uid}`);
      return res.data;
    },
  });
  return [allUser, refetch, isLoading];
}

export default useUserList;
