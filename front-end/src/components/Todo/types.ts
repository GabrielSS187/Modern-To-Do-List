export type TTodo = {
  id: number;
  todo: string;
  complete: boolean;
};

export interface IPropsTodoItem {
  todo: TTodo;
  index: number;
  selectedIndex: number;
  onKeyDown: (event: React.KeyboardEvent<HTMLLIElement>, index: number) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  localView?: "modal" | "page";
};
