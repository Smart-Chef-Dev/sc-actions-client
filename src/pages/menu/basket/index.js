import { memo, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Img } from "components/img";
import Button from "components/button";
import { theme } from "theme";

import productsInBasketState from "atoms/basket";
import icon from "./icon.png";

const Basket = () => {
  const [productsInBasket, setProductsInBasket] = useRecoilState(
    productsInBasketState
  );
  const [products, setProducts] = useState(productsInBasket);

  const [person, setPerson] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [allPortions, setAllPortions] = useState(0);

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

    setTotalCost((t) => t.toFixed(1));
  }, [products]);

  return (
    <Flex
      direction="column"
      height={1}
      weight={1}
      p={theme.spacing(1)}
      boxSizing="border-box"
    >
      <Flex height={1} weight={1} flex={1}>
        <Text
          fontSize={theme.fontSize(3)}
          fontWeight="bold"
          pt={theme.spacing(1)}
          pb={theme.spacing(1)}
        >
          My Order ({allPortions})
        </Text>
      </Flex>
      <s.Divider mb={theme.spacing(1)} />
      <Flex
        height={1}
        width={1}
        direction="column"
        boxSizing="border-box"
        overflowY="scroll"
        overflowX="hidden"
      >
        <Flex width={1} direction="column">
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
          <s.Divider mb={theme.spacing(1)} />
        </Flex>
        {products.map((currentValue, index) => (
          <Flex key={index} width={1} direction="column">
            <Flex pb={theme.spacing(1)} width={1} alignItems="center">
              <s.Preview src={currentValue.picture} alt={currentValue.name} />
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
            <s.Divider mb={theme.spacing(1)} />
          </Flex>
        ))}
        <Flex justifyContent="space-between" width={1}>
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
};

export default memo(Basket);
