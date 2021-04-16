import React from "react";
import PropTypes from "prop-types";

import Button from "./button";

const ButtonLink = ({ text, href }) => {
  return (
    <Button>
      <a
        rel="noreferrer"
        href={
          href ?? "https://www.cl.cam.ac.uk/~lw525/publications/icn-basics.pdf"
        }
        target="_blank"
      >
        {text}
      </a>
    </Button>
  );
};

ButtonLink.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
};

export default React.memo(ButtonLink);
