import { Fragment, memo, useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "wouter";

import { Flex } from "components/flex";
import Loader from "components/loader";
import NotificationWithIconAndText from "components/notificationWithTexts";
import Subscription from "./components/subscription";

import { useNotifications } from "hooks/useNotifications";
import {
  getAllSubscriptions,
  getAllSubscriptionsPrices,
} from "services/subscriptionsService";

const Dashboard = () => {
  const subscriptions = useQuery("subscriptions", getAllSubscriptions);
  const subscriptionsPrices = useQuery(
    "subscriptionsPrices",
    getAllSubscriptionsPrices
  );

  console.log(subscriptionsPrices);

  const [location, setLocation] = useLocation();

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

  return !subscriptions.isLoading && !subscriptionsPrices.isLoading ? (
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
        {subscriptions.data.data.map((currentSubscriptions) => (
          <Fragment key={currentSubscriptions.id}>
            <Subscription
              subscription={currentSubscriptions}
              subscriptionsPrices={subscriptionsPrices}
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
