import { Fragment, memo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "wouter";

import { Flex } from "components/flex";
import NotificationWithIconAndText from "components/notificationWithTexts";
import Product from "./components/product";
import Loader from "components/loaders";

import { useTranslation } from "contexts/translation-context";
import { useNotifications } from "hooks/useNotifications";
import {
  getAllPrices,
  getAllProducts,
  getSubscriptions,
} from "services/stripeService";
import ForbiddenIcon from "assets/icons/actions/forbidden_icon.svg";
import TopPanel from "./components/top-panel";

const Dashboard = () => {
  const [location, setLocation] = useLocation();
  const [isButtonsLocked, setButtonsLocked] = useState(false);
  const {
    strings: { subscription: translations },
  } = useTranslation();

  const products = useQuery("productsStripe", getAllProducts);
  const prices = useQuery("pricesStripe", getAllPrices);
  const subscription = useQuery("subscription", () => getSubscriptions());

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
      <TopPanel translations={translations} />
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
