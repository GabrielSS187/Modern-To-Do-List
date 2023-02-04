import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Circle, Trash } from "phosphor-react";

import { IProps } from "../types";

export function Todo ({ todo, selectedIndex, index, onKeyDown, moveCard }: IProps) {
  const ref = useRef<HTMLLIElement | null>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      };
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      };
  
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top
     
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      };
  
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      };
   
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { todo, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li 
        ref={ref} style={{ opacity }} data-handler-id={handlerId}
        className={`flex px-3 mt-2 py-1 cursor-grabbing ${index === selectedIndex && "border-primary-orange border rounded-sm"}`} 
        tabIndex={index === selectedIndex ? 0 : -1}
        role="listitem"
        onKeyDown={(e) => onKeyDown(e, index)}
      >
      <button role="button" className="text-primary-orange" aria-label="check todo" title="check todo">
        <Circle size={27} />
      </button>
      <p className="flex-1 px-2 font-montserrat font-normal text-primary-black truncate">
          {todo.todo}
      </p>
      <button role="button" className="hover:text-red-500" aria-label="delete to-do" title="delete to-do">
        <Trash size={27} />
      </button>
    </li>
  );
};