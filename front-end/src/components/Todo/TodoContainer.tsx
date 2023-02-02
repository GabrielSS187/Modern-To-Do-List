import { Plus } from "phosphor-react";

import { infoTodoFolder } from "../../data/GeneralInfo";
import { AnimationContainer } from "../../common/AnimationContainer";

import { Head } from "./Head";
import { CompleteTodoList } from "./CompleteTodoList";
import { IncompleteTodoList } from "./IncompleteTodoList";
import { UpArrowSvg } from "../../assets/svg/UpArrowSvg";

export function TodoContainer () {
  return (
    <section id="todoComponent" className="sm:mt-32 min-[900px]:mt-40 lg:mt-32">
      <AnimationContainer>
        <Head />
      </AnimationContainer>


      <AnimationContainer>
        <button 
          aria-label="add new to-do"
          title="add new to-do"
          className="font-montserrat font-semibold h-12 mt-5 mx-auto px-4 flex flex-row-reverse items-center gap-2 rounded-md hover:border hover:border-primary-green"
        >
          <span>{ infoTodoFolder.addNewTodoDo }</span>
          <Plus size={27} className="text-primary-green" />
        </button>
      </AnimationContainer>

      
      <div className="hidden relative lg:block">
        <UpArrowSvg className="absolute" fill="#4AC959" />
        <UpArrowSvg className="absolute mt-[3.5rem] w-24" fill="#49AF55" />
      </div>

      <div className="flex px-3 flex-wrap flex-row-reverse justify-center w-full mt-5 mb-7 gap-5 md:gap-10">
        <AnimationContainer direction="right">
          <CompleteTodoList />
        </AnimationContainer>
        <AnimationContainer direction="left">
          <IncompleteTodoList />
        </AnimationContainer>
      </div>
    </section>
  );
};