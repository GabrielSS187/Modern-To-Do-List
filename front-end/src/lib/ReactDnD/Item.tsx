import { useState, useId } from "react";
import { CheckCircle, Trash, Circle } from "phosphor-react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { toast } from "react-toastify";
import { queryClientObj } from "../../services/queryClient.ts";
import { 
  deleteTodoApi,
  updateStatusTodoApi
} from "../../endpoints/todoApi";

interface IProps {
  todo: TTodoList;
  index: number;
  selectedIndex: number;
  userIsAuthenticated: boolean;
  onKeyDown: (event: React.KeyboardEvent<HTMLLIElement>, index: number) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  localView?: "modal" | "page";
  typeList: "complete" | "incomplete";
};

type TTodoList = {
  id_todo: number;
  todo: string;
  status: boolean;
};

const { useQueryClient } = queryClientObj;

export function Item({
  todo,
  index,
  onKeyDown,
  selectedIndex,
  moveCard,
  localView,
  typeList,
  userIsAuthenticated
}: IProps) {
  const refItem = useRef<HTMLLIElement | null>(null),
  id = useId();

  const queryClient = useQueryClient();

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

  const updateStatus = async (todo: TTodoList) => {
    try {
      await toast.promise(updateStatusTodoApi({
        idTodo: todo.id_todo,
        status: todo.status === true ? false : true,
      }), {
        pending: "Processing",
        ...(todo.status === false && { success: "Success 🎉🎉" })
      });
      queryClient.invalidateQueries("todos-complete");
      queryClient.invalidateQueries("todos-incomplete");
    } catch (err: any) {      
      const [errors]: string[] = 
      Object.values(err.response?.data);
      navigator.vibrate(200);
      toast.error(errors, {
        toastId: `${id}:error-delete-todo`
      });
    };
  };

  const deleteTodo = async (idTodo: number) => {
    try {
      await toast.promise(deleteTodoApi(idTodo), {
        pending: "Processing",
        success: "Success",
      });
      queryClient.invalidateQueries("todos-complete");
      queryClient.invalidateQueries("todos-incomplete");
    } catch (err: any) {      
      const [errors]: string[] = 
      Object.values(err.response?.data);
      navigator.vibrate(200);
      toast.error(errors, {
        toastId: `${id}:error-delete-todo`
      });
    };
  };

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
        className={`${todo.status ? "text-primary-green" : "text-primary-orange"}`}
        aria-label="uncheck todo"
        title="uncheck todo"
        onClick={() => updateStatus(todo)}
        disabled={!userIsAuthenticated}
      >
        { todo.status ?
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
        onClick={() => deleteTodo(todo.id_todo)}
        disabled={!userIsAuthenticated}
      >
        <Trash size={27} />
      </button>
    </li>
  );
};
