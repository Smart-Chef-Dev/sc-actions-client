import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { theme } from "theme";
import { Flex } from "components/flex";
import { Text } from "components/text";
import { Divider } from "components/divider";
import Counter from "components/counter";

import Icon from "assets/icons/basket/icon.svg";

const PeopleCounter = ({ basketAtoms, onBasketAtoms, translations }) => {
  const changeNumberOfPeople = useCallback(
    (diff) => () =>
      basketAtoms.personCount + diff >= 1 &&
      onBasketAtoms({
        ...basketAtoms,
        personCount: basketAtoms.personCount + diff,
      }),
    [basketAtoms, onBasketAtoms]
  );

  return (
    <Flex
      width={1}
      direction="column"
      pl={theme.spacing(1)}
      boxSizing="border-box"
    >
      <Flex
        boxSizing="border-box"
        pb={theme.spacing(1)}
        pr={theme.spacing(1)}
        width={1}
        alignItems="center"
      >
        <Flex>
          <Icon />
        </Flex>
        <Text fontSize={theme.fontSize(0)} pl={theme.spacing(1)} width={1}>
          {translations["count_of_persons"]}
        </Text>
        <Flex
          height={1}
          directio="row-reverse"
          width={1}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Flex>
            <Counter
              decreaseCount={changeNumberOfPeople(-1)}
              increaseCount={changeNumberOfPeople(+1)}
              count={basketAtoms.personCount}
            />
          </Flex>
        </Flex>
      </Flex>
      <Divider />
    </Flex>
  );
};

PeopleCounter.propTypes = {
  basketAtoms: PropTypes.object,
  onBasketAtoms: PropTypes.func,
  translations: PropTypes.object,
};

export default memo(PeopleCounter);
