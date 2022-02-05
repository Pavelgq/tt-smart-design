export interface NewParamDialogInterface {
  visible: boolean;
  setVisible: (v: boolean) => void
  addField: (description: string) => void;
}
