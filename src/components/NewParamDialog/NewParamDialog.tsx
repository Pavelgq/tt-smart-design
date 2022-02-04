import classnames from "classnames";
import { useState } from "react";
import { NewParamDialogInterface } from "./NewParamDialog.props";

import styles from "./NewParamDialog.module.css";

export const NewParamDialog = ({
  visible,
  addField,
}: NewParamDialogInterface): JSX.Element => {
  const [description, setDescription] = useState("");

  const handleClick = () => {
    addField(description);
  };

  return (
    <div
      className={classnames(styles.form, {
        [styles.visible]: visible,
      })}
    >
      <label htmlFor="newDescriptionParamField"></label>
      <input
        type="text"
        name="newDescriptionParamField"
        placeholder="Цена со скидкой"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleClick}>Добавить</button>
    </div>
  );
};
