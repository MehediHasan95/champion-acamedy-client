import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useContact = () => {
  const { user, loading } = useAuth();
  const [instance] = useAxiosSecure();

  const {
    refetch,
    data: allcontacts,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    enabled: !loading,
    queryFn: async () => {
      const res = await instance.get(`/contacts?uid=${user?.uid}`);
      return res.data;
    },
  });
  return [allcontacts, refetch, isLoading, user];
};

export default useContact;
