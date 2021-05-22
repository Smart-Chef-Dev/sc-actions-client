import { memo, useEffect, useState } from "react";
import { useRoute } from "wouter";
import { styled } from "@linaria/react";

import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import { Label } from "components/label";
import { Img } from "components/img";
import { theme } from "theme";
import H1 from "components/h1";
import H2 from "components/h2";

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
      <Flex alignItems="center" pl={theme.spacing(1)} pt={theme.spacing(1)}>
        <Img src={Arrow} alt="Arrow" />
        <s.DarkenedText pl="8px">Menu</s.DarkenedText>
      </Flex>
      {match && currentList[0] && (
        <Flex direction="column" height={0.96} width={1}>
          <Flex
            direction="column"
            pl={theme.spacing(1)}
            pr={theme.spacing(1)}
            width={0.97}
          >
            <H1>{currentList[0].category}</H1>
            <s.Divider width={5} />
            <Navigation
              category={category}
              currentCategory={params.categoryId}
            />
          </Flex>
          <Flex
            pr={theme.spacing(1)}
            pl={theme.spacing(1)}
            overflowY="scroll"
            width={1}
          >
            <Flex direction="column" width={1} height={1}>
              {currentList.map((currentValue) => (
                <s.Container
                  key={currentValue.id}
                  mb={theme.spacing(1)}
                  direction="column"
                  width={0.93}
                >
                  <s.Preview
                    src={currentValue.picture}
                    alt={currentValue.name}
                    borderRadius="12px 12px 0 0"
                    width={1}
                  />
                  <s.ContainerCategory p={theme.spacing(1)}>
                    {currentValue.category}
                  </s.ContainerCategory>
                  <Label pl={theme.spacing(1)}>{currentValue.name}</Label>
                  <Flex width={1}>
                    <s.WeightCategory
                      alignItems="center"
                      pl={theme.spacing(1)}
                      height={1}
                    >
                      {currentValue.weight}
                    </s.WeightCategory>
                    <Flex direction="row-reverse" width={1}>
                      <H2 pr={theme.spacing(1)}>{currentValue.price}</H2>
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
  Preview: styled(Img)`
    max-height: 300px;
    object-fit: cover;
  `,
  Divider: styled(Flex)`
    border-bottom: 1px solid var(--grey);
  `,
  WeightCategory: styled(Flex)`
    color: var(--grey);
    font-family: SF UI Display;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;
  `,
  ContainerCategory: styled(Flex)`
    color: var(--grey);
    font-family: SF UI Display;

    text-transform: uppercase;
  `,
  DarkenedText: styled(Flex)`
    color: var(--grey);
    font-family: SF UI Display;

    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 22px;

    letter-spacing: -0.41px;
  `,
};
export default memo(ExpandedMenu);
