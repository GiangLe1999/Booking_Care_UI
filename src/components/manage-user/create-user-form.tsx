import { Dispatch, FC, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../form-input";
import BtnWithLoading from "../btn-with-loading";
import { createNewUser } from "../../service/user-service";
import { toast } from "react-toastify";

interface Props {
  setOpenCreateModal: Dispatch<React.SetStateAction<boolean>>;
  fetchAllUsers: () => Promise<void>;
}

const schema = Yup.object({
  email: Yup.string()
    .email("Your email is invalid")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must has at least 6 characters")
    .required("Please enter your password"),
  firstName: Yup.string()
    .min(1, "First name must has at least 6 characters")
    .required("Please enter your first name"),
  lastName: Yup.string()
    .min(1, "Last name must has at least 6 characters")
    .required("Please enter your last name"),
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
}

const CreateUserForm: FC<Props> = ({
  setOpenCreateModal,
  fetchAllUsers,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    const res = await createNewUser(data);

    if (!res.ok) {
      toast.error(res.error);
    } else {
      toast.success("Create user successfully!");
      setOpenCreateModal(false);
      fetchAllUsers();
    }

    setIsLoading(false);
  };

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
            id="password"
            label="Password"
            type={"password"}
            register={register("password")}
            errorMsg={errors.password?.message}
            placeholder="Enter your password"
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
          onClick={() => setOpenCreateModal(false)}
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

export default CreateUserForm;
