import { Plus } from "phosphor-react";

import { Head } from "./Head";
import { CompleteTodoList } from "./CompleteTodoList";
import { IncompleteTodoList } from "./IncompleteTodoList";

export function TodoContainer () {
  return (
    <section className="sm:mt-32 min-[900px]:mt-40 lg:mt-32">
      <Head />

      <button 
        aria-label="add new to-do"
        title="add new to-do"
        className="font-montserrat font-semibold h-12 mt-5 mx-auto px-4 flex flex-row-reverse items-center gap-2 rounded-md hover:border hover:border-primary-green"
      >
        <span>Add new todo-do</span>
        <Plus size={27} className="text-primary-green" />
      </button>
      
      <div className="flex px-3 flex-wrap flex-row-reverse justify-center w-full mt-5 mb-7 gap-5 md:gap-10">
        <CompleteTodoList />
        <IncompleteTodoList />
      </div>
    </section>
  );
};