import { memo, useEffect, useState } from "react";
import { styled } from "@linaria/react";

import { theme } from "theme";
import { Flex } from "components/flex";
import { Box } from "components/flex";
import { Label } from "components/label";
import H1 from "components/h1";
import H2 from "components/h2";

import mockCategory from "./mock/mock.categories.json";
import mockCourses from "./mock/mock.courses.json";

const Menu = () => {
  const [category, setCategory] = useState([]);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setCategory(mockCategory);
      setCourse(mockCourses);
    }, 2000);
  }, []);

  return (
    <Flex direction="column" p={theme.spacing(1)}>
      <H1 marginTop="0px">Menu</H1>
      <s.Divider w="100vw" />
      <Flex direction="column" h="91vh" overflowY="scroll" overflowX="hidden">
        {category.map((currentCategory) => (
          <Flex key={Math.random()} direction="column">
            <H2>{currentCategory.category}</H2>
            <Flex w="91vw" overflowX="scroll" ml={theme.spacing(1)}>
              {course.map(
                (currentCourse) =>
                  currentCourse.category === currentCategory.category && (
                    <Flex
                      key={Math.random()}
                      direction="column"
                      mr={theme.spacing(1)}
                      mb={theme.spacing(1)}
                    >
                      <s.Preview
                        src={currentCourse.picture}
                        alt={currentCourse.name}
                      />
                      <Label>{currentCourse.name}</Label>
                      <s.Price>{currentCourse.price}</s.Price>
                    </Flex>
                  )
              )}
            </Flex>
            <s.Divider ml={theme.spacing(1)} w="100vw" />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

const s = {
  Divider: styled(Box)`
    border-bottom: 1px solid var(--grey);
  `,
  Preview: styled.img`
    border-radius: 10%;
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
  `,
  Price: styled.p`
    color: var(--grey);
    margin-bottom: 0;
    margin-top: 4px;
  `,
};

export default memo(Menu);
