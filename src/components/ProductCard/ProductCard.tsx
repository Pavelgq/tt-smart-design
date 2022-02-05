import { ProductCardProps } from "./ProductCard.props";

export function ProductCard({
  title,
  description,
  params,
}: ProductCardProps): JSX.Element {
  return (
    <div>
      <h1>
        {title}
        {description}
      </h1>
    </div>
  );
}
