import { useCallback, useRef, useState, memo } from "react";
// import { createPortal } from "react-dom";
import { HexColorPicker, HexColorInput } from "react-colorful";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import { useClickOutside } from "hooks/useClickOutside";

const PopoverPicker = ({ color, onChange }) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const open = useCallback(() => toggle(true), []);
  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <Picker>
      <Flex>
        <Swatch color={color} onClick={open} />
        <StyledHexColorInput color={color} onChange={onChange} />
      </Flex>

      {isOpen && (
        <Popover ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </Popover>
      )}
    </Picker>
  );
};

const Flex = styled.div`
  display: flex;
`;

const Picker = styled.div`
  position: relative;
`;

const Popover = styled.div`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  border-radius: 9px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  z-index: 9;
`;

const Swatch = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.color};
  border: 1px solid rgba(0, 0, 0, 0.15);

  &:focus {
    outline: none;
  }
`;

const StyledHexColorInput = styled(HexColorInput)`
  display: block;
  box-sizing: border-box;
  width: 90px;
  border: 1px solid #ddd;
  background: #eee;
  outline: none;
  font: inherit;
  text-transform: uppercase;
  text-align: center;

  &:focus {
    border-color: #4298ef;
  }
`;

PopoverPicker.propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func,
};

export default memo(PopoverPicker);
