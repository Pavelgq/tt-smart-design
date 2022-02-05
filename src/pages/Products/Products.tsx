import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading/Loading";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import useFetch from "../../hooks/useFetch/useFetch";

import styles from "./Products.module.css";

export function Products(): JSX.Element {
  const [filter, setFilter] = useState("");

  const { isLoading, response, error, doFetch } = useFetch();

  const newFilter = "";
  useEffect(() => {
    doFetch({
      url: `/product/all${newFilter}`,
      method: "GET",
      timeout: 5000,
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={styles.cardList}>
      {response &&
        Object.keys(response).map((productId) => (
          <ProductCard
            key={productId}
            className={styles.card}
            title={response[productId].title}
            description={response[productId].description}
            params={response[productId].params}
          />
        ))}
    </div>
  );
}
