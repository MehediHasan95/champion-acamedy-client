import axios from "axios";
import { useEffect, useState } from "react";

function useAllInstructor() {
  const [allInstructor, setAllInstructor] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://b7a12-summer-camp-server-side-mehedi-hasan95.vercel.app/all-instructor"
      )
      .then((res) => setAllInstructor(res.data));
  }, []);

  return [allInstructor, setAllInstructor];
}

export default useAllInstructor;
