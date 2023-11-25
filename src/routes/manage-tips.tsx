import { ChangeEvent, FC, useState } from "react";
import AdminProtectedPage from "../containers/admin-protected-page";
import { FormattedMessage } from "react-intl";
import StyledImage from "../components/styled-image";
import { blobToBase64 } from "../utils/blobToBase64";
import { MdFileUpload } from "react-icons/md";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BtnWithLoading from "../components/btn-with-loading";
import FormInput from "../components/form-input";
import TextEditor from "../components/text-editor";
import { useGetUser } from "../hooks/useGetUser";
import { toast } from "react-toastify";
import { createNewTip } from "../service/tips.service";

const schema = Yup.object({
  title: Yup.string().required("Please enter title"),
  description: Yup.string().required("Please enter description"),
  slug: Yup.string().required("Please enter slug"),
});

interface Props {}

interface FormValues {
  title: string;
  description: string;
  slug: string;
}

const ManageTips: FC<Props> = (props): JSX.Element => {
  const user = useGetUser();
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      slug: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = async (FormData: FormValues) => {
    try {
      setIsLoading(true);

      const data = await createNewTip({
        title: FormData.title,
        content,
        slug: FormData.slug,
        description: FormData.description,
        thumbnail,
        authorId: user?.id || 0,
      });

      if (!data.ok) {
        setIsLoading(false);
        return toast.error(data.error);
      }

      setIsLoading(false);
      toast.success("Tạo bài viết tips thành công");
    } catch (error: any) {
      setIsLoading(false);
      return toast.error(error.message);
    }
  };

  const uploadThumbnailHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) {
      return;
    }

    const file = files[0];
    const base64: any = await blobToBase64(file);
    setThumbnail(base64.toString());
  };
  return (
    <AdminProtectedPage>
      <div className="admin-page-container">
        <h1 className="admin-page-title">
          <FormattedMessage id="manage-tips.title" />
        </h1>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <label
            htmlFor="thumbnail"
            className="mt-6 relative w-full aspect-[16/9] rounded-sm flex flex-col justify-center items-center border border-[#cccccc] cursor-pointer"
          >
            {thumbnail ? (
              <StyledImage
                src={thumbnail}
                alt="Banner"
                wrapperClasses="rounded-md overflow-hidden w-full h-full"
              />
            ) : (
              <>
                <MdFileUpload size={50} className="text-admin_primary" />
                <span className="text-admin_primary font-semibold">
                  <FormattedMessage id="manage-handbook.choose-thumbnail" />
                </span>
                <span className="mt-1 text-slate-700">
                  <FormattedMessage id="manage-handbook.thumbnail-ratio" />
                </span>
              </>
            )}

            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              hidden
              onChange={uploadThumbnailHandler}
            />
          </label>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              id="title"
              label="manage-handbook.choose-title"
              register={register("title")}
              errorMsg={errors.title?.message}
              placeholder="Enter title"
              twoLang
            />

            <FormInput
              id="slug"
              label="manage-handbook.slug"
              register={register("slug")}
              errorMsg={errors.slug?.message}
              placeholder="Enter slug"
              twoLang
            />

            <FormInput
              textarea
              rows={6}
              id="description"
              label="manage-handbook.choose-description"
              register={register("description")}
              errorMsg={errors.description?.message}
              placeholder="Enter description"
              twoLang
            />

            <div className="text-right">
              <BtnWithLoading
                content="confirm"
                isLoading={isLoading}
                customClasses="mt-3 w-fit"
                type="submit"
              />
            </div>
          </form>
        </div>

        <div className="text-large-editor">
          <label className="form-input-label mb-2 block">
            <FormattedMessage id="manage-handbook.content" />
          </label>
          <TextEditor setContent={setContent} value={content} />
        </div>
      </div>
    </AdminProtectedPage>
  );
};

export default ManageTips;
