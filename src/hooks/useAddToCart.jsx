import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

function useAddToCart() {
  const { user, loading } = useAuth();
  const [instance] = useAxiosSecure();

  const {
    refetch,
    data: carts,
    isLoading,
  } = useQuery({
    queryKey: ["add-to-cart"],
    enabled: !loading,
    queryFn: async () => {
      const res = await instance.get(`/add-to-cart?uid=${user?.uid}`);
      return res.data;
    },
  });

  return [carts, refetch, isLoading];
}

export default useAddToCart;
