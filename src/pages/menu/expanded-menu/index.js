import { memo, useEffect, useState } from "react";
import { useRoute } from "wouter";
import { styled } from "@linaria/react";

import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import { Text } from "components/text";
import { Img } from "components/img";
import { theme } from "theme";

import mockCategory from "pages/menu/mock/mock.categories.json";
import mockCourses from "pages/menu/mock/mock.courses.json";

import Navigation from "./components/navigation";

import Arrow from "./Arrow.png";

const ExpandedMenu = () => {
  const [match, params] = useRoute(Routes.EXPANDED_MENU);
  const [category, setCategory] = useState([]);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setCategory(mockCategory);
      setCourse(mockCourses);
    }, 1000);
  }, [category, course]);

  useEffect(() => {});

  let currentList = [];
  if (match) {
    currentList = course.filter(
      (currentValue) => currentValue.categoryId === params.categoryId
    );
  }

  return (
    <Flex direction="column" height={1} width={1}>
      <s.Arrow alignItems="center">
        <Img src={Arrow} alt="Arrow" />
        <Text color="var(--grey)" fontFamily="SF UI Display">
          Menu
        </Text>
      </s.Arrow>
      {match && currentList[0] && (
        <Flex direction="column" height={1} width={1}>
          <Flex
            direction="column"
            pl={theme.spacing(1)}
            pr={theme.spacing(1)}
            width={1}
            flex={1}
            height={1}
            boxSizing="border-box"
          >
            <Text
              fontFamily="SF UI Display"
              fontSize={theme.fontSize(3)}
              mt={theme.spacing(3)}
              mb={theme.spacing(1)}
              fontWeight="bold"
            >
              {currentList[0].category}
            </Text>
            <s.Divider width={5} />
            <Navigation
              category={category}
              currentCategory={params.categoryId}
            />
          </Flex>
          <Flex
            boxSizing="border-box"
            pr={theme.spacing(1)}
            pl={theme.spacing(1)}
            overflowY="scroll"
            width={1}
            height={1}
          >
            <Flex direction="column" width={1} height={1}>
              {currentList.map((currentValue) => (
                <s.Container
                  key={currentValue.id}
                  mb={theme.spacing(1)}
                  direction="column"
                  width={1}
                >
                  <s.Preview
                    src={currentValue.picture}
                    alt={currentValue.name}
                    borderRadius="12px 12px 0 0"
                    width={1}
                  />
                  <Text
                    p={theme.spacing(1)}
                    color="var(--grey)"
                    fontFamily="SF UI Display"
                    textTransform="uppercase"
                  >
                    {currentValue.category}
                  </Text>
                  <Text
                    fontFamily="Actor"
                    pl={theme.spacing(1)}
                    fontSize={theme.fontSize(1)}
                  >
                    {currentValue.name}
                  </Text>
                  <Flex width={1}>
                    <Text
                      alignItems="center"
                      pl={theme.spacing(1)}
                      height={1}
                      width={1}
                      color="var(--grey)"
                      font-family="SF UI Display"
                      fontSize={theme.fontSize(0)}
                    >
                      {currentValue.weight}
                    </Text>
                    <Flex direction="row-reverse" width={1}>
                      <Text
                        m={theme.spacing(1)}
                        fontSize={theme.fontSize(2)}
                        fontWeight="bold"
                      >
                        {currentValue.price}
                      </Text>
                    </Flex>
                  </Flex>
                </s.Container>
              ))}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
const s = {
  Container: styled(Flex)`
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
  `,
  Arrow: styled(Flex)`
    position: absolute;
    left: 8px;
    top: 12px;
  `,
  Preview: styled(Img)`
    max-height: 300px;
    object-fit: cover;
  `,
  Divider: styled(Flex)`
    border-bottom: 1px solid var(--grey);
  `,
};
export default memo(ExpandedMenu);
