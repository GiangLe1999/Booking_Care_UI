"use client";

import { ChangeEvent, FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { AiOutlineWarning } from "react-icons/ai";
import { FormattedMessage } from "react-intl";

interface Props {
  id: string;
  type?: string;
  label: string;
  register?: UseFormRegisterReturn<string>;
  errorMsg?: string | undefined;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
  value?: any;
  readOnly?: boolean;
  twoLang: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputCustomClasses?: string;
  labelCustomClasses?: string;
}

const FormInput: FC<Props> = ({
  type,
  id,
  label,
  register,
  errorMsg,
  textarea,
  rows,
  placeholder,
  disabled,
  value,
  readOnly,
  onChange,
  twoLang,
  inputCustomClasses,
  labelCustomClasses,
}): JSX.Element => {
  let Component: any = "input";
  if (textarea) Component = "textarea";
  return (
    <div className="mb-4">
      <label htmlFor={id} className={`form-input-label ${labelCustomClasses}`}>
        {twoLang ? <FormattedMessage id={label} /> : label}
      </label>
      <Component
        id={id}
        type={type || "text"}
        {...register}
        className={`w-full outline-none border bg-[#f5f5f5] rounded-sm py-[10px] px-4 ${
          disabled && "opacity-50"
        } ${inputCustomClasses}`}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
      />
      {errorMsg && (
        <p className="text-xs text-red-700 mt-1 flex items-center gap-[2px]">
          <AiOutlineWarning />
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default FormInput;
