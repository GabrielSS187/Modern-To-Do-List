import { CheckCircle, Trash, Circle } from "phosphor-react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface IProps {
  todo: TTodoList;
  index: number;
  selectedIndex: number;
  onKeyDown: (event: React.KeyboardEvent<HTMLLIElement>, index: number) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  localView?: "modal" | "page";
  typeList: "complete" | "incomplete";
}

type TTodoList = {
  id: number;
  todo: string;
  complete: boolean;
};

export function Item({
  todo,
  index,
  onKeyDown,
  selectedIndex,
  moveCard,
  localView,
  typeList
}: IProps) {
  const refItem = useRef<HTMLLIElement | null>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!refItem.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = refItem.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { todo, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(refItem));

  const classLi = `flex px-3 mt-2 py-1 cursor-grabbing ${
    index === selectedIndex && 
    `${typeList === "complete" ? "border-primary-green" : "border-primary-orange"} border rounded-sm`
  }`;
  
  return (
    <li
      ref={refItem}
      style={{ opacity }}
      data-handler-id={handlerId}
      className={
        localView === "modal"
          ? `w-[90%] mx-0 md:w-[95%] md:mx-auto ${classLi}`
          : classLi
      }
      tabIndex={index === selectedIndex ? 0 : -1}
      role="listitem"
      onKeyDown={(e) => onKeyDown(e, index)}
    >
      <button
        role="button"
        className={`${todo.complete ? "text-primary-green" : "text-primary-orange"}`}
        aria-label="uncheck todo"
        title="uncheck todo"
      >
        { todo.complete ?
          ( <CheckCircle size={27} /> )
          :
          ( <Circle size={27} /> )
        }
      </button>
      <p className={`flex-1 px-2 font-montserrat font-normal text-primary-black ${
          localView !== "modal" && "truncate"
        }`}
      >
        {todo.todo}
      </p>
      <button
        role="button"
        className="hover:text-red-500"
        aria-label="delete to-do"
        title="delete to-do"
      >
        <Trash size={27} />
      </button>
    </li>
  );
};
