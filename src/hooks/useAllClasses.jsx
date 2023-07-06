import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useAllClasses() {
  const { data: allClasses, isLoading } = useQuery({
    queryKey: ["all-classes"],
    queryFn: async () => {
      const res = await axios.get(
        "https://b7a12-summer-camp-server-side-mehedi-hasan95.vercel.app/all-classes"
      );
      return res.data;
    },
  });
  return [allClasses, isLoading];
}

export default useAllClasses;
