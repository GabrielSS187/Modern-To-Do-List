import { useCallback, useState } from "react";
import update from "immutability-helper";

import { Button } from "../../../common/Button";
import { Todo } from "./Todo";

import completeTodoDemonstration from "../../../data/completeTodoDemonstration.json";

//* Array de demostração de to-dos completas.
const listTodoDemonstration = completeTodoDemonstration;

export function CompleteTodoList () {
  const [cards, setCards] = useState(completeTodoDemonstration);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>, index: number) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex(Math.min(selectedIndex + 1, listTodoDemonstration.length - 1));
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
      className="bg-primary-white h-[33rem] w-[90%] max-w-xs border-2 shadow shadow-neutral-900/100 rounded-md"
      role="list"
      aria-labelledby="list-todo-complete"  
    >
      <div className="h-5 w-full bg-primary-green rounded-md"/>
      <section className="flex flex-col">
        <div className="flex flex-col items-center gap-3 mt-8">
          <h2 className="font-poppins font-semibold text-4xl leading-6">Done</h2>
          <p className="flex flex-col font-montserrat text-xl leading-6 text-center px-3">
            <span className="font-normal">Congratulions!</span>
            <span className="font-bold">You have done 5 tasks</span>
          </p>
        </div>

        <div className="h-[17rem] overflow-hidden pt-7">
          {
            cards.map(( todo, index ) => {
              return (
                <Todo 
                  key={todo["id"]}
                  todo={todo}
                  index={index}
                  moveCard={moveCard}
                  selectedIndex={selectedIndex}
                  onKeyDown={handleKeyDown}
                />
              )
            })
          }
        </div>

        <div className="w-full flex flex-col items-center gap-2">
          <button 
            className="border border-primary-green w-[80%] p-1 rounded-md hover:bg-green-500 hover:text-primary-white transition-all"
            aria-label="see all completed tasks"
            title="see all completed tasks"
          >
            see all
          </button>
          <Button 
            text="erase all" 
            ariaLabel="erase all" 
            title="erase all"
            type="button" 
            width="w-[80%]"
            bg="bg-primary-black"
          />
        </div>
      </section>
    </ul>
  );
};