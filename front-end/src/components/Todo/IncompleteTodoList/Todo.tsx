import { useState } from "react";

import { Circle, Trash } from "phosphor-react";

interface IProps {
  idTodo: number;
  todo: string;
  index: number;
  selectedIndex: number;
  onKeyDown: (event: React.KeyboardEvent<HTMLLIElement>, index: number) => void;
};

export function Todo ({ idTodo, todo, selectedIndex, index, onKeyDown }: IProps) {

  return (
    <li 
        className={`flex px-3 mt-2 py-1 cursor-grabbing ${index === selectedIndex && "border-primary-orange border rounded-sm"}`} 
        key={idTodo} 
        tabIndex={index === selectedIndex ? 0 : -1}
        role="listitem"
        onKeyDown={(e) => onKeyDown(e, index)}
      >
      <button className="text-primary-orange" aria-label="check todo" title="check todo">
        <Circle size={27} />
      </button>
      <p className="flex-1 px-2 font-montserrat font-normal text-primary-black truncate">
          {todo}
      </p>
      <button className="hover:text-red-500" aria-label="delete to-do" title="delete to-do">
        <Trash size={27} />
      </button>
    </li>
  );
};