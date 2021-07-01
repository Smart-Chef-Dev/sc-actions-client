import { useEffect } from "react";
import { useQuery } from "react-query";

import { useErrorContext } from "pages/error-boundary";

import getRestaurantById from "services/getRestaurantById";

export const useRestaurant = (restaurantId) => {
  const { handleError } = useErrorContext();

  const { data, isError, isLoading } = useQuery(
    ["restaurant", { restaurantId }],
    getRestaurantById
  );

  useEffect(() => {
    if (!restaurantId) {
      return handleError(new Error("restaurantId or tableId not provided"));
    }

    if (isError) {
      return handleError(new Error("Can't fetch actions"));
    }
  }, [handleError, restaurantId, isError]);

  return { isLoading, restaurant: data };
};
