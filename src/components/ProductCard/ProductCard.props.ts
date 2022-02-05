import { ProductParamI } from "../../interfaces/Product.interface";


export interface ProductCardProps {
  title: string;
  description: string;
  params: ProductParamI[];
}