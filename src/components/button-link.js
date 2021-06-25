import { memo } from "react";
import PropTypes from "prop-types";

import Button from "./button";

const ButtonLink = ({ text, href }) => {
  return (
    <Button>
      <a rel="noreferrer" href={href} target="_blank">
        {text}
      </a>
    </Button>
  );
};

ButtonLink.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
};

export default memo(ButtonLink);
