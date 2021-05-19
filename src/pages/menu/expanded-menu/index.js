import { memo, useCallback, useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";

import mockCategory from "pages/menu/mock/mock.categories.json";
import mockCourses from "pages/menu/mock/mock.courses.json";

import { Routes } from "constants/routes";

import { Flex } from "components/flex";
import { theme } from "theme";

const ExpandedMenu = () => {
  const [match, params] = useRoute(Routes.EXPANDED_MENU);
  const [category, setCategory] = useState([]);
  const [course, setCourse] = useState([]);

  const [, setLocation] = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setCategory(mockCategory);
      setCourse(mockCourses);
    }, 1000);
  }, [category, course]);

  let currentList = [];
  if (match) {
    currentList = course.filter(
      (currentValue) => currentValue.categoryId === params.categoryId
    );
  }

  const changeCategory = useCallback(
    (categoryId) => () => {
      setLocation(categoryId);
    },
    [setLocation]
  );

  return (
    <Flex p={theme.spacing(1)} direction="column">
      <Flex>Menu</Flex>
      <Flex>
        {category.map((currentValue) => (
          <Flex key={currentValue.id}>
            <Flex p={theme.spacing(1)}>
              <Flex onClick={changeCategory(currentValue.id)}>
                {currentValue.category}
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
      {match && currentList[0] && (
        <Flex direction="column">
          <Flex>{currentList[0].category}</Flex>
          <Flex direction="column" p={theme.spacing(1)}>
            {currentList.map((currentValue) => (
              <Flex key={currentValue.id}>
                <Flex p={theme.spacing(1)}>{currentValue.name}</Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default memo(ExpandedMenu);
