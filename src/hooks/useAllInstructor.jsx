import axios from "axios";
import { useEffect, useState } from "react";

function useAllInstructor() {
  const [allInstructor, setAllInstructor] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/all-instructor")
      .then((res) => setAllInstructor(res.data));
  }, []);

  return [allInstructor, setAllInstructor];
}

export default useAllInstructor;
