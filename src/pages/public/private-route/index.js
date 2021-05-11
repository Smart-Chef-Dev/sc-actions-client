import { memo } from "react";

import { Flex } from "components/flex";

const PrivateRoute = () => {
  return (
    <Flex alignItems="center">
      <Flex>dashboard</Flex>
    </Flex>
  );
};

export default memo(PrivateRoute);
