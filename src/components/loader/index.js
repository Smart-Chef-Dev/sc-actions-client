import { memo } from "react";

import Spinner from "assets/icons/loader/spinner.svg";
import { Flex } from "components/flex";

const Loader = () => {
  return (
    <Flex
      width={1}
      height={1}
      justifyContent="center"
      alignItems="center"
      position="absolute"
    >
      <Spinner />
    </Flex>
  );
};

export default memo(Loader);
