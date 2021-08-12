import { memo, useCallback } from "react";
import { styled } from "@linaria/react";
import { useMutation } from "react-query";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Img } from "components/img";
import UploadPhoto from "assets/icons/upload-photo/upload_photo_icon.svg";
import { uploadFileInRestaurant } from "services/restaurantService";
import { theme } from "theme";

const UploadPhotoComponent = ({
  restaurantId,
  pictureUrl,
  error,
  onFieldValue,
  nameValue,
}) => {
  const uploadFileInRestaurantMutation = useMutation(uploadFileInRestaurant);

  const onChange = useCallback(
    async (e) => {
      const picture = e.target.files[0];
      if (!picture) {
        return;
      }

      const pictureUrlTmp = await uploadFileInRestaurantMutation.mutateAsync({
        restaurantId,
        file: picture,
      });
      onFieldValue(nameValue, pictureUrlTmp);
    },
    [restaurantId, uploadFileInRestaurantMutation, onFieldValue, nameValue]
  );

  return (
    <>
      <label htmlFor="image">
        {pictureUrl ? (
          <s.Preview src={pictureUrl} alt="preview" />
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
        name="image"
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
  `,
  Input: styled.input`
    display: none;
  `,
  Preview: styled(Img)`
    object-fit: contain;
    height: 100px;
    width: 100px;
  `,
};

UploadPhotoComponent.propTypes = {
  restaurantId: PropTypes.string,
  error: PropTypes.bool,
  onFieldValue: PropTypes.func,
  pictureUrl: PropTypes.string,
  nameValue: PropTypes.string,
};

export default memo(UploadPhotoComponent);
