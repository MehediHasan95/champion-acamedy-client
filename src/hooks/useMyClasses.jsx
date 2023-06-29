import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

function MyClasses() {
  const { user, loading } = useAuth();
  const [instance] = useAxiosSecure();

  const {
    refetch,
    data: myClasses,
    isLoading,
  } = useQuery({
    queryKey: ["myclasses"],
    enabled: !loading,
    queryFn: async () => {
      const res = await instance.get(`/myclasses?uid=${user?.uid}`);
      return res.data;
    },
  });
  console.log(myClasses);
  return [myClasses, refetch, isLoading];
}

export default MyClasses;
