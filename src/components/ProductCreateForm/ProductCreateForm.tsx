import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch/useFetch";
import { ProductI, ProductParamI } from "../../interfaces/Product.interface";
import { Loading } from "../Loading/Loading";
import { NewParamDialog } from "../NewParamDialog/NewParamDialog";

import { InputText } from "../InputText/InputText";
import { Button } from "../Button/Button";
import { FieldSet } from "../FieldSet/FieldSet";

import styles from "./ProductCreateForm.module.css";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

const params: ProductParamI[] = [
  {
    title: "param_1",
    description: "Цена товара",
    value: "",
    require: true,
  },
  {
    title: "param_2",
    description: "Цвет товара",
    value: "",
    require: true,
  },
];

export function ProductCreateForm(): JSX.Element {
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productParams, setProductParams] = useState(params);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [validateMessage, setValidateMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const { isLoading, response, error, doFetch } = useFetch();

  const validateForm = (): string => {
    if (!productTitle) {
      return "Введите название продукта";
    }
    if (!productDescription) {
      return "Введите описание товара";
    }
    const invalidParam = productParams.find((p) => p.require && !p.value);
    if (invalidParam) {
      return `Введите значение параметра "${invalidParam.description}"`;
    }

    return "";
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProduct: ProductI = {
      title: productTitle,
      description: productDescription,
      params: productParams,
    };
    const message = validateForm();
    if (message) {
      setValidateMessage(message);
      return;
    }
    setValidateMessage("");
    doFetch({
      url: "/product/create",
      method: "POST",
      data: newProduct,
      timeout: 5000,
    });
    setIsSubmitSuccess(false);
  };

  const clearForm = () => {
    setProductTitle("");
    setProductDescription("");
    setProductParams(params);
  };

  useEffect(() => {
    if (response && !isSubmitSuccess) {
      setIsSubmitSuccess(true);
      clearForm();
    }
  }, [response, isSubmitSuccess]);

  const handleChangeParams = (
    e: ChangeEvent<HTMLInputElement>,
    param: ProductParamI,
    index: number
  ) => {
    const temp = productParams.slice();
    temp[index].value = e.target.value;
    setProductParams(temp);
  };

  const handleAddField = (description: string) => {
    const temp = productParams.slice();
    const newTitle = temp[temp.length - 1].title.split("_");
    newTitle[1] = (Number(newTitle[1]) + 1).toString();
    temp.push({
      title: newTitle.join("_"),
      description,
      value: "",
    });
    setProductParams(temp);
  };

  const handleOpenDialog = () => {
    setVisible(!visible);
  };

  return (
    <section>
      {validateMessage && <ErrorMessage>{validateMessage}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <FieldSet className={styles.field}>
          <InputText
            className={styles.inputText}
            labelTitle="Название"
            type="text"
            id="title"
            placeholder="Введите название"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
          />
          <InputText
            className={styles.inputText}
            labelTitle="Описание"
            type="text"
            id="description"
            placeholder="Введите описание"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </FieldSet>
        <FieldSet className={styles.field}>
          {productParams.map((param, index) => (
            <InputText
              key={param.title}
              className={styles.inputText}
              labelTitle={param.description}
              type="text"
              id={param.title}
              value={param.value}
              placeholder="Введите данные"
              onChange={(e) => handleChangeParams(e, param, index)}
            />
          ))}
        </FieldSet>
        <Button
          type="button"
          className={styles.button}
          onClick={handleOpenDialog}
          variant="contained"
        >
          Добавить поле
        </Button>
        <Button type="submit" className={styles.button} variant="contained">
          Отправить
        </Button>
      </form>
      <NewParamDialog
        visible={visible}
        setVisible={setVisible}
        addField={handleAddField}
      />
      {isLoading && <Loading />}
      {response && <p>{response}</p>}
      {error && <p>{error}</p>}
    </section>
  );
}
