import { memo, useCallback, useEffect, useState } from "react";
import { useRoute } from "wouter";
import { Routes } from "constants/routes";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { Img } from "components/img";
import { Label } from "components/label";
import Button from "components/button";
import { theme } from "theme";

import mockCourses from "pages/menu/mock/mock.courses.json";

import Arrow from "./Arrow.png";

const Product = () => {
  const [match, params] = useRoute(Routes.PRODUCT);
  const [course, setCourse] = useState([]);
  const [portions, setPortions] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setCourse(mockCourses);
    }, 1000);
  }, []);

  let currentItem;
  if (match) {
    currentItem = course.find(
      (currentValue) => currentValue.id === params.itemId
    );
  }

  const reducePortion = useCallback(() => {
    if (portions !== 1) {
      setPortions(portions - 1);
    }
  }, [portions]);

  const increasePortion = useCallback(() => {
    if (portions < 99) {
      setPortions(portions + 1);
    }
  }, [portions]);

  return (
    <Flex height={1}>
      {match && currentItem && (
        <Flex direction="column" height={1}>
          <s.Arrow src={Arrow} alt="Arrow" />
          <Flex width={1} height={1} flex={1}>
            <s.Preview
              src={currentItem.picture}
              alt={currentItem.name}
              width={1}
            />
          </Flex>
          <s.MainInformation direction="column" p={theme.spacing(1)} height={1}>
            <s.Time>
              <Label>{"~ " + currentItem.time}</Label>
            </s.Time>
            <s.Category pb={theme.spacing(1)}>
              {currentItem.category}
            </s.Category>
            <s.Name pb={theme.spacing(1)}>{currentItem.name}</s.Name>
            <Flex
              justifyContent="space-between"
              width={1}
              pb={theme.spacing(1)}
            >
              <s.GrayText height={1} alignItems="center">
                {"Weight:" + currentItem.weight}
              </s.GrayText>
              <s.Price>{currentItem.price}</s.Price>
            </Flex>
            <s.GrayText>{currentItem.description}</s.GrayText>
            <Flex width={1} flex={1} direction="column-reverse">
              <Flex width={1} justifyContent="space-between">
                <Flex>
                  <s.PortionMinAndPlus onClick={reducePortion}>
                    -
                  </s.PortionMinAndPlus>
                  <s.Portions pl={theme.spacing(1)} pr={theme.spacing(1)}>
                    {portions}
                  </s.Portions>
                  <s.PortionMinAndPlus onClick={increasePortion}>
                    +
                  </s.PortionMinAndPlus>
                </Flex>
                <Button>ORDER</Button>
              </Flex>
            </Flex>
          </s.MainInformation>
        </Flex>
      )}
    </Flex>
  );
};

const s = {
  Preview: styled(Img)``,
  MainInformation: styled(Flex)`
    background: white;
    border-radius: 16px 16px 0 0;
    position: relative;
    bottom: 16px;
    padding-bottom: 0;
  `,
  Time: styled(Flex)`
    position: absolute;
    right: 16px;
    top: -16px;

    background: white;
    padding: 8px;
    border-radius: 16px;
  `,
  PortionMinAndPlus: styled(Flex)`
    color: var(--main-color);
    font-size: 40px;
  `,
  Portions: styled(Flex)`
    font-size: 40px;
  `,
  Category: styled(Flex)`
    color: var(--grey);
    font-family: SF UI Display;

    text-transform: uppercase;
  `,
  GrayText: styled(Flex)`
    color: rgba(0, 0, 0, 0.4);
  `,
  Price: styled(Flex)`
    font-family: SF UI Display;
    color: #4cd964;
    font-size: 2rem;
  `,
  Name: styled(Flex)`
    font-family: SF UI Display;
    font-size: 32px;
  `,
  Arrow: styled(Img)`
    position: absolute;
    left: 20px;
    top: 20px;
  `,
};
export default memo(Product);
