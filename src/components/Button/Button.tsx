import cn from "classnames";
import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";

export function Button({
  variant,
  children,
  className,
  type = "button",
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={cn(styles.button, className, {
        [styles.contained]: variant === "contained",
        [styles.outlined]: variant === "outlined",
      })}
      {...props}
    >
      {children}
    </button>
  );
}
