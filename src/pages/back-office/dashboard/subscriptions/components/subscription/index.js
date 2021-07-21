import { memo, useMemo } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Img } from "components/img";
import PriceSubscription from "./components/price-subscription";
import PaymentButton from "./components/payment-button";
import { theme } from "theme";

const Subscription = ({ product, prices, userDataAtoms, subscription }) => {
  const { data } = prices;

  const price = useMemo(
    () => data.data.find((currentValue) => currentValue.product === product.id),
    [data, product]
  );

  return (
    <Flex key={product.id} p={theme.spacing(1)}>
      <s.Container direction="column" alignItems="center" p={theme.spacing(1)}>
        <s.Preview src={product.images[0]} />
        <Text pb={theme.spacing(1)} pt={theme.spacing(1)}>
          {product.name}
        </Text>
        <Text pb={theme.spacing(1)} textAlign="center">
          {product.description}
        </Text>
        <PriceSubscription price={price} />
        <PaymentButton
          price={price}
          userDataAtoms={userDataAtoms}
          subscription={subscription}
        />
      </s.Container>
    </Flex>
  );
};

const s = {
  Container: styled(Flex)`
    max-width: 280px;
    border: solid 1px var(--box-shadow);
    border-radius: 16px;
  `,
  Preview: styled(Img)`
    border-radius: 16px;
  `,
};

Subscription.propTypes = {
  product: PropTypes.object,
  prices: PropTypes.object,
  userDataAtoms: PropTypes.object,
  subscription: PropTypes.object,
};

export default memo(Subscription);
