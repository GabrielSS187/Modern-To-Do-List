import { useState, useEffect } from "react";
import { UseMutationResult } from "react-query";
import { AxiosResponse } from "axios";

import Modal from "react-modal";
import { X } from "phosphor-react";

import { LoginAndRegisterModal } from "./Modals/LoginAndRegisterModal";
import { AddTodoModal } from "./Modals/AddTodoModal";
import { CompleteTodoListModal } from "./Modals/CompleteTodoListModal";
import { ConfirmModal } from "./Modals/ConfirmModal";
import { TSignInResponse, TUSer } from "../../endpoints/types";

interface IProps {
  selectModal: TSelectModal;
  setSelectModal: (params: TSelectModal) => void;
  completeTodoList: TTodo[];
  incompleteTodoList: TTodo[];
  isLoadingTodosComplete: boolean;
  isLoadingTodosIncomplete: boolean;
  userIsAuthenticated: boolean;
  signInFunction: UseMutationResult<
    AxiosResponse<TSignInResponse, any>,
    any,
    TUSer,
    unknown
  >;
  registerFunction: UseMutationResult<void, any, TUSer, unknown>;
}

type TSelectModal = {
  types:
    | ""
    | "login"
    | "logout"
    | "completeTodoList"
    | "addNewTodo"
    | "deleteAllIncompleteTodo"
    | "deleteAllCompleteTodo";
  contentLabel: string;
};

export type TTodo = {
  id_todo: number;
  todo: string;
  status: boolean;
};

type TCss = {
  content: React.CSSProperties;
};

export function ModalContainer({
  selectModal,
  setSelectModal,
  completeTodoList,
  incompleteTodoList,
  isLoadingTodosComplete,
  isLoadingTodosIncomplete,
  signInFunction,
  registerFunction,
  userIsAuthenticated,
}: IProps) {
  const [alterModal, setAlterModal] = useState<"login" | "register">("login");

  useEffect(() => {
    if (selectModal.types.length === 0) {
      setAlterModal("login");
    };

    if ( selectModal.types ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    };
  }, [selectModal, selectModal.types]);

  const selectModalConfirm = () => {
    switch (selectModal.types) {
      case "logout":
        customStyles.content.height = "20rem";
        return (
          <ConfirmModal
            setSelectModal={setSelectModal}
            type={selectModal.types}
          />
        );
      case "deleteAllCompleteTodo":
        customStyles.content.height = "20rem";
        return (
          <ConfirmModal
            setSelectModal={setSelectModal}
            type={selectModal.types}
          />
        );
      case "deleteAllIncompleteTodo":
        customStyles.content.height = "20rem";
        return (
          <ConfirmModal
            setSelectModal={setSelectModal}
            type={selectModal.types}
          />
        );
      default:
        return;
    }
  };

  const customStyles: TCss = {
    content: {
      width: "min(80%, 50rem)",
      ...(selectModal.types === "login" && { height: "32rem" }),
      ...(selectModal.types === "login" && { padding: "10px" }),
      overflowY: "hidden",
      margin: "0 auto",
      zIndex: 100,
    },
  };
  return (
    <Modal
      isOpen={selectModal.types ? true : false}
      contentLabel={selectModal.contentLabel}
      overlayClassName="flex justify-center fixed top-0 bottom-0 right-0 left-0 z-[90] bg-black bg-opacity-75"
      ariaHideApp={false}
      style={customStyles}
      role="dialog"
    >
      <div className="flex flex-col relative h-full ">
        <div className="self-end">
          <button
            role="button"
            onClick={() => setSelectModal({ types: "", contentLabel: "" })}
            title="Close modal"
            aria-label="Close Modal"
          >
            <X size={32} />
          </button>
        </div>
        <br />
        {selectModal.types === "login" && (
          <LoginAndRegisterModal
            alterModal={alterModal}
            setAlterModal={setAlterModal}
            signInFunction={signInFunction}
            registerFunction={registerFunction}
          />
        )}

        {selectModal.types === "addNewTodo" && (
          <AddTodoModal
            todoList={incompleteTodoList}
            isLoadingTodosIncomplete={isLoadingTodosIncomplete}
            userIsAuthenticated={userIsAuthenticated}
            setSelectModal={setSelectModal}
          />
        )}

        {selectModal.types === "completeTodoList" && (
          <CompleteTodoListModal
            todoList={completeTodoList}
            isLoadingTodosComplete={isLoadingTodosComplete}
            userIsAuthenticated={userIsAuthenticated}
          />
        )}

        {selectModal.types && selectModalConfirm()}
      </div>
    </Modal>
  );
}
