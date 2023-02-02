import { useCallback, useState } from "react";
import update from "immutability-helper";

import { infoTodoFolder } from "../../../data/GeneralInfo";

import { Button } from "../../../common/Button";
import { Todo } from "./Todo";

export function IncompleteTodoList () {
  //* Array de demostração de to-dos incompletas.
  const [cards, setCards] = useState(infoTodoFolder.incompleteTodoList);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>, index: number) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex(Math.min(selectedIndex + 1, infoTodoFolder.incompleteTodoList.length - 1));
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
    <ul 
      role="list"
      aria-labelledby="list-todo-incomplete"
      className="bg-primary-white h-[44rem] w-[100%] max-w-xs border-2 shadow shadow-neutral-900/100 rounded-md"
    >
      <div className="h-5 w-full bg-primary-orange rounded-md"/>
      <section className="flex flex-col">
        <div className="flex flex-col items-center gap-3 mt-8">
          <h2 className="font-poppins font-semibold text-4xl leading-6">
          { infoTodoFolder.todo }
          </h2>
          <p className="flex flex-col font-montserrat font-normal text-xl leading-6 text-center px-3">
            <span>{ infoTodoFolder.takeBreath }</span>
            <span>{ infoTodoFolder.startDoing }</span>
          </p>
        </div>

        {/* Todos */}
        <div className="h-[27rem] overflow-x-hidden pt-7">
          {
            cards.map(( todo, index ) => {
              return (
                <Todo 
                    key={todo["id"]}
                    todo={todo} 
                    index={index}
                    selectedIndex={selectedIndex}
                    onKeyDown={handleKeyDown}
                    moveCard={moveCard}
                  />
              )
            })
          }
        </div>

        <div className="w-full flex flex-col items-center gap-2 mt-4">
          <button 
            className="border border-primary-orange w-[80%] p-1 rounded-md hover:bg-orange-500 hover:text-primary-white transition-all"
            aria-label="see all completed tasks"
            title="see all completed tasks"
          >
            { infoTodoFolder.seeAll }
          </button>
          <Button 
            text={ infoTodoFolder.eraseAll } 
            ariaLabel={ infoTodoFolder.seeAll }
            title={ infoTodoFolder.seeAll }
            type="button" 
            width="w-[80%]"
            bg="bg-primary-black"
          />
        </div>
      </section>
    </ul>
  );
};