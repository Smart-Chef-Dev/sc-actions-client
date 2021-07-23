import { Fragment, memo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "wouter";
import { useRecoilState } from "recoil";

import { Flex } from "components/flex";
import NotificationWithIconAndText from "components/notificationWithTexts";
import Product from "./components/product";
import { Text } from "components/text";
import { Divider } from "components/divider";
import Loader from "components/loaders";

import UserDataState from "atoms/user";
import { theme } from "theme";
import { useTranslation } from "contexts/translation-context";
import { useNotifications } from "hooks/useNotifications";
import {
  getAllPrices,
  getAllProducts,
  getSubscriptions,
} from "services/stripeService";
import ForbiddenIcon from "assets/icons/actions/forbidden_icon.svg";

const Dashboard = () => {
  const [userDataAtoms] = useRecoilState(UserDataState);
  const [location, setLocation] = useLocation();
  const [isButtonsLocked, setButtonsLocked] = useState(false);
  const {
    strings: { subscription: translations },
  } = useTranslation();

  const products = useQuery("productsStripe", getAllProducts);
  const prices = useQuery("pricesStripe", getAllPrices);
  const subscription = useQuery("subscription", () =>
    getSubscriptions({ jwt: userDataAtoms.jwt })
  );

  const sessionCanceled = useNotifications(
    <NotificationWithIconAndText
      texts={[translations["not_subscribed"]]}
      Icon={ForbiddenIcon}
    />,
    3000
  );

  const sessionSuccess = useNotifications(
    <NotificationWithIconAndText
      texts={[translations["subscribed_successfully"]]}
    />,
    3000
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const purchase = urlParams.get("purchase");

    switch (purchase) {
      case "success":
        subscription.refetch();
        sessionSuccess.showNotification();
        setLocation(location);
        break;
      case "canceled":
        sessionCanceled.showNotification();
        setLocation(location);
        break;
    }

    // should only be called when the page is refreshed
    // eslint-disable-next-line
  }, []);

  return !products.isLoading && !prices.isLoading ? (
    <Flex direction="column" height={1} width={1}>
      <Flex
        height={1}
        width={1}
        flex={1}
        direction="column"
        pl={theme.spacing(1)}
      >
        <Text
          p={theme.spacing(1)}
          pl={0}
          fontSize={theme.fontSize(3)}
          fontWeight="bold"
        >
          {translations["subscriptions"]}
        </Text>
        <Divider />
      </Flex>
      <Flex height={1} width={1} overflowY="auto">
        {sessionCanceled.renderNotification()}
        {sessionSuccess.renderNotification()}
        <Flex
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          height={1}
          width={1}
        >
          {products.data.data.map((currentProduct) => (
            <Fragment key={currentProduct.id}>
              <Product
                product={currentProduct}
                prices={prices}
                userDataAtoms={userDataAtoms}
                subscription={subscription}
                translations={translations}
                onButtonsLocked={setButtonsLocked}
                isButtonsLocked={isButtonsLocked}
              />
            </Fragment>
          ))}
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <Flex height={1} width={1}>
      <Loader />
    </Flex>
  );
};

export default memo(Dashboard);
