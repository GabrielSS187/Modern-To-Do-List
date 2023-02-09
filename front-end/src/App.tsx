import { useState, useEffect, useId } from "react";
import { useScrollTop } from "./hook/useScrollTop";
import { ToastContainer, toast } from "react-toastify";
import { infoApp } from "./data/GeneralInfo";

import { Header } from "./components/Header";
import { Info } from "./components/Info";
import { TodoContainer } from "./components/Todo";
import { ContainerSlide } from "./components/InfoSlider";
import { Form } from "./components/Form/Form";
import { Footer } from "./components/Footer";
import { ModalContainer } from "./components/Modal/ModalContainer";
import { infoTodoFolder } from "./data/GeneralInfo";
import { queryClientObj } from "./services/queryClient.ts";
import { register, signIn,getUserByToken } from "./endpoints/userApi";

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

const { useMutation } = queryClientObj;

export function App () {
  const [ selectModal, setSelectModal ] = useState<TSelectModal>({
    types: "",
    contentLabel: ""
  });
  const [ isLoading, setIsLoading ] = useState<boolean>(false),
  [ userIsAuthenticated, setUserIsAuthenticated ] = useState<boolean>(false),
  [ handleClick, showButton ] = useScrollTop(200)
  ,id = useId();
  
  const signInFunction = useMutation(signIn, {
    onSuccess: ({data}) => { 
      localStorage.setItem("token", data.token);
      toast.success("Login successfully.", {
        toastId: `${id}:success-s`
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (err: any) => {
      const [errors]: string[] = 
      Object.values(err.response?.data);
      navigator.vibrate(200);
      toast.error(errors, {
        toastId: `${id}:error-s`
      });
    },
   });

   const registerFunction = useMutation(register, {
    onSuccess: () => {
      toast.success("Account created successfully", {
        toastId: `${id}:success-c`
      });
    },
    onError: (err: any) => {
      const [errors]: string[] = 
      Object.values(err.response?.data);
      navigator.vibrate(200);
      toast.error(errors, {
        toastId: `${id}:error-c`
      });
    },
   });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!signInFunction.isSuccess && token !== null) {
      (async () => {
        const user = await getUserByToken();
        setUserIsAuthenticated(!!user);
        return;
      })();
    };
  }, [signInFunction.isSuccess, userIsAuthenticated]);
  

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
        signInFunction={signInFunction}
        registerFunction={registerFunction}
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
