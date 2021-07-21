import { Fragment, memo, useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "wouter";

import { Flex } from "components/flex";
import Loader from "components/loader";
import NotificationWithIconAndText from "components/notificationWithTexts";
import Subscription from "./components/subscription";

import { useNotifications } from "hooks/useNotifications";
import {
  getAllPrices,
  getAllProducts,
  getSubscriptions,
} from "services/subscriptionsService";
import { useRecoilState } from "recoil";
import UserDataState from "atoms/user";

const Dashboard = () => {
  const [userDataAtoms] = useRecoilState(UserDataState);
  const [location, setLocation] = useLocation();

  const products = useQuery("productsStripe", getAllProducts);
  const prices = useQuery("pricesStripe", getAllPrices);
  const subscription = useQuery("subscription", () =>
    getSubscriptions({ jwt: userDataAtoms.jwt })
  );

  const sessionCanceled = useNotifications(
    <NotificationWithIconAndText
      texts={["Подписка не оформлена"]}
      isDone={false}
    />,
    3000
  );

  const sessionSuccess = useNotifications(
    <NotificationWithIconAndText
      texts={["Подписка оформлена успешно"]}
      isDone={true}
    />,
    3000
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const purchase = urlParams.get("purchase");

    if (purchase === "success") {
      subscription.refetch();
      sessionSuccess.showNotification();
      setLocation(location);
    }
    if (purchase === "canceled") {
      sessionCanceled.showNotification();
      setLocation(location);
    }

    // should only be called when the page is refreshed
    // eslint-disable-next-line
  }, []);

  return !products.isLoading && !prices.isLoading ? (
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
            <Subscription
              product={currentProduct}
              prices={prices}
              userDataAtoms={userDataAtoms}
              subscription={subscription}
            />
          </Fragment>
        ))}
      </Flex>
    </Flex>
  ) : (
    <Flex height={1} width={1}>
      <Loader />
    </Flex>
  );
};

export default memo(Dashboard);
