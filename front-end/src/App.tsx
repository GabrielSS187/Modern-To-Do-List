import { useState, useEffect } from "react";
import { useScrollTop } from "./hook/useScrollTop";
import { ToastContainer } from 'react-toastify';
import { infoApp } from "./data/GeneralInfo";

import { Header } from "./components/Header";
import { Info } from "./components/Info";
import { TodoContainer } from "./components/Todo";
import { ContainerSlide } from "./components/InfoSlider";
import { Form } from "./components/Form/Form";
import { Footer } from "./components/Footer";
import { ModalContainer } from "./components/Modal/ModalContainer";
import { infoTodoFolder } from "./data/GeneralInfo";

import { ArrowFatLinesUp } from "phosphor-react";

type TSelectModal = {
  types: "" 
  | "login" 
  | "logout" 
  | "completeTodoList" 
  | "addNewTodo" 
  | "deleteAllIncompleteTodo"
  | "deleteAllCompleteTodo";
  contentLabel: string;
};

export function App () {
  const [ selectModal, setSelectModal ] = useState<TSelectModal>({
    types: "",
    contentLabel: ""
  });
  const [ isLoading, setIsLoading ] = useState<boolean>(false),
  [ userIsAuthenticated, setUserIsAuthenticated ] = useState<boolean>(false),
  [ handleClick, showButton ] = useScrollTop(200);  

  const completeTodoList = infoTodoFolder.completeTodoList,
  incompleteTodoList = infoTodoFolder.incompleteTodoList;

  useEffect(() => {
    if ( selectModal.types ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    };
  }, [selectModal.types]);
  
  return (
    <>
      <ToastContainer />
      <ModalContainer 
        selectModal={selectModal}
        setSelectModal={setSelectModal}
        completeTodoList={completeTodoList}
        incompleteTodoList={incompleteTodoList}
        isLoadingTodosComplete={isLoading}
        isLoadingTodosIncomplete={isLoading}
      />
      <Header 
        setSelectModal={setSelectModal}
        userIsAuthenticated={userIsAuthenticated}
      />

      <main role="main">
        <Info />
        <TodoContainer
          completeTodoList={completeTodoList}
          incompleteTodoList={incompleteTodoList}
          setSelectModal={setSelectModal}
          isLoadingTodosComplete={isLoading}
          isLoadingTodosIncomplete={isLoading}
        />
        <ContainerSlide />
        <Form />
        <Footer />
      </main>

      <button
        role="button"
        aria-label={infoApp.addWhatsapp} title={infoApp.addWhatsapp}
        className={`fixed right-[0.5rem] ${ showButton ? "bottom-[5rem]" : "bottom-3" } z-50 animate-bounce`}
      >
        <a href="https://wa.me/5583986785354?text=Olá Gabriel Silva, meu nome é:" target="_blank">
          <img src={infoApp.whatsappLogo} alt="whatsapp" className="w-[2.5rem] sm:w-[3.5rem]" />
        </a>
      </button>

        {
          showButton && (
            <button 
              role="button"
              onClick={handleClick} 
              title={infoApp.scrollTop}
              aria-label={infoApp.scrollTop}
              className="fixed right-[.3rem] bottom-3 z-50"
            >
              <ArrowFatLinesUp className="w-[3rem] h-[2em] animate-bounce text-blue-500" />
            </button>
          )
        }
    </>
  );
};