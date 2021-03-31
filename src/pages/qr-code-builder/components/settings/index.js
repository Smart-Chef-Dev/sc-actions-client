import { memo } from "react";
import PropTypes from "prop-types";
import ImageUploader from "react-images-upload";

import { Flex } from "components/flex";
import Input from "components/input";
import Slider from "components/slider";
import PopoverPicker from "components/popover-picker";
import { theme } from "theme";
import Button from "components/button";

const imgExtension = [".jpg", ".gif", ".png", ".gif", ".svg"];
const MAX_FILE_SIZE = 5242880;

const Settings = ({
  x,
  y,
  size,
  bgColor,
  fgColor,
  isExportInProgress,
  onSizeChange,
  onBgColorChange,
  onFgColorChange,
  onPictureChange,
  onBgPictureChange,
  onXChange,
  onYChange,
  onExport,
}) => {
  return (
    <>
      <Flex mb={theme.spacing(3)}>
        <span>Settings</span>
      </Flex>
      <Flex width={1} direction="column" mb={theme.spacing(1)}>
        <Input
          type="number"
          label="QrCode x position: "
          name="x"
          value={x}
          onChange={onXChange}
        />
      </Flex>
      <Flex width={1} direction="column" mb={theme.spacing(1)}>
        <Input
          type="number"
          label="QrCode y position: "
          name="y"
          value={y}
          onChange={onYChange}
        />
      </Flex>
      <Flex width={1} direction="column" mb={theme.spacing(1)}>
        <span>
          QrCode Size ({size}x{size}):
        </span>
        <Slider value={size} onChange={onSizeChange} />
      </Flex>
      <Flex width={1}>
        <Flex width={1 / 2} direction="column" mb={theme.spacing(1)}>
          <span>Background: </span>
          <PopoverPicker color={bgColor} onChange={onBgColorChange} />
        </Flex>

        <Flex width={1 / 2} direction="column" mb={theme.spacing(1)}>
          <span>Foreground:</span>
          <PopoverPicker color={fgColor} onChange={onFgColorChange} />
        </Flex>
      </Flex>
      <ImageUploader
        withIcon={false}
        buttonText="Choose images"
        onChange={onPictureChange}
        imgExtension={imgExtension}
        maxFileSize={MAX_FILE_SIZE}
      />
      <ImageUploader
        withIcon={false}
        buttonText="Choose bg image"
        onChange={onBgPictureChange}
        imgExtension={imgExtension}
        maxFileSize={MAX_FILE_SIZE}
      />

      <Button onClick={onExport} disabled={isExportInProgress}>
        Export
      </Button>
    </>
  );
};

Settings.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  size: PropTypes.number,
  bgColor: PropTypes.string,
  fgColor: PropTypes.string,
  isExportInProgress: PropTypes.bool,
  onSizeChange: PropTypes.func,
  onBgColorChange: PropTypes.func,
  onFgColorChange: PropTypes.func,
  onPictureChange: PropTypes.func,
  onBgPictureChange: PropTypes.func,
  onXChange: PropTypes.func,
  onYChange: PropTypes.func,
  onExport: PropTypes.func,
};

export default memo(Settings);
