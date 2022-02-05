import cn from "classnames";
import { ProductCardProps } from "./ProductCard.props";
import styles from "./ProductCard.module.css";

export function ProductCard({
  title,
  description,
  params,
  className,
  ...props
}: ProductCardProps): JSX.Element {
  return (
    <div className={cn(styles.card, className)}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>

      <ul className={styles.list}>
        {params.map(
          (p) =>
            p.value && (
              <li key={p.title} className={styles.item}>
                <h3 className={styles.paramTitle}>{p.description}</h3>
                <span className={styles.paramValue}>{p.value}</span>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
