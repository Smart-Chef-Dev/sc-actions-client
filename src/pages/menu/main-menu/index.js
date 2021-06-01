import { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { styled } from "@linaria/react";

import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import { Img } from "components/img";
import { Label } from "components/label";
import { Text } from "components/text";
import H1 from "components/h1";

import { theme } from "theme";
import { useTranslation } from "contexts/translation-context";

import Arrow from "./Arrow.png";
import { Divider } from "components/divider";

const Menu = () => {
  const [category, setCategory] = useState([]);
  const [course, setCourse] = useState([]);
  const [match, params] = useRoute(Routes.MENU);
  const [error, setError] = useState(false);
  const [, setLocation] = useLocation();

  const {
    strings: { mainMenu: translations },
  } = useTranslation();

  useEffect(() => {
    fetch("/api/menu/" + params.restaurant + "/getCategory", {
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

    fetch("/api/menu/" + params.restaurant + "/getCourse", {
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
  }, [params.restaurant]);

  const arrowClicking = useCallback(
    (categoryId) => () => {
      if (match) {
        setLocation(
          `/restaurant/${params.restaurant}/${params.tableId}/${categoryId}`
        );
      }
    },
    [setLocation, params.restaurant, params.tableId, match]
  );

  const pressingItems = useCallback(
    (itemId) => () => {
      if (match) {
        setLocation(
          `/restaurant/${params.restaurant}/${params.tableId}/item/${itemId}`
        );
      }
    },
    [setLocation, params.restaurant, params.tableId, match]
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
      <H1 marginTop="0px">{translations["menu"]}</H1>
      <Divider mb={theme.spacing(1)} />
      <Flex direction="column" overflowY="scroll" overflowX="hidden" width={1}>
        {!error &&
          category.map((currentCategory) => (
            <Flex key={currentCategory._id} direction="column" width={0.95}>
              <Flex width={1}>
                <Text fontSize={theme.fontSize(2)} fontWeight="bold">
                  {currentCategory.category}
                </Text>
                <Flex
                  width={1}
                  height={1}
                  direction="row-reverse"
                  alignItems="center"
                >
                  <Img
                    src={Arrow}
                    alt="Arrow"
                    onClick={arrowClicking(currentCategory._id)}
                  />
                </Flex>
              </Flex>
              <Flex
                overflowX="scroll"
                ml={theme.spacing(1)}
                mt={theme.spacing(1)}
                width={1}
                height={0.83}
              >
                {course.map(
                  (currentCourse) =>
                    currentCourse.category.category ===
                      currentCategory.category && (
                      <Flex
                        key={currentCourse._id}
                        direction="column"
                        mr={theme.spacing(1)}
                        mb={theme.spacing(1)}
                      >
                        <s.Preview
                          src={currentCourse.picture}
                          alt={currentCourse.name}
                          borderRadius="12px"
                          mb={theme.spacing(1)}
                          onClick={pressingItems(currentCourse._id)}
                        />
                        <Label>{currentCourse.name}</Label>
                        <Text color="var(--text-grey)">
                          {currentCourse.price}$
                        </Text>
                      </Flex>
                    )
                )}
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
