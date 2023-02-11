import { useState, useEffect, useId } from "react";
import { isMobile } from "react-device-detect";
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
import { register, signIn, getUserByToken } from "./endpoints/userApi";
import { 
  getAllTodosCompleteApi,
  getAllTodosIncompleteApi
 } from "./endpoints/todoApi";

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

const { useMutation, useQuery } = queryClientObj;

export function App () {
  const [ selectModal, setSelectModal ] = useState<TSelectModal>({
    types: "",
    contentLabel: ""
  });
  const [ userIsAuthenticated, setUserIsAuthenticated ] = useState<boolean>(false),
  [ handleClick, showButton ] = useScrollTop(200)
  ,id = useId();

  const signInFunction = useMutation(signIn, {
    onSuccess: ({data}) => { 
      localStorage.setItem("token", data.token);
      localStorage.setItem("success", "success");
      window.location.reload();
    },
    onError: (err: any) => {
      const [errors]: string[] = 
      Object.values(err.response?.data);
      navigator.vibrate(200);
      toast.error(errors, {
        toastId: `${id}:error-s`
      });
    },
   }),
    registerFunction = useMutation(register, {
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
     const success = localStorage.getItem("success");
     if (!signInFunction.isSuccess && token !== null) {
       (async () => {
         const user = await getUserByToken();
         setUserIsAuthenticated(!!user);
         return;
      })();
    };

    //* Notificar sucesso apos o login
    if ( success !== null && success === "success" && !isMobile ){
      toast.success("Login successfully.", {
        toastId: `${id}:success-s`
      });
    };

    window.onload = () => {
      window.localStorage.removeItem("success");
    };
  }, [signInFunction.isSuccess, userIsAuthenticated]);
  
  const todosCompleteApi = 
  useQuery("todos-complete", getAllTodosCompleteApi, {
    onSuccess: (data) => {
      if (userIsAuthenticated && data!.length >= 0){
        return data;
      };
      return;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  }),
  todosIncompleteApi = 
  useQuery("todos-incomplete", getAllTodosIncompleteApi, {
    onSuccess: (data) => {
      if (userIsAuthenticated && data!.length >= 0){
        return data;
      };
      return;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return (
    <>
      <ToastContainer />
      <ModalContainer 
        selectModal={selectModal}
        setSelectModal={setSelectModal}
        completeTodoList={todosCompleteApi.data || infoTodoFolder.completeTodoList}
        incompleteTodoList={todosIncompleteApi.data || infoTodoFolder.incompleteTodoList}
        isLoadingTodosComplete={todosCompleteApi.isFetching}
        isLoadingTodosIncomplete={todosIncompleteApi.isFetching}
        signInFunction={signInFunction}
        registerFunction={registerFunction}
        userIsAuthenticated={userIsAuthenticated}
      />
      <Header 
        setSelectModal={setSelectModal}
        userIsAuthenticated={userIsAuthenticated}
      />

      <main role="main">
        <Info />
        <TodoContainer
          completeTodoList={todosCompleteApi.data || infoTodoFolder.completeTodoList}
          incompleteTodoList={todosIncompleteApi.data || infoTodoFolder.incompleteTodoList}
          setSelectModal={setSelectModal}
          isLoadingTodosComplete={todosCompleteApi.isFetching}
          isLoadingTodosIncomplete={todosIncompleteApi.isFetching}
          userIsAuthenticated={userIsAuthenticated}
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
          <img src={infoApp.whatsappLogo} alt="whatsapp" className="w-[2.7rem] sm:w-[3rem]" />
        </a>
      </button>

        {
          showButton && (
            <button 
              role="button"
              onClick={handleClick} 
              title={infoApp.scrollTop}
              aria-label={infoApp.scrollTop}
              className="fixed right-[.5rem] bottom-3 z-50"
            >
              <ArrowFatLinesUp className="w-[3rem] h-[2rem] sm:h-[2.5rem] text-blue-500" />
            </button>
          )
        }
    </>
  );
};
