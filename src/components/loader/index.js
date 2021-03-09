import { memo } from "react";
import Spinner from "./spinner.svg";

const Loader = () => {
  return <Spinner />;
};

export default memo(Loader);
