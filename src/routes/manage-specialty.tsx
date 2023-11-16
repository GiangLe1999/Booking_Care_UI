import { ChangeEvent, FC, useState } from "react";
import AdminProtectedPage from "../containers/admin-protected-page";
import { FormattedMessage } from "react-intl";
import FormInput from "../components/form-input";
import { MdFileUpload } from "react-icons/md";
import StyledImage from "../components/styled-image";
import TextEditor from "../components/text-editor";
import { blobToBase64 } from "../utils/blobToBase64";
import BtnWithLoading from "../components/btn-with-loading";
import { createNewSpecialty } from "../service/specialty.service";
import { toast } from "react-toastify";

interface Props {}

const ManageSpecialty: FC<Props> = (props): JSX.Element => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const uploadThumbnailHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) {
      return;
    }

    const file = files[0];
    const base64: any = await blobToBase64(file);
    setImage(base64.toString());
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const data = await createNewSpecialty({ description, image, name });

      if (!data.ok) {
        setIsLoading(false);
        return toast.error(data.error);
      }

      setIsLoading(false);
      toast.success("Tạo chuyên khoa mới thành công");
    } catch (error: any) {
      setIsLoading(false);
      return toast.error(error.message);
    }
  };

  return (
    <AdminProtectedPage>
      <div className="admin-page-container">
        <h1 className="admin-page-title">
          <FormattedMessage id="manage-specialty.title" />
        </h1>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <FormInput
              id="name"
              label="manage-specialty.choose-name"
              twoLang={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputCustomClasses="bg-transparent border-[#cccccc] rounded-[5px] !py-[6px]"
            />

            <label
              htmlFor="image"
              className=" relative w-full aspect-[1.78] rounded-sm flex flex-col justify-center items-center border border-[#cccccc] cursor-pointer"
            >
              {image ? (
                <StyledImage
                  src={image}
                  alt="Thumbnail"
                  wrapperClasses="rounded-md overflow-hidden w-full h-full"
                />
              ) : (
                <>
                  <MdFileUpload size={50} className="text-admin_primary" />
                  <span className="text-admin_primary font-semibold">
                    <FormattedMessage id="manage-specialty.choose-thumbnail" />
                  </span>
                  <span className="mt-1 text-slate-700">
                    {" "}
                    <FormattedMessage id="manage-specialty.thumbnail-ratio" />
                  </span>
                </>
              )}

              <input
                type="file"
                name="image"
                id="image"
                hidden
                onChange={uploadThumbnailHandler}
              />
            </label>
          </div>

          <div className="mange-speciaty-editor">
            <label className="form-input-label mb-1 block">
              <FormattedMessage id="manage-doctor.detail" />
            </label>
            <TextEditor setContent={setDescription} value={description} />
          </div>
        </div>

        <div className="text-right mt-3">
          <BtnWithLoading
            content="confirm"
            isLoading={isLoading}
            customClasses="admin-btn"
            type="button"
            onClick={onSubmit}
          />
        </div>
      </div>
    </AdminProtectedPage>
  );
};

export default ManageSpecialty;
