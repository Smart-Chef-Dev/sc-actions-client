import { memo, useMemo } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Img } from "components/img";
import PaymentButton from "./components/payment-button";
import Price from "./components/price";
import { theme } from "theme";

const Product = ({
  product,
  prices,
  userDataAtoms,
  subscription,
  translations,
  onButtonsLocked,
  isButtonsLocked,
}) => {
  const { data } = prices;

  const price = useMemo(
    () => data.data.find((currentValue) => currentValue.product === product.id),
    [data, product]
  );

  return (
    <Flex key={product.id} p={theme.spacing(1)}>
      <s.Container direction="column" alignItems="center" p={theme.spacing(1)}>
        <s.Preview src={product.images[0]} />
        <Text pb={theme.spacing(1)} pt={theme.spacing(1)} fontWeight="bold">
          {product.name}
        </Text>
        <Text pb={theme.spacing(1)} textAlign="center">
          {product.description}
        </Text>
        <Price price={price} />
        <PaymentButton
          price={price}
          userDataAtoms={userDataAtoms}
          subscription={subscription}
          translations={translations}
          onButtonsLocked={onButtonsLocked}
          isButtonsLocked={isButtonsLocked}
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
    max-width: 280px;
  `,
};

Product.propTypes = {
  product: PropTypes.object,
  prices: PropTypes.object,
  userDataAtoms: PropTypes.object,
  subscription: PropTypes.object,
  translations: PropTypes.object,
  onButtonsLocked: PropTypes.func,
  isButtonsLocked: PropTypes.bool,
};

export default memo(Product);
