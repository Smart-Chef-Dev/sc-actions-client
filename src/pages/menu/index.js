import { memo, useCallback, useEffect, useState } from "react";
import { styled } from "@linaria/react";
import { useLocation, useRoute } from "wouter";

import { theme } from "theme";
import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import { Img } from "components/img";
import { Label } from "components/label";
import { Text } from "components/text";
import H1 from "components/h1";
import H2 from "components/h2";

import mockCategory from "./mock/mock.categories.json";
import mockCourses from "./mock/mock.courses.json";

import Arrow from "./Arrow.png";

const Menu = () => {
  const [category, setCategory] = useState([]);
  const [course, setCourse] = useState([]);
  const [match, params] = useRoute(Routes.MENU);
  const [, setLocation] = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setCategory(mockCategory);
      setCourse(mockCourses);
    }, 1);
  }, []);

  const arrowClicking = useCallback(
    (categoryId) => () => {
      if (match) {
        setLocation("/restaurant/" + params.restaurant + "/" + categoryId);
      }
    },
    [setLocation, params.restaurant, match]
  );

  const pressingItems = useCallback(
    (itemId) => () => {
      if (match) {
        setLocation(
          "/restaurant/" + params.restaurant + "/" + "item/" + itemId
        );
      }
    },
    [setLocation, params.restaurant, match]
  );

  return (
    <Flex direction="column" p={theme.spacing(1)} height={1} pr="0px">
      <H1 marginTop="0px">Menu</H1>
      <s.Divider width={1.5} />
      <Flex direction="column" overflowY="scroll" overflowX="hidden" width={1}>
        {category.map((currentCategory) => (
          <Flex key={currentCategory} direction="column" width={0.95}>
            <Flex width={1}>
              <H2>{currentCategory.category}</H2>
              <Flex
                width={1}
                height={1}
                direction="row-reverse"
                alignItems="center"
              >
                <Img
                  src={Arrow}
                  alt="Arrow"
                  onClick={arrowClicking(currentCategory.id)}
                />
              </Flex>
            </Flex>
            <Flex
              overflowX="scroll"
              ml={theme.spacing(1)}
              width={1}
              height={0.83}
            >
              {course.map(
                (currentCourse) =>
                  currentCourse.category === currentCategory.category && (
                    <Flex
                      key={currentCourse}
                      direction="column"
                      mr={theme.spacing(1)}
                      mb={theme.spacing(1)}
                    >
                      <s.Preview
                        src={currentCourse.picture}
                        alt={currentCourse.name}
                        borderRadius="12px"
                        mb={theme.spacing(1)}
                        onClick={pressingItems(currentCourse.id)}
                      />
                      <Label>{currentCourse.name}</Label>
                      <Text color="var(--grey)">{currentCourse.price}</Text>
                    </Flex>
                  )
              )}
            </Flex>
            <s.Divider ml={theme.spacing(1)} width={2} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

const s = {
  Divider: styled(Flex)`
    border-bottom: 1px solid var(--grey);
  `,
  Preview: styled(Img)`
    width: 100px;
    height: 100px;

    object-fit: cover;
  `,
};

export default memo(Menu);
