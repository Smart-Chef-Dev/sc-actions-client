import { memo, useMemo } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Img } from "components/img";
import AddonsProduct from "./addons-product";
import ControlButtons from "./control-buttons";
import { theme } from "theme";
import { formatCurrency } from "utils/formatCurrency";

const MenuItem = ({
  menuItem,
  translations,
  onBasketAtoms,
  basketAtoms,
  itemId,
}) => {
  const inTheBasket = useMemo(() => {
    return !!basketAtoms.order.find(
      (currentValue) => currentValue._id === itemId
    );
  }, [itemId, basketAtoms]);

  return (
    <>
      <Flex width={1} height={0.5} flex={1}>
        <s.Photo src={menuItem.pictureUrl} alt={menuItem.name} width={1} />
      </Flex>
      <s.MainInformation
        direction="column"
        p={theme.spacing(1)}
        pb={theme.spacing(0)}
        height={1}
        width={1}
        boxSizing="border-box"
      >
        {menuItem.time && (
          <s.Time>
            <Text>{`~ ${menuItem.time} ${translations["min"]}`}</Text>
          </s.Time>
        )}
        <Text
          color="var(--text-grey)"
          textTransform="uppercase"
          pb={theme.spacing(1)}
        >
          {menuItem.category.name}
        </Text>
        <Text fontSize={theme.fontSize(3)} pb={theme.spacing(1)}>
          {menuItem.name}
        </Text>
        <Flex justifyContent="space-between" width={1} pb={theme.spacing(1)}>
          {menuItem.weight && (
            <Text color="var(--grey)" height={1} alignItems="center">
              {`${translations["weight"]} ${menuItem.weight} ${translations["g"]}`}
            </Text>
          )}
          <Text color="#4cd964" fontSize="2rem">
            {formatCurrency(
              menuItem.category.restaurant.currencyCode,
              menuItem.price
            )}
          </Text>
        </Flex>
        <Text color="var(--grey)">{menuItem.description}</Text>
        <AddonsProduct
          menuItem={menuItem}
          basketAtoms={basketAtoms}
          itemId={itemId}
          inTheBasket={inTheBasket}
        />
        <ControlButtons
          translations={translations}
          onBasketAtoms={onBasketAtoms}
          menuItem={menuItem}
          basketAtoms={basketAtoms}
          itemId={itemId}
          inTheBasket={inTheBasket}
        />
      </s.MainInformation>
    </>
  );
};

const s = {
  MainInformation: styled(Flex)`
    background: var(--main-bg-color);
    border-radius: 16px 16px 0 0;
    position: relative;
    bottom: 16px;
  `,
  Time: styled(Flex)`
    position: absolute;
    right: 16px;
    top: -16px;

    background: var(--main-bg-color);
    padding: 8px;
    border-radius: 16px;
  `,
  Photo: styled(Img)`
    max-height: 300px;
    object-fit: cover;
  `,
};

MenuItem.propTypes = {
  menuItem: PropTypes.object,
  translations: PropTypes.object,
  onBasketAtoms: PropTypes.func,
  basketAtoms: PropTypes.object,
  itemId: PropTypes.string,
};

export default memo(MenuItem);
