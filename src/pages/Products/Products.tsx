import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading/Loading";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import useFetch from "../../hooks/useFetch/useFetch";

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
  console.log(response);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {response &&
        Object.keys(response).map((productId) => (
          <ProductCard
            key={productId}
            title={response[productId].title}
            description={response[productId].description}
            params={response[productId].params}
          />
        ))}
    </div>
  );
}
