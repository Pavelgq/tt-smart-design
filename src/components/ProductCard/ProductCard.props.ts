import { DetailedHTMLProps, HTMLAttributes } from "react";
import { ProductParamI } from "../../interfaces/Product.interface";


export interface ProductCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  description: string;
  params: ProductParamI[];
}