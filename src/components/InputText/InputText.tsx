import cn from "classnames";
import { InputTextProps } from "./InputText.props";
import styles from "./InputText.module.css";

export function InputText({
  labelTitle = "",
  className,
  id,
  ...props
}: InputTextProps): JSX.Element {
  return (
    <label htmlFor={id} className={styles.inputLabel}>
      {labelTitle && <span className={styles.labelText}>{labelTitle}:</span>}
      <input className={cn(className, styles.input)} id={id} {...props} />
    </label>
  );
}
