import React from "react";
import PropTypes from "prop-types";

import ButtonLink from "components/button-link";
import Button from "components/button";

const ActionComponent = ({ _id, link, name, onClick }) => {
  return link ? (
    <ButtonLink text={name} href={link} />
  ) : (
    <Button classNames="margin-bottom-one" onClick={onClick(_id)}>
      {name}
    </Button>
  );
};

ActionComponent.propTypes = {
  _id: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(ActionComponent);
