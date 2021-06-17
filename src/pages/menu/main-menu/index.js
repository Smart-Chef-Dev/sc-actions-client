import { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { styled } from "@linaria/react";

import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import { Img } from "components/img";
import { Text } from "components/text";
import { Divider } from "components/divider";

import { theme } from "theme";
import { useTranslation } from "contexts/translation-context";

import Arrow from "./arrow.svg";

const Menu = () => {
  const [match, { restaurantId, tableId }] = useRoute(Routes.MENU);
  const [, setLocation] = useLocation();

  const [category, setCategory] = useState([]);
  const [course, setCourse] = useState([]);

  const [error, setError] = useState(false);

  const {
    strings: { mainMenu: translations },
  } = useTranslation();

  useEffect(() => {
    fetch(`/api/category/${restaurantId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setError(!response.ok);
        return response.json();
      })
      .then((result) => {
        setCategory(result);
      });

    fetch(`/api/menu/${restaurantId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setError(!response.ok);
        return response.json();
      })
      .then((result) => {
        setCourse(result);
      });
  }, [restaurantId]);

  const arrowClicking = useCallback(
    (categoryId) => () => {
      if (match) {
        setLocation(`/restaurant/${restaurantId}/${tableId}/${categoryId}`);
      }
    },
    [setLocation, restaurantId, tableId, match]
  );

  const pressingItems = useCallback(
    (itemId) => () => {
      if (match) {
        setLocation(`/restaurant/${restaurantId}/${tableId}/item/${itemId}`);
      }
    },
    [setLocation, restaurantId, tableId, match]
  );

  return (
    <Flex
      direction="column"
      pl={theme.spacing(1)}
      pt={theme.spacing(1)}
      height={1}
      width={1}
      boxSizing="border-box"
    >
      <Text
        fontSize={theme.fontSize(3)}
        fontWeight="bold"
        mb={theme.spacing(1)}
      >
        {translations["menu"]}
      </Text>
      <Divider mb={theme.spacing(1)} />
      <Flex direction="column" overflowY="scroll" overflowX="hidden" width={1}>
        {!error &&
          category.map((currentCategory) => (
            <Flex key={currentCategory._id} direction="column" width={1}>
              <Flex width={1}>
                <Text fontSize={theme.fontSize(2)} fontWeight="bold">
                  {currentCategory.name}
                </Text>
                <Flex
                  width={1}
                  height={1}
                  mr={theme.spacing(1)}
                  direction="row-reverse"
                  alignItems="center"
                >
                  <Arrow onClick={arrowClicking(currentCategory._id)} />
                </Flex>
              </Flex>
              <Flex
                boxSizing="border-box"
                pl={theme.spacing(1)}
                pt={theme.spacing(1)}
                width={1}
                height={1}
              >
                <Flex overflowX="scroll">
                  {course.map(
                    (currentCourse) =>
                      currentCourse.category.category ===
                        currentCategory.category && (
                        <Flex
                          key={currentCourse._id}
                          pr={theme.spacing(1)}
                          pb={theme.spacing(1)}
                        >
                          <Flex direction="column">
                            <s.Preview
                              src={currentCourse.pictureUrl}
                              alt={currentCourse.name}
                              borderRadius="12px"
                              mb={theme.spacing(1)}
                              onClick={pressingItems(currentCourse._id)}
                            />
                            <Text>{currentCourse.name}</Text>
                            <Text color="var(--text-grey)">
                              {currentCourse.price}$
                            </Text>
                          </Flex>
                        </Flex>
                      )
                  )}
                </Flex>
              </Flex>
              <Divider ml={theme.spacing(1)} mb={theme.spacing(1)} />
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
};

const s = {
  Preview: styled(Img)`
    width: 100px;
    height: 100px;

    object-fit: cover;
  `,
};

export default memo(Menu);