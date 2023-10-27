import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { AiOutlineWarning } from "react-icons/ai";

interface Props {
  id: string;
  label: string;
  register: UseFormRegisterReturn<string>;
  errorMsg?: string | undefined;
  options: { text: string; value: any }[];
}

const FormSelect: FC<Props> = ({
  id,
  label,
  register,
  errorMsg,
  options,
}): JSX.Element => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="text-sm font-bold text-normal_text">
        {label}
      </label>
      <select
        id={id}
        {...register}
        className="w-full outline-none border bg-[#f5f5f5] rounded-sm py-[10px] px-4"
      >
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>
      {errorMsg && (
        <p className="text-xs text-red-700 mt-1 flex items-center gap-[2px]">
          <AiOutlineWarning />
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default FormSelect;
