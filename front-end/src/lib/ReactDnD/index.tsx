import { useCallback, useState } from "react";
import { DndProvider, } from "react-dnd";
import { HTML5Backend  } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import update from "immutability-helper";

import { Item } from "./Item"

interface IProps {
  todoList: TTodoList[];
  localView?: "modal" | "page";
  typeList: "complete" | "incomplete";
};

type TTodoList = {
  id: number;
  todo: string;
  complete: boolean;
};

//* Verificar si esta no mobile para poder habilitar as movimentações
//* de arrastar e soltar.
const backend =  isMobile ? TouchBackend : HTML5Backend;

//* Lib para movimentar elementos mobiles e desktop.
export function ReactDnD ({ todoList, localView, typeList }: IProps) {
  const [cards, setCards] = useState<TTodoList[] | []>(todoList);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>, index: number) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex(Math.min(selectedIndex + 1, todoList.length - 1));
    };
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex(Math.max(selectedIndex - 1, 0));
    };
  };

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    );
  }, []);

  return (
    <DndProvider backend={backend}>
      {
          cards.map(( todo, index ) => {
            return (
              <Item
                key={todo.id}
                todo={todo}
                index={index}
                moveCard={moveCard}
                selectedIndex={selectedIndex}
                onKeyDown={handleKeyDown}
                localView={localView}
                typeList={typeList}
              />
            )
          })
        }
    </DndProvider>
  );
};