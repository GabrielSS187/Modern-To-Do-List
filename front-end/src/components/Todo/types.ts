export type TTodo = {
  id_todo: number;
  todo: string;
  status: boolean;
};

export interface IPropsTodoItem {
  todo: TTodo;
  index: number;
  selectedIndex: number;
  onKeyDown: (event: React.KeyboardEvent<HTMLLIElement>, index: number) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  localView?: "modal" | "page";
};
