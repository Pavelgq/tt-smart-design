import cn from "classnames";
import { ErrorMessageProps } from "./ErrorMessage.props";

import styles from "./ErrorMessage.module.css";

export function ErrorMessage({
  children,
  className,
  ...props
}: ErrorMessageProps): JSX.Element {
  return (
    <span className={cn(styles.message, className)} {...props}>
      {children}
    </span>
  );
}
