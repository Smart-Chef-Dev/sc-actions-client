import { memo } from "react";
import PropTypes from "prop-types";

import useImage from "use-image";
import { Image } from "react-konva";

const ImagePreview = ({ src }) => {
  const [image] = useImage(src);

  return <Image image={image} />;
};

ImagePreview.displayName = "ImagePreview";
ImagePreview.propTypes = {
  src: PropTypes.string.isRequired,
};

export default memo(ImagePreview);
