import classnames from "classnames";
import { MouseEvent, useState } from "react";
import { NewParamDialogInterface } from "./NewParamDialog.props";

import styles from "./NewParamDialog.module.css";
import { InputText } from "../InputText/InputText";
import { Button } from "../Button/Button";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export function NewParamDialog({
  visible,
  setVisible,
  addField,
}: NewParamDialogInterface): JSX.Element {
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!description) {
      setError("Вы не ввели название");
      return;
    }
    addField(description);
    setDescription("");
    setError("");
    setVisible(!visible);
  };

  const handleClose = () => {
    setDescription("");
    setVisible(!visible);
  };

  return (
    <div
      className={classnames(styles.popupWrapper, {
        [styles.visible]: visible,
      })}
    >
      <div className={styles.popup}>
        <InputText
          labelTitle="Название параметра продукта"
          type="text"
          id="newDescriptionParamField"
          placeholder="Цена со скидкой"
          value={description}
          className={styles.inputText}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && (
          <ErrorMessage className={styles.errorMessage}>{error}</ErrorMessage>
        )}
        <Button
          variant="contained"
          type="button"
          className={styles.button}
          onClick={handleClick}
        >
          Добавить
        </Button>
        <Button
          variant="outlined"
          type="button"
          className={styles.button}
          onClick={handleClose}
        >
          Отменить
        </Button>
      </div>
    </div>
  );
}
