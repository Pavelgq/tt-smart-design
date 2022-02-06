import { loadavg } from "os";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { InputText } from "../../components/InputText/InputText";
import { Loading } from "../../components/Loading/Loading";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import useFetch from "../../hooks/useFetch/useFetch";

import styles from "./Products.module.css";

export function Products(): JSX.Element {
  const [filter, setFilter] = useState("Название");
  const [filterItems, setFilterItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const { isLoading, response, error, doFetch } = useFetch();

  // const filterOptions = () => {
  //   if (!response.filters) {
  //     return filterItems;
  //   }
  //   setFilterItems(response.filters);
  //   return filterItems;
  // };

  const searchProduct = () => {
    const newFilter = `?${filter}=${searchValue}`;
    doFetch({
      url: `/product/all${newFilter}`,
      method: "GET",
      timeout: 5000,
    });
  };
  useEffect(() => {
    console.log(response, "sdsds");
    if (filterItems.length === 0 && response) {
      setFilterItems(response.filters);
    }
  }, [response]);

  useEffect(() => {
    doFetch({
      url: `/product/all`,
      method: "GET",
      timeout: 5000,
    });
  }, []);

  const changeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setFilter(filterItems[Number(value)]);
  };

  return (
    <section className={styles.cardPage}>
      <div className={styles.filtersPanel}>
        <InputText
          className={styles.inputText}
          placeholder="Введите строку для поиска..."
          value={searchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
        <select className={styles.selectFilter} onChange={changeFilter}>
          {response &&
            filterItems.map((option, index) => (
              <option key={option} value={index}>
                {option}
              </option>
            ))}
        </select>
        <Button variant="outlined" type="button" onClick={searchProduct}>
          Поиск
        </Button>
      </div>
      {!isLoading ? (
        <div className={styles.cardList}>
          {response && Object.keys(response.data).length ? (
            Object.keys(response.data).map((productId) => (
              <ProductCard
                key={productId}
                id={productId}
                className={styles.card}
                title={response.data[productId].title}
                description={response.data[productId].description}
                params={response.data[productId].params}
              />
            ))
          ) : (
            <span>Товары не найдены</span>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
}
