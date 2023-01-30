import { Button } from "../../../common/Button";
import { Todo } from "./Todo";

import incompleteTodoDemonstration from "../../../data/incompleteTodoDemonstration.json";
import { useState } from "react";

//* Array de demostração de to-dos incompletas.
const listTodoDemonstration = incompleteTodoDemonstration;

export function IncompleteTodoList () {
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

  return (
    <ul 
      role="list"
      aria-labelledby="list-todo-incomplete"
      className="bg-primary-white h-[44rem] w-[90%] max-w-xs border-2 shadow shadow-neutral-900/100 rounded-md"
    >
      <div className="h-5 w-full bg-primary-orange rounded-md"/>
      <section className="flex flex-col">
        <div className="flex flex-col items-center gap-3 mt-8">
          <h2 className="font-poppins font-semibold text-4xl leading-6">To-do</h2>
          <p className="flex flex-col font-montserrat font-normal text-xl leading-6 text-center px-3">
            <span>Take a breath.</span>
            <span>Start doing.</span>
          </p>
        </div>

        {/* Todos */}
        <div className="h-[27rem] overflow-x-hidden pt-7">
          {
            listTodoDemonstration.map(( todo, index ) => {
              return (
                <Todo 
                    idTodo={todo["id"]} 
                    todo={todo["to-do"]} 
                    index={index}
                    selectedIndex={selectedIndex}
                    onKeyDown={handleKeyDown}
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