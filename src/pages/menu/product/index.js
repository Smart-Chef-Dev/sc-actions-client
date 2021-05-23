import { memo, useCallback, useEffect, useState } from "react";
import { useRoute } from "wouter";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { Img } from "components/img";
import { Label } from "components/label";
import { Text } from "components/text";
import Button from "components/button";

import { Routes } from "constants/routes";

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
    if (portions < 100) {
      setPortions(portions + 1);
    }
  }, [portions]);

  return (
    <Flex height={1}>
      {match && currentItem && (
        <Flex direction="column" height={1} width={1}>
          <s.Arrow src={Arrow} alt="Arrow" />
          <Flex width={1} height={1} flex={1}>
            <Img src={currentItem.picture} alt={currentItem.name} width={1} />
          </Flex>
          <s.MainInformation
            direction="column"
            p={theme.spacing(1)}
            height={1}
            width={1}
            boxSizing="border-box"
          >
            <s.Time>
              <Label>{"~ " + currentItem.time}</Label>
            </s.Time>
            <Text
              color="var(--grey)"
              fontFamily="SF UI Display"
              textTransform="uppercase"
              pb={theme.spacing(1)}
            >
              {currentItem.category}
            </Text>
            <Text
              fontFamily="SF UI Display"
              fontSize={theme.fontSize(3)}
              pb={theme.spacing(1)}
            >
              {currentItem.name}
            </Text>
            <Flex
              justifyContent="space-between"
              width={1}
              pb={theme.spacing(1)}
            >
              <Text color="#999999" height={1} alignItems="center">
                {"Weight:" + currentItem.weight}
              </Text>
              <Text fontFamily="SF UI Display" color="#4cd964" fontSize="2rem">
                {currentItem.price}
              </Text>
            </Flex>
            <Text color="#999999">{currentItem.description}</Text>
            <Flex width={1} flex={1} direction="column-reverse">
              <Flex width={1} justifyContent="space-between">
                <Flex height={1} alignItems="center">
                  <Text
                    fontSize={theme.fontSize(3)}
                    color="var(--main-color)"
                    onClick={reducePortion}
                    mb={theme.spacing(1)}
                  >
                    -
                  </Text>
                  <Text
                    fontSize={theme.fontSize(3)}
                    pl={theme.spacing(1)}
                    pr={theme.spacing(1)}
                    mb={theme.spacing(1)}
                  >
                    {portions}
                  </Text>
                  <Text
                    fontSize={theme.fontSize(3)}
                    color="var(--main-color)"
                    onClick={increasePortion}
                    mb={theme.spacing(1)}
                  >
                    +
                  </Text>
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
  Arrow: styled(Img)`
    position: absolute;
    left: 20px;
    top: 20px;
  `,
};
export default memo(Product);
