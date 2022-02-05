import cn from "classnames";
import styles from "./FieldSet.module.css";
import { FieldSetProps } from "./FieldSet.props";

export function FieldSet({
  legend = "",
  className,
  children,
  ...props
}: FieldSetProps): JSX.Element {
  return (
    <fieldset className={cn(styles.field, className)} {...props}>
      {legend && <legend>{legend}</legend>}
      {children}
    </fieldset>
  );
}
