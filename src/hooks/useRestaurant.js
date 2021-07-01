import { useEffect } from "react";

import { useErrorContext } from "pages/error-boundary";
import { useQuery } from "react-query";

export const useRestaurant = (restaurantId) => {
  const { handleError } = useErrorContext();

  const { data, isError, isLoading } = useQuery(
    ["restaurant", restaurantId],
    () => fetch(`/api/restaurant/${restaurantId}`).then((res) => res.json())
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
