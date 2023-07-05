import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

function usePaymentHistory() {
  const { user, loading } = useAuth();
  const [instance] = useAxiosSecure();

  const {
    refetch,
    data: paymentHistory,
    isLoading,
  } = useQuery({
    queryKey: ["payment-history"],
    enabled: !loading,
    queryFn: async () => {
      const res = await instance.get(`/payment-history/${user?.uid}`);
      return res.data;
    },
  });
  return [paymentHistory, isLoading, refetch];
}

export default usePaymentHistory;
