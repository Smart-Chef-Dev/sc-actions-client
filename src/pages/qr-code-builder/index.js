import { memo, useCallback, useEffect, useRef, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { theme } from "theme";
import { useErrorContext } from "pages/error-boundary";
import { Flex } from "components/flex";
import { urlToFile } from "utils/images";
import { delay } from "utils/common";
import Settings from "./components/settings";
import Preview from "./components/preview";

const QrCodeBuilderPage = () => {
  const [content, setContent] = useState(`${window.location.origin}/no-data`);
  const [restaurant, setRestaurant] = useState(null);
  const [size, setSize] = useState(512);
  const [angle, setAngle] = useState(0);
  const [bgColor, setBgColor] = useState("#FFF");
  const [fgColor, setFgColor] = useState("#000");
  const [[picture], setPicture] = useState([null]);
  const [[bgPicture], setBgPicture] = useState([null]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isExportInProgress, setIsExportInProgress] = useState(false);
  const qrCodeCanvasRef = useRef(null);
  const { handleError } = useErrorContext();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get("restaurantId");
    if (!restaurantId) {
      return handleError(new Error("RestaurantId should be provided"));
    }

    fetch(`/api/restaurant/${restaurantId}`)
      .then((resp) => resp.json())
      .then((r) => setRestaurant(r));
  }, []);

  const handleExportButtonClick = useCallback(async () => {
    if (isExportInProgress) {
      return;
    }

    setIsExportInProgress(true);
    const zip = new JSZip();
    const qrCodeFolder = zip.folder(restaurant.name);

    for (let { _id: id, name } of restaurant.tables) {
      const newContent = `${window.location.origin}/${restaurant._id}/${id}`;
      setContent(newContent);

      await delay(2000);

      const file = await urlToFile(qrCodeCanvasRef.current.toDataURL());
      qrCodeFolder.file(`${name}.png`, file);
    }

    zip
      .generateAsync({ type: "blob" })
      .then((content) => saveAs(content, `${restaurant.name}.zip`))
      .finally(() => setIsExportInProgress(false));
  }, [isExportInProgress, restaurant]);

  return (
    <Flex width={1} height={1}>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        width={1 / 4}
        mx={theme.spacing(1)}
      >
        <Settings
          content={content}
          angle={angle}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          picture={picture}
          x={x}
          y={y}
          isExportInProgress={isExportInProgress}
          onContentChange={setContent}
          onSizeChange={setSize}
          onAngleChange={setAngle}
          onBgColorChange={setBgColor}
          onFgColorChange={setFgColor}
          onPictureChange={setPicture}
          onBgPictureChange={setBgPicture}
          onXChange={setX}
          onYChange={setY}
          onExport={handleExportButtonClick}
        />
      </Flex>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        width={3 / 4}
      >
        <Preview
          ref={qrCodeCanvasRef}
          x={x}
          y={y}
          content={content}
          angle={angle}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          picture={picture}
          bgPicture={bgPicture}
          onSizeChange={setSize}
        />
      </Flex>
    </Flex>
  );
};

export default memo(QrCodeBuilderPage);
