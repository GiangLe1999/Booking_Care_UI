import { ChangeEvent, FC, useState } from "react";
import AdminProtectedPage from "../containers/admin-protected-page";
import { FormattedMessage } from "react-intl";
import FormInput from "../components/form-input";
import { MdFileUpload } from "react-icons/md";
import StyledImage from "../components/styled-image";
import TextEditor from "../components/text-editor";
import { blobToBase64 } from "../utils/blobToBase64";
import BtnWithLoading from "../components/btn-with-loading";
import { toast } from "react-toastify";
import { createNewClinic } from "../service/clinic.service";

interface Props {}

const ManageClinic: FC<Props> = (props): JSX.Element => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const uploadImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) {
      return;
    }

    const file = files[0];
    const base64: any = await blobToBase64(file);
    setImage(base64.toString());
  };

  const uploadLogoHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) {
      return;
    }

    const file = files[0];
    const base64: any = await blobToBase64(file);
    setLogo(base64.toString());
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const data = await createNewClinic({
        description,
        image,
        logo,
        name,
        address,
      });

      if (!data.ok) {
        setIsLoading(false);
        return toast.error(data.error);
      }

      setIsLoading(false);
      toast.success("Tạo phòng khám mới thành công");
    } catch (error: any) {
      setIsLoading(false);
      return toast.error(error.message);
    }
  };

  return (
    <AdminProtectedPage>
      <div className="admin-page-container">
        <h1 className="admin-page-title">
          <FormattedMessage id="manage-clinic.title" />
        </h1>

        <label
          htmlFor="image"
          className="mt-6 relative w-full aspect-[2.41] rounded-sm flex flex-col justify-center items-center border border-[#cccccc] cursor-pointer"
        >
          {image ? (
            <StyledImage
              src={image}
              alt="Banner"
              wrapperClasses="rounded-md overflow-hidden w-full h-full"
            />
          ) : (
            <>
              <MdFileUpload size={50} className="text-admin_primary" />
              <span className="text-admin_primary font-semibold">
                <FormattedMessage id="manage-clinic.choose-cover" />
              </span>
              <span className="mt-1 text-slate-700">
                <FormattedMessage id="manage-clinic.cover-ratio" />
              </span>
            </>
          )}

          <input
            type="file"
            name="image"
            id="image"
            hidden
            onChange={uploadImageHandler}
          />
        </label>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <FormInput
              id="name"
              label="manage-clinic.choose-name"
              twoLang={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputCustomClasses="bg-transparent border-[#cccccc] rounded-[5px] !py-[6px]"
            />

            <div className="-mt-3">
              <FormInput
                id="address"
                label="manage-clinic.choose-address"
                twoLang={true}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                inputCustomClasses="bg-transparent border-[#cccccc] rounded-[5px] !py-[6px]"
              />
            </div>

            <label
              htmlFor="logo"
              className=" relative w-full aspect-[1.78] rounded-sm flex flex-col justify-center items-center border border-[#cccccc] cursor-pointer"
            >
              {logo ? (
                <StyledImage
                  src={logo}
                  alt="Logo"
                  wrapperClasses="rounded-md overflow-hidden w-full h-full"
                  imageClasses="!object-contain"
                />
              ) : (
                <>
                  <MdFileUpload size={50} className="text-admin_primary" />
                  <span className="text-admin_primary font-semibold">
                    <FormattedMessage id="manage-clinic.choose-thumbnail" />
                  </span>
                  <span className="mt-1 text-slate-700">
                    {" "}
                    <FormattedMessage id="manage-clinic.thumbnail-ratio" />
                  </span>
                </>
              )}

              <input
                type="file"
                name="logo"
                id="logo"
                hidden
                onChange={uploadLogoHandler}
              />
            </label>
          </div>

          <div className="mange-speciaty-editor">
            <label className="form-input-label mb-1 block">
              <FormattedMessage id="manage-schedule.detail" />
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

export default ManageClinic;
