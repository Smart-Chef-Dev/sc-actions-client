import { memo, useCallback, useMemo } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";

import { Flex } from "components/flex";
import { Text } from "components/text";
import Button from "components/button";
import { Img } from "components/img";
import PriceSubscription from "./components/price-subscription";
import { theme } from "theme";

import UserDataState from "atoms/user";

const Subscription = ({ subscription, subscriptionsPrices }) => {
  const [userDataAtoms] = useRecoilState(UserDataState);
  const { data } = subscriptionsPrices;

  const subscriptionPrice = useMemo(
    () =>
      data.data.find(
        (currentValue) => currentValue.product === subscription.id
      ),
    [data, subscription]
  );

  const createSession = useCallback(async () => {
    const response = await fetch(
      `/api/subscriptions/prices/${subscriptionPrice.id}/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + userDataAtoms.jwt,
        },
      }
    );

    document.location = await response.text();
  }, [subscriptionPrice, userDataAtoms]);

  return (
    <Flex key={subscription.id} p={theme.spacing(1)}>
      <s.Container direction="column" alignItems="center" p={theme.spacing(1)}>
        <s.Preview src={subscription.images[0]} />
        <Text pb={theme.spacing(1)} pt={theme.spacing(1)}>
          {subscription.name}
        </Text>
        <Text pb={theme.spacing(1)} textAlign="center">
          {subscription.description}
        </Text>
        <PriceSubscription subscriptionPrice={subscriptionPrice} />
        <Button onClick={createSession}>Pay</Button>
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
  subscription: PropTypes.object,
  subscriptionsPrices: PropTypes.object,
};

export default memo(Subscription);
