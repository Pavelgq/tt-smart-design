import classnames from "classnames";
import { useState } from "react";
import { NewParamDialogInterface } from "./NewParamDialog.props";

import styles from "./NewParamDialog.module.css";
import { InputText } from "../InputText/InputText";

export function NewParamDialog({
  visible,
  addField,
}: NewParamDialogInterface): JSX.Element {
  const [description, setDescription] = useState("");

  const handleClick = () => {
    addField(description);
  };

  return (
    <div
      className={classnames(styles.popup, {
        [styles.visible]: visible,
      })}
    >
      <InputText
        labelTitle="Название параметра продукта"
        type="text"
        id="newDescriptionParamField"
        placeholder="Цена со скидкой"
        value={description}
        className={styles.inputText}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="button" className={styles.button} onClick={handleClick}>
        Добавить
      </button>
    </div>
  );
}
