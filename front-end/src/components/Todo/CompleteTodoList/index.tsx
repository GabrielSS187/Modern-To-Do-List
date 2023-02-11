import { infoTodoFolder } from "../../../data/GeneralInfo";
import { ReactDnD } from "../../../lib/ReactDnD";

import { Button } from "../../../common/Button";
import { Loading } from "../../../common/Loading";
import { TTodo } from "../types";

interface IProps {
  completeTodoList: TTodo[];
  localView?: "modal" | "page";
  isLoading: boolean;
  userIsAuthenticated?: boolean;
  setSelectModal?: (params: {
    types:
      | "completeTodoList"
      | "addNewTodo"
      | "deleteAllCompleteTodo"
      | "login";
    contentLabel: string;
  }) => void;
}

export function CompleteTodoList({
  setSelectModal,
  localView,
  completeTodoList,
  isLoading,
  userIsAuthenticated,
}: IProps) {
  const verifyQualityTodoLis = () => {
    if (completeTodoList?.length === 0) return "empty list";
    if (completeTodoList?.length > 5) return `+${completeTodoList.length - 5}`;
    if (completeTodoList?.length <= 5) return completeTodoList.length;
  };

  return (
    <ul
      className={
        localView === "modal"
          ? "absolute h-[100%] top-[6.9rem] w-full"
          : "bg-primary-white h-[33rem] border-2 shadow shadow-neutral-900/100 rounded-md"
      }
      role="list"
      aria-labelledby="list-todo-complete"
    >
      <div className="h-5 w-full bg-primary-green rounded-md" />
      <section className="flex flex-col">
        {localView !== "modal" && (
          <div className="flex flex-col items-center gap-3 mt-8">
            <h2 className="font-poppins font-semibold text-4xl leading-6">
              {infoTodoFolder.done}
            </h2>
            <p className="flex flex-col font-montserrat text-xl leading-6 text-center px-3">
              <span className="font-normal">
                {infoTodoFolder.Congratulations}
              </span>
              <span className="font-bold">{infoTodoFolder.youHave}</span>
            </p>
          </div>
        )}

        {/* Lista de tasks */}
        <div
          className={
            localView === "modal"
              ? "h-[70%] absolute right-0 left-0 overflow-x-hidden pt-1"
              : `w-[16rem] c-mobile:w-[20rem] h-[17rem] overflow-hidden pt-7`
          }
        >
          {isLoading && <Loading />}

          {!isLoading && completeTodoList?.length === 0 && (
            <h3 className="font-mono font-bold text-xl text-center">
              <br />
              {infoTodoFolder.emptyList}
            </h3>
          )}

          {!isLoading && completeTodoList.length > 0 && (
            <ReactDnD
              todoList={
                localView !== "modal"
                  ? completeTodoList.slice(0, 5)
                  : completeTodoList
              }
              localView={localView}
              typeList="complete"
              userIsAuthenticated={userIsAuthenticated!}
            />
          )}
        </div>

        {localView !== "modal" && (
          <div className="w-full flex flex-col items-center gap-2">
            <button
              role="button"
              className="border border-primary-green w-[80%] p-1 rounded-md hover:bg-green-500 hover:text-primary-white transition-all"
              aria-label={infoTodoFolder?.ariaLabel}
              title={infoTodoFolder?.ariaLabel}
              disabled={completeTodoList?.length === 0 || isLoading}
              onClick={() =>
                setSelectModal!({
                  types: "completeTodoList",
                  contentLabel: "complete task list",
                })
              }
            >
              {verifyQualityTodoLis()}
            </button>
            <Button
              text={
                completeTodoList?.length
                  ? infoTodoFolder.eraseAll
                  : infoTodoFolder.emptyList
              }
              ariaLabel={
                completeTodoList?.length
                  ? infoTodoFolder.eraseAll
                  : infoTodoFolder.emptyList
              }
              title={
                completeTodoList?.length
                  ? infoTodoFolder.eraseAll
                  : infoTodoFolder.emptyList
              }
              type="button"
              width="w-[80%]"
              bg="bg-primary-black"
              disabled={
                completeTodoList?.length === 0 ||
                isLoading ||
                !userIsAuthenticated
              }
              onClick={() =>
                setSelectModal!({
                  types: "deleteAllCompleteTodo",
                  contentLabel: "Delete all completeTodo",
                })
              }
            />
          </div>
        )}
      </section>
    </ul>
  );
}
