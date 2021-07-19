import { Fragment, memo } from "react";
import { useQuery } from "react-query";

import { Flex } from "components/flex";
import Loader from "components/loader";

import {
  getAllSubscriptions,
  getAllSubscriptionsPrices,
} from "services/subscriptionsService";
import Subscription from "./components/subscription";

const Dashboard = () => {
  const subscriptions = useQuery("subscriptions", getAllSubscriptions);
  const subscriptionsPrices = useQuery(
    "subscriptionsPrices",
    getAllSubscriptionsPrices
  );

  return !subscriptions.isLoading && !subscriptionsPrices.isLoading ? (
    <Flex height={1} width={1} overflowY="auto">
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
