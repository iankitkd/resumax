import { cn } from "@/lib/utils";
import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { IconName } from "../Icon/icons";
import Icon from "../Icon";

type TextInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>,"name"> & {
  label?: string;
  error?: string;
  register?: UseFormRegisterReturn; // from register("field")
  iconName?: IconName;
};

const TextInput = ({ label, error, register, iconName, ...rest }: TextInputProps) => {
  return (
    <div>
      {label && (
        <label htmlFor={rest.id} className="pl-2 pb-1 block text-input-label">
          {label}
        </label>
      )}

      <div className="relative">
        {iconName && (<Icon name={iconName} className="absolute left-3 top-1/2 -translate-y-1/2" />)}

        <input
            {...register} // name, ref, onChange, onBlur
            {...rest} // type, placeholder, className, etc.
            className={cn(`w-full px-4 py-3 bg-input text-input-foreground rounded-full focus:outline-none focus:ring-0 focus:ring-ring border-1 border-gray-300 focus:border-indigo-500 transition`, rest.className, (iconName && "pl-9"))}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
