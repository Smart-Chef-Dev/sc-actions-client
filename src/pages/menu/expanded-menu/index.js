import { memo, useCallback, useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { styled } from "@linaria/react";

import { Routes } from "constants/routes";
import { Flex } from "components/flex";
import { Text } from "components/text";
import { Img } from "components/img";
import { Divider } from "components/divider";
import Navigation from "./components/navigation";
import { theme } from "theme";

import Arrow from "./Arrow.png";
import { useTranslation } from "../../../contexts/translation-context";

const ExpandedMenu = () => {
  const [match, params] = useRoute(Routes.EXPANDED_MENU);
  const [category, setCategory] = useState([]);
  const [course, setCourse] = useState([]);
  const [error, setError] = useState(false);
  const [, setLocation] = useLocation();

  const {
    strings: { expandedMenu: translations },
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

  let currentList = [];
  if (match && !error) {
    currentList = course.filter(
      (currentValue) => currentValue.category._id === params.categoryId
    );
  }

  const arrowClicking = useCallback(() => {
    if (match) {
      setLocation(`/restaurant/${params.restaurant}/${params.tableId}`);
    }
  }, [setLocation, params.restaurant, params.tableId, match]);

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
    <Flex direction="column" height={1} width={1}>
      <s.Arrow alignItems="center">
        <Img src={Arrow} alt="Arrow" onClick={arrowClicking} />
        <Text
          color="var(--text-grey)"
          fontFamily="SF UI Display"
          fontSize={theme.fontSize(2)}
        >
          {translations["menu"]}
        </Text>
      </s.Arrow>
      {match && !error && currentList[0] && (
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
              {currentList[0].category.category}
            </Text>
            <Divider />
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
                  key={currentValue._id}
                  mb={theme.spacing(1)}
                  direction="column"
                  width={1}
                  onClick={pressingItems(currentValue._id)}
                >
                  <s.Preview
                    src={currentValue.picture}
                    alt={currentValue.name}
                    borderRadius="12px 12px 0 0"
                    width={1}
                  />
                  <Text
                    p={theme.spacing(1)}
                    color="var(--text-grey)"
                    fontFamily="SF UI Display"
                    textTransform="uppercase"
                  >
                    {currentValue.category.category}
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
                      color="var(--text-grey)"
                      font-family="SF UI Display"
                      fontSize={theme.fontSize(0)}
                    >
                      {`${currentValue.weight} ${translations["g"]}`}
                    </Text>
                    <Flex direction="row-reverse" width={1}>
                      <Text
                        m={theme.spacing(1)}
                        fontSize={theme.fontSize(2)}
                        fontWeight="bold"
                      >
                        {currentValue.price}$
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
    box-shadow: 0px 5px 15px var(--shadow);
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
};
export default memo(ExpandedMenu);
