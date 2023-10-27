import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../form-input";
import BtnWithLoading from "../btn-with-loading";
import { toast } from "react-toastify";
import FormSelect from "../form-select";
import { genderOptions, roleOptions } from "../../data/select-options";
import { FetchedUser } from "../../dtos/user.dto";
import { editUser } from "../../service/user-service";

interface Props {
  setOpenEditModal: Dispatch<SetStateAction<boolean>>;
  fetchAllUsers: () => Promise<void>;
  editedUser: FetchedUser | undefined;
  editedUserId: number | null;
}

const schema: any = Yup.object({
  email: Yup.string()
    .email("Your email is invalid")
    .required("Please enter your email"),
  firstName: Yup.string()
    .min(1, "First name must has at least 6 characters")
    .required("Please enter your first name"),
  lastName: Yup.string()
    .min(1, "Last name must has at least 6 characters")
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
  firstName: string;
  lastName: string;
  address: string;
  gender: string;
  role: string;
  phoneNumber: string;
}

const EditUserForm: FC<Props> = ({
  setOpenEditModal,
  fetchAllUsers,
  editedUser,
  editedUserId,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      gender: "0",
      role: "1",
      phoneNumber: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, setValue } = form;

  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    if (editedUserId) {
      const res = await editUser(editedUserId, data);

      if (!res.ok) {
        toast.error(res.error);
      } else {
        toast.success("Edit user successfully!");
        setOpenEditModal(false);
        fetchAllUsers();
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (editedUser) {
      setValue("address", editedUser.address);
      setValue("email", editedUser.email);
      setValue("firstName", editedUser.firstName);
      setValue("lastName", editedUser.lastName);
      setValue("phoneNumber", editedUser.phoneNumber);
      setValue("role", editedUser.roleId.toString());
      setValue("gender", editedUser.gender.toString());
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="bg-admin_main_color text-white py-4 pl-6 text-xl font-bold">
        Create a new user
      </h3>

      <div className="py-4 px-6 border-b">
        <div className="grid grid-cols-2 items-center gap-5">
          <FormInput
            id="email"
            label="Email"
            register={register("email")}
            errorMsg={errors.email?.message}
            placeholder="Enter your email"
          />

          <FormInput
            id="phoneNumber"
            label="Phone number"
            type="number"
            register={register("phoneNumber")}
            errorMsg={errors.phoneNumber?.message}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="grid grid-cols-2 items-center gap-5">
          <FormInput
            id="firstName"
            label="First Name"
            register={register("firstName")}
            errorMsg={errors.firstName?.message}
            placeholder="Enter your first name"
          />

          <FormInput
            id="lastName"
            label="Last Name"
            register={register("lastName")}
            errorMsg={errors.lastName?.message}
            placeholder="Enter your last name"
          />
        </div>

        <div className="grid grid-cols-2 items-center gap-5">
          <FormSelect
            options={genderOptions}
            id="gender"
            label="Gender"
            register={register("gender")}
          />

          <FormSelect
            options={roleOptions}
            id="role"
            label="Role"
            register={register("role")}
          />
        </div>

        <FormInput
          id="address"
          label="Address"
          register={register("address")}
          errorMsg={errors.address?.message}
          placeholder="Enter your address"
        />
      </div>

      <div className="text-right p-6">
        <button
          className="cancel-btn"
          type="button"
          onClick={() => setOpenEditModal(false)}
        >
          Cancel
        </button>

        <BtnWithLoading
          content="Confirm"
          isLoading={isLoading}
          customClasses="admin-btn"
          type="submit"
        />
      </div>
    </form>
  );
};

export default EditUserForm;
