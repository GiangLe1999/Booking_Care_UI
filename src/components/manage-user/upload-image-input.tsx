import { ChangeEvent, FC } from "react";
import { FormattedMessage } from "react-intl";
import StyledImage from "../styled-image";
import { MdUpload } from "react-icons/md";

interface Props {
  previewImage?: string;
  imageHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UploadImageInput: FC<Props> = ({
  previewImage,
  imageHandler,
}): JSX.Element => {
  return (
    <>
      <label htmlFor="avatar" className="form-input-label block">
        <FormattedMessage id="create-user-form.avatar" />
      </label>
      <label
        htmlFor="avatar"
        className="w-full h-32 bg-section_bg flex flex-col gap-y-2 items-center justify-center mt-1 border text-sm cursor-pointer"
      >
        {previewImage ? (
          <StyledImage
            src={previewImage}
            alt="Preview"
            wrapperClasses="w-full h-full"
            imageClasses="!object-contain"
          />
        ) : (
          <>
            <MdUpload size={25} />
            <FormattedMessage id="create-user-form.upload" />
          </>
        )}
      </label>
      <input type="file" id="avatar" hidden onChange={imageHandler} />
    </>
  );
};

export default UploadImageInput;
