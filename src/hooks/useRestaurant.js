import { useEffect, useState } from "react";

import { useErrorContext } from "pages/error-boundary";

export const useRestaurant = (restaurantId) => {
  const { handleError } = useErrorContext();
  const [isLoading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    if (!restaurantId) {
      return handleError(new Error("restaurantId or tableId not provided"));
    }

    setLoading(true);
    (async () => {
      const resp = await fetch(`/api/restaurant/${restaurantId}`);
      if (!resp.ok) {
        return handleError(new Error("Can't fetch actions"));
      }
      const data = await resp.json();
      setRestaurant(data);
      setLoading(false);
    })();
  }, [handleError, restaurantId]);

  return { isLoading, restaurant };
};
