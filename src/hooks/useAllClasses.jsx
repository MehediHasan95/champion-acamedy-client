import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useAllClasses() {
  const {
    refetch,
    data: allClasses,
    isLoading,
  } = useQuery({
    queryKey: ["all-classes"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/all-classes");
      return res.data;
    },
  });
  return [allClasses, isLoading];
}

export default useAllClasses;
