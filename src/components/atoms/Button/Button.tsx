import React from "react";
import { ButtonProps, ButtonVariant } from "./Button.type";
import clsx from "clsx";

const variantStyles = {
  [ButtonVariant.PRIMARY]: "bg-[var(--color-primary)] hover:bg-[var(--color-primary)] text-white",
  [ButtonVariant.OUTLINE_PRIMARY]:
    "border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
  [ButtonVariant.DANGER]: "bg-red-600 hover:bg-red-700 text-white",
};

const Button: React.FC<ButtonProps> = React.memo(
  ({
    onClick,
    children,
    variant,
    disabled,
    type = "button",
    className,
  }) => {
    const baseStyle = "px-4 py-2 rounded transition-colors duration-200 font-semibold text-center";
    const disabledStyle = disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer";
    const variantStyle = variant ? variantStyles[variant] : "";

    return (
      <button
        type={type}
        onClick={!disabled ? onClick : undefined}
        className={clsx(baseStyle, disabledStyle, variantStyle, className)}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

export { Button };
