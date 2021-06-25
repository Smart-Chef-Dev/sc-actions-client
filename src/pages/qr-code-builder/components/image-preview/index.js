import { memo } from "react";
import PropTypes from "prop-types";

import useImage from "use-image";
import { Image } from "react-konva";

const ImagePreview = ({ src, rotation = 0 }) => {
  const [image] = useImage(src);

  return <Image image={image} rotation={rotation} />;
};

ImagePreview.displayName = "ImagePreview";
ImagePreview.propTypes = {
  src: PropTypes.string.isRequired,
  rotation: PropTypes.number,
};

export default memo(ImagePreview);
