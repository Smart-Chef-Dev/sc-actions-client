import { useMemo } from "react";
import { useLocation } from "wouter";

import { Routes } from "../constants/routes";

export const useRouterParameters = () => {
  const [location] = useLocation();

  const routes = useMemo(
    () => Object.values(Routes).map((r) => r.split("/").splice(1)),
    []
  );

  const url = useMemo(() => location.split("/").splice(1), [location]);

  const routersAreSameSizeWithUrl = useMemo(
    () => routes.filter((r) => r.length === url.length),
    [url, routes]
  );

  return useMemo(() => {
    let route = [];
    let numberOfMatches = 0;
    for (const routeTmp of routersAreSameSizeWithUrl) {
      let numberOfMatchesOfCurrentIteration = 0;

      for (const [i, word] of routeTmp.entries()) {
        if (word === url[i]) {
          numberOfMatchesOfCurrentIteration =
            numberOfMatchesOfCurrentIteration + 1;
        }

        if (word[0] === ":") {
          numberOfMatchesOfCurrentIteration =
            numberOfMatchesOfCurrentIteration + 0.5;
        }
      }

      if (numberOfMatchesOfCurrentIteration < numberOfMatches) {
        continue;
      }

      route = routeTmp;
      numberOfMatches = numberOfMatchesOfCurrentIteration;
    }

    let parameters = {};
    for (const [i, word] of route.entries()) {
      if (word[0] === ":") {
        parameters = { ...parameters, [word.substr(1)]: url[i] };
      }
    }

    return parameters;
  }, [url, routersAreSameSizeWithUrl]);
};
