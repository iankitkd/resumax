import { cn } from "@/lib/utils";
import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { IconName } from "../Icon/icons";
import Icon from "../Icon";

type TextInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>,("name" & "placeholder")> & {
  label: string;
  error?: string;
  register?: UseFormRegisterReturn; // from register("field")
  iconName?: IconName;
};

const TextInput = ({ label, error, register, iconName, ...rest }: TextInputProps) => {
  return (
    <div className="relative w-full py-2">
      <input
          {...register} // name, ref, onChange, onBlur
          {...rest} // type, placeholder, className, etc.
          placeholder=" "
          className={cn("peer block w-full px-1 py-1 bg-transparent text-gray-900 border-b border-gray-300 rounded-none focus:border-indigo-500 focus:border-b focus:ring-0 outline-0 transition", rest.className)}
      />
      {label && (
        <div className="flex items-center gap-1 absolute left-1 top-0 -translate-y-1/2 text-sm text-gray-500 transition-all duration-300
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-base
          peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-gray-500 peer-focus:text-sm"
        >
          {iconName && (<Icon name={iconName} className="" />)}
          <label htmlFor={rest.id} className="">
            {label}
          </label>
      </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
