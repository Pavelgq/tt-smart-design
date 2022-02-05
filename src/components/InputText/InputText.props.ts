import { DetailedHTMLProps, InputHTMLAttributes } from "react";


export interface InputTextProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  labelTitle?: string
}