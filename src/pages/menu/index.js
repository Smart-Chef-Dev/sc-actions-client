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

import mockCategory from "pages/menu/mock/mock.categories.json";
import mockCourses from "pages/menu/mock/mock.courses.json";

import Arrow from "./Arrow.png";
import { Divider } from "../../components/divider";

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
    <Flex
      direction="column"
      pl={theme.spacing(1)}
      pt={theme.spacing(1)}
      height={1}
      width={1}
      boxSizing="border-box"
    >
      <H1 marginTop="0px">Menu</H1>
      <Divider mb={theme.spacing(1)} />
      <Flex direction="column" overflowY="scroll" overflowX="hidden" width={1}>
        {category.map((currentCategory) => (
          <Flex key={currentCategory.category} direction="column" width={0.95}>
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
                  onClick={arrowClicking(currentCategory.id)}
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
                  currentCourse.category === currentCategory.category && (
                    <Flex
                      key={currentCourse.name}
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
                      <Text color="var(--text-grey)">
                        {currentCourse.price}
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
