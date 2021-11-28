import { memo } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Img } from "components/img";
import PaymentButton from "./payment-button";
import Price from "./price";
import { theme } from "theme";

const Product = ({
  product,
  subscription,
  translations,
  onButtonsLocked,
  isButtonsLocked,
}) => {
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
        <Price price={product.price} />
        <PaymentButton
          price={product.price}
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
  userDataAtoms: PropTypes.object,
  subscription: PropTypes.object,
  translations: PropTypes.object,
  onButtonsLocked: PropTypes.func,
  isButtonsLocked: PropTypes.bool,
};

export default memo(Product);
