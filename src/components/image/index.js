import { memo, Suspense } from "react";
import PropTypes from "prop-types";
import SuspenseImg from "./suspense-img";

const ImageContainer = ({ children, preSrc, src: url }) => {
  return (
    <Suspense fallback={children(preSrc)}>
      <SuspenseImg src={url}>{(src) => children(src)}</SuspenseImg>
    </Suspense>
  );
};

ImageContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  preSrc: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default memo(ImageContainer);
