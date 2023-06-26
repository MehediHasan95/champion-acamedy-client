import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

function useRole() {
  const { user, loading } = useContext(AuthContext);
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
