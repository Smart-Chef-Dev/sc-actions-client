/* eslint-disable no-unused-vars */
import { memo, useEffect, useMemo, useRef, useState, forwardRef } from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import { styled } from "@linaria/react";
import { Stage, Layer } from "react-konva";

import { Flex } from "components/flex";
import { theme } from "theme";
import { getBase64, getImageDimensions } from "utils/images";
import ImagePreview from "../image-preview";

const MAX_CANVAS_SIZE = 512;

const Preview = forwardRef(
  (
    { x, y, content, size, bgColor, fgColor, picture, bgPicture, onSizeChange },
    ref
  ) => {
    const containerRef = useRef(null);
    const [pictureSrc, setPictureSrc] = useState("");
    const [imageSrc, setImageSrc] = useState("");
    const [imageBgSrc, setImageBgSrc] = useState("");
    const [canvasWidth, setCanvasWidth] = useState(MAX_CANVAS_SIZE);
    const [canvasHeight, setCanvasHeight] = useState(MAX_CANVAS_SIZE);

    useEffect(() => {
      if (picture) {
        getBase64(picture).then(setPictureSrc);
      }
    }, [picture]);

    const imageSettings = useMemo(() => {
      return {
        src: pictureSrc,
        width: size / 3,
        height: size / 3,
      };
    }, [pictureSrc, size]);

    useEffect(() => {
      const svgElement = containerRef.current.querySelector("svg");
      const xml = new XMLSerializer().serializeToString(svgElement);
      const svg64 = btoa(xml);
      const b64Start = "data:image/svg+xml;base64,";
      const image64 = b64Start + svg64;

      setImageSrc(image64);
      // only update when new QR code render
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content, size, picture, bgColor, fgColor, imageSettings]);

    useEffect(() => {
      if (!bgPicture) {
        return;
      }

      getBase64(bgPicture).then(async (imgBase64) => {
        const { w, h } = await getImageDimensions(imgBase64);
        setCanvasWidth(w);
        setCanvasHeight(h);
        onSizeChange(w);
        setImageBgSrc(imgBase64);
      });
    }, [bgPicture, onSizeChange]);

    return (
      <>
        <Flex mb={theme.spacing(3)}>
          <span>Preview</span>
        </Flex>
        <s.QRCodeContainer ref={containerRef}>
          <QRCode
            value={content}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            level="H"
            imageSettings={imageSettings}
            includeMargin={false}
            renderAs="svg"
          />
        </s.QRCodeContainer>
        {imageSrc && (
          <Stage ref={ref} width={canvasWidth} height={canvasHeight}>
            <Layer>
              <ImagePreview src={imageBgSrc} />
            </Layer>
            <Layer x={x} y={y}>
              <ImagePreview src={imageSrc} />
            </Layer>
          </Stage>
        )}
      </>
    );
  }
);

const s = {
  QRCodeContainer: styled.div`
    position: fixed;
    top: 0;
    left: 9999px;
  `,
};

Preview.displayName = "Preview";
Preview.propTypes = {
  content: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  size: PropTypes.number,
  bgColor: PropTypes.string,
  fgColor: PropTypes.string,
  picture: PropTypes.object,
  bgPicture: PropTypes.object,
  onSizeChange: PropTypes.func,
};

export default memo(Preview);
