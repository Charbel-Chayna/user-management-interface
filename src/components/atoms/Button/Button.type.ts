export enum ButtonVariant {
    PRIMARY = "primary",
    OUTLINE_PRIMARY = "outline-primary",
    DANGER = "danger",
  }
  
  type HtmlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
  export interface ButtonProps {
    type?: HtmlButtonProps["type"];
    onClick?: HtmlButtonProps["onClick"];
    children: React.ReactNode;
    variant?: ButtonVariant;
    disabled?: boolean;
    className?: string;
  }
  