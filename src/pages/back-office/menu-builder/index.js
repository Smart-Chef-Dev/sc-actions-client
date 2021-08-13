import { memo } from "react";
import { useQuery } from "react-query";
import { useLocation, useRoute } from "wouter";

import { Flex } from "components/flex";
import Categories from "./components/categories";
import { theme } from "theme";
import { Routes } from "constants/routes";
import { checkingUserAccess } from "services/restaurantService";
import { useTranslation } from "contexts/translation-context";
import CreateCategoryButton from "./components/create-category-button";

const MenuBuilder = () => {
  const [, { restaurantId }] = useRoute(Routes.MENU_BUILDER);
  const [, setLocation] = useLocation();

  const {
    strings: { menuBuilder: translations },
  } = useTranslation();

  const checkingAccessToRestaurant = useQuery(
    ["verificationOfRights", { restaurantId }],
    checkingUserAccess,
    {
      retry: 1,
      onError: () => {
        setLocation(Routes.SING_IN);
      },
    }
  );

  return (
    !checkingAccessToRestaurant.isLoading && (
      <Flex
        width={1}
        height={1}
        p={theme.spacing(1)}
        direction="column"
        overflowY="auto"
        boxSizing="border-box"
      >
        <Flex width={1} justifyContent="flex-end">
          <CreateCategoryButton
            restaurantId={restaurantId}
            translations={translations}
          />
        </Flex>
        <Flex width={1}>
          <Categories restaurantId={restaurantId} translations={translations} />
        </Flex>
      </Flex>
    )
  );
};

export default memo(MenuBuilder);
