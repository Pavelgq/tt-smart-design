import { ChangeEvent, FormEvent, useState } from "react";
import useFetch from "../../hooks/useFetch/useFetch";
import { ProductI } from "../../interfaces/Product.interface";
import { Loading } from "../Loading/Loading";
import { NewParamDialog } from "../NewParamDialog/NewParamDialog";

import { InputText } from "../InputText/InputText";

export interface ParamI {
  title: string;
  description: string;
  value: string;
}

const params: ParamI[] = [
  {
    title: "param_1",
    description: "Цена товара",
    value: "",
  },
  {
    title: "param_2",
    description: "Цвет товара",
    value: "",
  },
];

export function ProductCreateForm(): JSX.Element {
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productParams, setProductParams] = useState(params);

  const [visible, setVisible] = useState(false);

  const { isLoading, response, error, doFetch } = useFetch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct: ProductI = {
      title: productTitle,
      description: productDescription,
      params: productParams,
    };
    doFetch({
      url: "/product/create",
      method: "POST",
      data: newProduct,
      timeout: 1000,
    });
  };

  const handleChangeParams = (
    e: ChangeEvent<HTMLInputElement>,
    param: ParamI,
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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <InputText
              labelTitle="Название"
              type="text"
              id="title"
              placeholder="Введите название"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
            />
          </div>
          <InputText
            labelTitle="Описание"
            type="text"
            id="description"
            placeholder="Введите описание"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </fieldset>
        <fieldset>
          {productParams.map((param, index) => (
            <div key={param.title}>
              <InputText
                labelTitle={param.description}
                type="text"
                id={param.title}
                value={param.value}
                placeholder="Введите данные"
                onChange={(e) => handleChangeParams(e, param, index)}
              />
            </div>
          ))}
        </fieldset>
        <button type="button" onClick={handleOpenDialog}>
          Добавить поле
        </button>
        <button type="submit">Отправить</button>
      </form>
      <NewParamDialog visible={visible} addField={handleAddField} />
      {response && <p>{response}</p>}
      {error && <p>{error}</p>}
    </section>
  );
}
