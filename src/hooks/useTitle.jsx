import { useEffect } from "react";

function useTitle(title) {
  useEffect(() => {
    document.title = `${title} - Champion Academy`;
  }, [title]);
}

export default useTitle;
