import { memo, useCallback, useState } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Img } from "components/img";
import UploadPhoto from "assets/icons/upload-photo/upload_photo_icon.svg";
import { theme } from "theme";

const UploadPhotoComponent = ({
  error,
  onFieldValue,
  nameValue,
  pictureInFormikValue,
}) => {
  const [picture, setPicture] = useState(pictureInFormikValue);

  const onChange = useCallback(
    async (e) => {
      const pictureTmp = e.target.files[0];

      if (!pictureTmp) {
        return;
      }

      const reader = new FileReader();

      reader.readAsDataURL(pictureTmp);
      reader.onload = function () {
        setPicture(reader.result);
        onFieldValue(nameValue, pictureTmp);
      };
    },
    [onFieldValue, nameValue]
  );

  return (
    <>
      <label htmlFor="image">
        {picture ? (
          <s.Container alignItems="center">
            <s.Preview src={picture} alt="preview" />
          </s.Container>
        ) : (
          <s.Container
            p={theme.spacing(2)}
            borderColor={
              error ? "var(--error)" : "var(--grey-color-for-selected-object)"
            }
          >
            <UploadPhoto
              stroke={
                error ? "var(--error)" : "var(--grey-color-for-selected-object)"
              }
            />
          </s.Container>
        )}
      </label>
      <s.Input
        id="image"
        type="file"
        accept="image/x-png,image/gif,image/jpeg"
        onChange={onChange}
      />
    </>
  );
};

const s = {
  Container: styled(Flex)`
    border: ${(props) => `1px solid ${props.borderColor}`};
    border-radius: 3px;
    min-height: 100px;
    box-sizing: border-box;
  `,
  Input: styled.input`
    display: none;
  `,
  Preview: styled(Img)`
    object-fit: contain;
    max-height: 100px;
    width: 100px;
  `,
};

UploadPhotoComponent.propTypes = {
  error: PropTypes.bool,
  onFieldValue: PropTypes.func,
  nameValue: PropTypes.string,
  pictureInFormikValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default memo(UploadPhotoComponent);
