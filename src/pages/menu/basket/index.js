import { memo, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Img } from "components/img";
import Button from "components/button";
import SwipeDelete from "./components/swipe-delete";
import { theme } from "theme";

import productsInBasketState from "atoms/basket";
import icon from "./icon.png";
import basket from "./basket.png";

const Basket = () => {
  const [productsInBasket, setProductsInBasket] = useRecoilState(
    productsInBasketState
  );
  const [products, setProducts] = useState(productsInBasket);

  const [person, setPerson] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [allPortions, setAllPortions] = useState(0);

  const [candidateForDeletion, setCandidateForDeletion] = useState(0);

  const increasePortion = useCallback(
    (indexProducts) => () => {
      products[indexProducts].portions++;
      setProducts([...products]);
      setProductsInBasket([...products]);

      setTotalCost(0);
      setAllPortions(0);
    },
    [products, setProductsInBasket]
  );

  const reducePortion = useCallback(
    (indexProducts) => () => {
      if (products[indexProducts].portions !== 1) {
        products[indexProducts].portions--;
        setProducts([...products]);
        setProductsInBasket([...products]);

        setTotalCost(0);
        setAllPortions(0);
      }
    },
    [products, setProductsInBasket]
  );

  const increasePerson = useCallback(() => {
    setPerson(person + 1);
  }, [person]);

  const reducePerson = useCallback(() => {
    if (person !== 1) {
      setPerson(person - 1);
    }
  }, [person]);

  useEffect(() => {
    for (let i = 0; i < products.length; i++) {
      setTotalCost(
        (t) =>
          t +
          Number(products[i].price.replace(/[^.\d]/g, "")) *
            Number(products[i].portions)
      );

      setAllPortions((t) => t + products[i].portions);
    }

    setTotalCost((t) => parseFloat(t).toFixed(1));
  }, [products]);

  const removeComponent = useCallback(() => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].productId === candidateForDeletion) {
        products.splice(i, 1);
        break;
      }
    }
    setProducts([...products]);
    setProductsInBasket([...products]);

    setTotalCost(0);
    setAllPortions(0);
  }, [products, candidateForDeletion, setProductsInBasket]);

  return (
    <Flex direction="column" height={1} weight={1} boxSizing="border-box">
      <Flex height={1} weight={1} flex={1}>
        <Text
          fontSize={theme.fontSize(3)}
          fontWeight="bold"
          pt={theme.spacing(2)}
          pb={theme.spacing(1)}
          pl={theme.spacing(1)}
        >
          My Order ({allPortions})
        </Text>
      </Flex>
      <s.Divider mb={theme.spacing(1)} ml={theme.spacing(1)} />
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
          <s.Divider />
        </Flex>
        {products.map((currentValue, index) => (
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
                          {currentValue.portions}
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
                        {currentValue.portions}
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
            <s.Divider ml={theme.spacing(1)} />
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
        <Button>Confirm order ({totalCost + "$"})</Button>
        <Text fontSize={theme.fontSize(0)} color="var(--grey)">
          Continue the order
        </Text>
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

  Divider: styled(Flex)`
    border-bottom: 1px solid var(--grey);
    width: 300%;
  `,
  DeleteButton: styled(Flex)`
    width: 58px;
    height: 83px;

    background: var(--main-color);

    position: absolute;
    right: 0;
  `,
  RemoteComponent: styled(Flex)`
    background: var(--grey);

    position: relative;
    right: 58px;
  `,
};

export default memo(Basket);
