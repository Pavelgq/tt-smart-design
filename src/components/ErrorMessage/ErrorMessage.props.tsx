import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ErrorMessageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  children: ReactNode;
}
