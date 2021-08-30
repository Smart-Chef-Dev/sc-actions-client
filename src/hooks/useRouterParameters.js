import { useMemo } from "react";
import { useLocation } from "wouter";

import { Routes } from "../constants/routes";

export const useRouterParameters = () => {
  const [location] = useLocation();

  return useMemo(() => {
    const url = location.split("/").splice(1);

    let parameters = null;
    for (const key in Routes) {
      const currentParameters = Routes[key].split("/").splice(1);

      if (currentParameters.length !== url.length) {
        continue;
      }

      for (const [i, v] of currentParameters.entries()) {
        if (v[0] === ":") {
          parameters = { ...parameters, [v.substr(1)]: url[i] };
          break;
        }

        if (v !== url[i]) {
          parameters = null;
          break;
        }
      }

      if (parameters) {
        break;
      }
    }

    return parameters;
  }, [location]);
};
