import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

function useRole() {
  const { user, loading } = useAuth();
  const [instance] = useAxiosSecure();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role-check"],
    enabled: !loading,
    queryFn: async () => {
      const res = await instance.get(`/role-check?uid=${user?.uid}`);
      return res.data;
    },
  });
  return [role, isLoading];
}

export default useRole;
