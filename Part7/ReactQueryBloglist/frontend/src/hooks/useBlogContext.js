import { useContext } from "react";
import { BlogContext } from "../App";

function useBlogContext() {
  return useContext(BlogContext);
}

export default useBlogContext;
