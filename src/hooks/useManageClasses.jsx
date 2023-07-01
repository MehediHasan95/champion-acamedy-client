import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

function useManageClasses() {
  const { user, loading } = useAuth();

  const [instance] = useAxiosSecure();
  const {
    refetch,
    data: manageClasses,
    isLoading,
  } = useQuery({
    queryKey: ["manage-classes"],
    enabled: !loading,
    queryFn: async () => {
      const res = await instance.get(`/manage-classes?uid=${user?.uid}`);
      return res.data;
    },
  });

  return [manageClasses, refetch, isLoading];
}

export default useManageClasses;
