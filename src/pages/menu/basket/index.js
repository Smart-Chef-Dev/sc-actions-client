import { memo, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Img } from "components/img";
import Button from "components/button";
import SwipeDelete from "./components/swipe-delete";
import { Divider } from "components/divider";
import { theme } from "theme";

import productsInBasketState from "atoms/basket";
import icon from "./icon.png";
import basket from "./basket.png";
import { useRoute } from "wouter";
import { Routes } from "../../../constants/routes";

const Basket = () => {
  const [productsInBasketAtoms, setProductsInBasketAtoms] = useRecoilState(
    productsInBasketState
  );

  const [person, setPerson] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [allCount, setAllCount] = useState(0);

  const [candidateForDeletion, setCandidateForDeletion] = useState(0);
  const [, params] = useRoute(Routes.BASKET);

  useEffect(() => {
    if (
      productsInBasketAtoms.length &&
      productsInBasketAtoms[0].restaurantId !== params.restaurant
    ) {
      setProductsInBasketAtoms([]);
    }
  }, [params.restaurant, setProductsInBasketAtoms, productsInBasketAtoms]);

  const increasePortion = useCallback(
    (indexProducts) => () => {
      productsInBasketAtoms[indexProducts].count++;
      setProductsInBasketAtoms([...productsInBasketAtoms]);
    },
    [setProductsInBasketAtoms, productsInBasketAtoms]
  );

  const reducePortion = useCallback(
    (indexProducts) => () => {
      if (productsInBasketAtoms[indexProducts].count > 1) {
        productsInBasketAtoms[indexProducts].count--;
        setProductsInBasketAtoms([...productsInBasketAtoms]);
      }
    },
    [setProductsInBasketAtoms, productsInBasketAtoms]
  );

  const increasePerson = useCallback(() => {
    setPerson(person + 1);
  }, [person]);

  const reducePerson = useCallback(() => {
    if (person > 1) {
      setPerson(person - 1);
    }
  }, [person]);

  useEffect(() => {
    setTotalCost(0);
    setAllCount(0);

    for (let i = 0; i < productsInBasketAtoms.length; i++) {
      if (productsInBasketAtoms[i].productId !== candidateForDeletion) {
        setTotalCost(
          (t) =>
            t +
            Number(productsInBasketAtoms[i].price.replace(/[^.\d]/g, "")) *
              Number(productsInBasketAtoms[i].count)
        );
      }

      setAllCount((t) => t + productsInBasketAtoms[i].count);
    }

    setTotalCost((t) => parseFloat(t).toFixed(1));
  }, [candidateForDeletion, productsInBasketAtoms]);

  const removeComponent = useCallback(() => {
    for (let i = 0; i < productsInBasketAtoms.length; i++) {
      if (productsInBasketAtoms[i].productId === candidateForDeletion) {
        productsInBasketAtoms.splice(i, 1);
        break;
      }
    }
    setProductsInBasketAtoms([...productsInBasketAtoms]);

    setTotalCost(0);
    setAllCount(0);
  }, [candidateForDeletion, setProductsInBasketAtoms, productsInBasketAtoms]);

  const sendAnOrder = useCallback(() => {
    if (productsInBasketAtoms.length) {
      fetch(`/api/menu/sendMessage/${params.restaurant}/${params.tableId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ person: person }, ...productsInBasketAtoms]),
      }).then(() => {
        setProductsInBasketAtoms([]);
      });
    }
  }, [
    productsInBasketAtoms,
    setProductsInBasketAtoms,
    params.restaurant,
    params.tableId,
    person,
  ]);

  return (
    <Flex direction="column" height={1} width={1} boxSizing="border-box">
      <Flex height={1} weight={1} flex={1}>
        <Text
          fontSize={theme.fontSize(3)}
          fontWeight="bold"
          pt={theme.spacing(2)}
          pb={theme.spacing(1)}
          pl={theme.spacing(1)}
        >
          My Order ({allCount})
        </Text>
      </Flex>
      <Divider mb={theme.spacing(1)} ml={theme.spacing(1)} />
      <Flex
        height={1}
        width={1}
        direction="column"
        boxSizing="border-box"
        overflowY="scroll"
        overflowX="hidden"
      >
        <Flex
          width={1}
          direction="column"
          pl={theme.spacing(1)}
          pr={theme.spacing(1)}
          boxSizing="border-box"
        >
          <Flex pb={theme.spacing(1)} width={1} alignItems="center">
            <s.Preview src={icon} alt="icon" />
            <Text fontSize={theme.fontSize(0)} pl={theme.spacing(1)} width={1}>
              Count of persons
            </Text>
            <Flex
              height={1}
              directio="row-reverse"
              width={1}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Text
                fontSize={theme.fontSize(3)}
                pr={theme.spacing(1)}
                color="var(--main-color)"
                onClick={reducePerson}
              >
                -
              </Text>
              <Text fontSize={theme.fontSize(3)}>{person}</Text>
              <Text
                fontSize={theme.fontSize(3)}
                pl={theme.spacing(1)}
                color="var(--main-color)"
                onClick={increasePerson}
              >
                +
              </Text>
            </Flex>
          </Flex>
          <Divider />
        </Flex>
        {productsInBasketAtoms.map((currentValue, index) => (
          <Flex key={index} width={1} direction="column">
            <SwipeDelete
              itemId={currentValue.productId}
              setCandidateForDeletion={setCandidateForDeletion}
            >
              {candidateForDeletion === currentValue.productId ? (
                <Flex width={1} height={1} position="relative">
                  <s.RemoteComponent
                    p={theme.spacing(1)}
                    width={1}
                    alignItems="center"
                  >
                    <s.Preview
                      src={currentValue.picture}
                      alt={currentValue.name}
                    />
                    <Text
                      fontSize={theme.fontSize(0)}
                      pl={theme.spacing(1)}
                      width={1}
                    >
                      {currentValue.name}
                    </Text>
                    <Flex
                      directio="row-reverse"
                      width={1}
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Flex height={1}>
                        <Text
                          fontSize={theme.fontSize(3)}
                          pr={theme.spacing(1)}
                          color="var(--main-color)"
                          onClick={reducePortion(index)}
                        >
                          -
                        </Text>
                        <Text fontSize={theme.fontSize(3)}>
                          {currentValue.count}
                        </Text>
                        <Text
                          fontSize={theme.fontSize(3)}
                          pl={theme.spacing(1)}
                          color="var(--main-color)"
                          onClick={increasePortion(index)}
                        >
                          +
                        </Text>
                      </Flex>
                      <Text pl={theme.spacing(2)}>{currentValue.price}</Text>
                    </Flex>
                  </s.RemoteComponent>
                  <s.DeleteButton
                    alignItems="center"
                    justifyContent="center"
                    onClick={removeComponent}
                  >
                    <img src={basket} alt="basket" />
                  </s.DeleteButton>
                </Flex>
              ) : (
                <Flex p={theme.spacing(1)} width={1} alignItems="center">
                  <s.Preview
                    src={currentValue.picture}
                    alt={currentValue.name}
                  />
                  <Text
                    fontSize={theme.fontSize(0)}
                    pl={theme.spacing(1)}
                    width={1}
                  >
                    {currentValue.name}
                  </Text>
                  <Flex
                    directio="row-reverse"
                    width={1}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Flex height={1}>
                      <Text
                        fontSize={theme.fontSize(3)}
                        pr={theme.spacing(1)}
                        color="var(--main-color)"
                        onClick={reducePortion(index)}
                      >
                        -
                      </Text>
                      <Text fontSize={theme.fontSize(3)}>
                        {currentValue.count}
                      </Text>
                      <Text
                        fontSize={theme.fontSize(3)}
                        pl={theme.spacing(1)}
                        color="var(--main-color)"
                        onClick={increasePortion(index)}
                      >
                        +
                      </Text>
                    </Flex>
                    <Text pl={theme.spacing(2)}>{currentValue.price}</Text>
                  </Flex>
                </Flex>
              )}
            </SwipeDelete>
            <Divider ml={theme.spacing(1)} />
          </Flex>
        ))}
        <Flex
          justifyContent="space-between"
          width={1}
          pl={theme.spacing(1)}
          pr={theme.spacing(1)}
          mt={theme.spacing(1)}
          boxSizing="border-box"
        >
          <Text fontWeight="bold">Total:</Text>
          <Text fontWeight="bold">{totalCost + "$"}</Text>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        height={1}
        justifyContent="flex-end"
        width={1}
        alignItems="center"
        flex={1}
        mt={theme.spacing(2)}
        mb={theme.spacing(1)}
      >
        <Button onClick={sendAnOrder}>Confirm order ({totalCost + "$"})</Button>
      </Flex>
    </Flex>
  );
};

const s = {
  Preview: styled(Img)`
    height: 51px;
    width: 51px;
    object-fit: cover;
    border-radius: 16px;
  `,
  DeleteButton: styled(Flex)`
    width: 58px;
    height: 83px;

    background: var(--main-color);

    position: absolute;
    right: 0;
  `,
  RemoteComponent: styled(Flex)`
    background: var(--highlighted-item);

    position: relative;
    right: 58px;
  `,
};

export default memo(Basket);
