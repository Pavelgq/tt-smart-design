import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface FieldSetProps extends DetailedHTMLProps<HTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> {
  children: ReactNode;
  legend?: string;
}