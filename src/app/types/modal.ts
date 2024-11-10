import { Dispatch, SetStateAction } from "react";

export type ModalDataType = {
  open: boolean,
  payload: any
}

export type ModalType = {
  data: ModalDataType,
  setOpen: Dispatch<SetStateAction<{ open: boolean, payload: any}>>,
  loading?: boolean,
  title: string;
  description: string;
  actionHandler: (payload: any) => void;
  actionName: React.JSX.Element | string;
  isDeleteAction?: boolean;
};