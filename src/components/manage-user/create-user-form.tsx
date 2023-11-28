import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../form-input";
import BtnWithLoading from "../btn-with-loading";
import { createNewUser } from "../../service/user.service";
import { toast } from "react-toastify";
import FormSelect from "../form-select";
import {
  genderOptions,
  positionOptions,
  roleOptions,
} from "../../data/select-options";
import { FormattedMessage } from "react-intl";
import { blobToBase64 } from "../../utils/blobToBase64";
import UploadImageInput from "./upload-image-input";

interface Props {
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
  fetchAllUsers: () => Promise<void>;
}

const schema: any = Yup.object({
  email: Yup.string()
    .email("Your email is invalid")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must has at least 6 characters")
    .required("Please enter your password"),
  firstName: Yup.string()
    .min(1, "First name must has at least 1 characters")
    .required("Please enter your first name"),
  lastName: Yup.string()
    .min(1, "Last name must has at least 1 characters")
    .required("Please enter your last name"),
  phoneNumber: Yup.string()
    .required("Please enter your phone number")
    .matches(/^[0-9]+$/, "Only accept 0 - 9")
    .min(10, "Phone number must have at lease 10 numbers")
    .max(11, "Phone number must have be fewer than 11 numbers"),
  address: Yup.string()
    .min(5, "Address must has at least 5 characters")
    .required("Please enter your last name"),
});

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  gender: string;
  roleId: string;
  positionId: string;
  phoneNumber: string;
}

const CreateUserForm: FC<Props> = ({
  setOpenCreateModal,
  fetchAllUsers,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<any>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      gender: "M",
      roleId: "R1",
      positionId: "",
      phoneNumber: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const uploadAvatarHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) {
      return;
    }

    const file = files[0];
    const base64: any = await blobToBase64(file);
    setAvatar(base64.toString());
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const res = await createNewUser({ ...data, avatar });

      if (!res.ok) {
        toast.error(res.error);
      } else {
        toast.success("Create user successfully!");
        setOpenCreateModal(false);
        fetchAllUsers();
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="bg-admin_main_color text-white py-4 pl-6 text-xl font-bold">
        <FormattedMessage id="create-user-form.title" />
      </h3>

      <div className="py-4 px-6 border-b">
        <div className="grid grid-cols-2 items-center gap-5">
          <FormInput
            id="email"
            label="Email"
            register={register("email")}
            errorMsg={errors.email?.message}
            placeholder="Enter your email"
            twoLang={false}
          />

          <FormInput
            id="password"
            label="create-user-form.password"
            type={"password"}
            register={register("password")}
            errorMsg={errors.password?.message}
            placeholder="Enter your password"
            twoLang={true}
          />
        </div>

        <div className="grid grid-cols-2 items-center gap-5">
          <FormInput
            id="firstName"
            label="create-user-form.first-name"
            register={register("firstName")}
            errorMsg={errors.firstName?.message}
            placeholder="Enter your first name"
            twoLang={true}
          />

          <FormInput
            id="lastName"
            label="create-user-form.last-name"
            register={register("lastName")}
            errorMsg={errors.lastName?.message}
            placeholder="Enter your last name"
            twoLang={true}
          />
        </div>

        <div className="grid grid-cols-2 items-center gap-5">
          <FormSelect
            options={genderOptions}
            id="gender"
            label="create-user-form.gender"
            twoLang={true}
            register={register("gender")}
          />

          <FormSelect
            options={roleOptions}
            id="roleId"
            label="create-user-form.role"
            twoLang={true}
            register={register("roleId")}
          />
        </div>

        <div className="grid grid-cols-2 items-center gap-5">
          <FormInput
            id="phoneNumber"
            type="number"
            label="create-user-form.phone"
            register={register("phoneNumber")}
            errorMsg={errors.phoneNumber?.message}
            placeholder="Enter your phone number"
            twoLang={true}
          />

          <FormSelect
            options={positionOptions}
            id="positionId"
            label="create-user-form.position"
            twoLang={true}
            register={register("positionId")}
          />
        </div>

        <FormInput
          id="address"
          label="create-user-form.address"
          register={register("address")}
          errorMsg={errors.address?.message}
          placeholder="Enter your address"
          twoLang={true}
        />

        <UploadImageInput
          previewImage={avatar}
          imageHandler={uploadAvatarHandler}
        />
      </div>

      <div className="text-right p-6">
        <button
          className="cancel-btn"
          type="button"
          onClick={() => setOpenCreateModal(false)}
        >
          <FormattedMessage id="button.cancel" />
        </button>

        <BtnWithLoading
          content="confirm"
          isLoading={isLoading}
          customClasses="admin-btn"
          type="submit"
        />
      </div>
    </form>
  );
};

export default CreateUserForm;
