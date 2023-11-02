import { FC, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../../components/form-input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import BtnWithLoading from "../../components/btn-with-loading";
import { FcGoogle } from "react-icons/fc";
import { loginHandler } from "../../service/user.service";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/slices/user-slice";
import { path } from "../../constants";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoggedinUser } from "../../dtos/user.dto";
import { FormattedMessage } from "react-intl";

const schema = Yup.object({
  email: Yup.string()
    .email("Your email is invalid")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must has at least 6 characters")
    .required("Please enter your password"),
});

interface Props {}

interface FormValues {
  email: string;
  password: string;
}

const Login: FC<Props> = (props): JSX.Element | null => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isUser = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    const res = await loginHandler(data);

    if (!res.ok) {
      toast.error(res.error);
    } else {
      dispatch(userLogin(res.user as LoggedinUser));
      toast.success("Login successfully!");
      navigate(path.MANAGE_USER);
    }

    setIsLoading(false);
  };

  if (isUser) return <Navigate to={path.HOME} replace={true} />;

  return (
    <div className="h-screen bg-[linear-gradient(135deg,#22c1c3_0%,#fdbb2d_100%)] grid place-items-center">
      <div className="w-[400px] bg-white px-8 py-10 rounded-sm">
        <h3 className="form-title">
          <FormattedMessage id="login-form.title" />
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormInput
            id="email"
            label="Email"
            register={register("email")}
            errorMsg={errors.email?.message}
            placeholder="Enter your email"
            twoLang={false}
          />

          <div className="relative">
            <FormInput
              id="password"
              label="login-form.password"
              type={showPassword ? "text" : "password"}
              register={register("password")}
              errorMsg={errors.password?.message}
              placeholder="Enter your password"
              twoLang={true}
            />
            <div
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </div>
          </div>

          <BtnWithLoading
            content="login"
            isLoading={isLoading}
            customClasses="mt-2 w-full uppercase"
            type="submit"
          />

          <p className="mt-8 mb-2 text-center text-sm text-normal_text">
            <FormattedMessage id="login-form.join-with" />
          </p>
          <div className="flex items-center justify-center gap-x-2">
            <FcGoogle size={30} className="cursor-pointer" />
            <img
              src="/assets/images/icons/facebook.png"
              alt="Facebook login"
              className="w-[31px] cursor-pointer"
            />
          </div>

          <p className="text-center mt-8 text-sm text-normal_text">
            <FormattedMessage id="login-form.forgot-password" />
            <span className="form-link">
              <FormattedMessage id="button.click-here" />
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
