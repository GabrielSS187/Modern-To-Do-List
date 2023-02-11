import { infoTodoFolder } from "../../../data/GeneralInfo";

import { Button } from "../../../common/Button";
import { ReactDnD } from "../../../lib/ReactDnD";
import { Loading } from "../../../common/Loading";
import { TTodo } from "../types";

interface IProps {
  incompleteTodoList: TTodo[];
  localView?: "modal" | "page";
  isLoading: boolean;
  userIsAuthenticated?: boolean;
  setSelectModal?: (params: {
    types: "completeTodoList" 
    | "addNewTodo" 
    | "deleteAllIncompleteTodo"
    | "login",
    contentLabel: string;
  }) => void;
};

export function IncompleteTodoList ({ 
  localView, 
  setSelectModal, 
  incompleteTodoList,
  isLoading,
  userIsAuthenticated
}: IProps) {
  const verifyQualityTodoLis = () => {
    if ( incompleteTodoList?.length === 0 ) return "add new task";
    if ( incompleteTodoList?.length > 9 ) return `+${incompleteTodoList.length - 9}`;
    if ( incompleteTodoList?.length <= 9 ) return incompleteTodoList.length;
  };

  return (
    <ul 
      role="list"
      aria-labelledby="list-todo-incomplete"
      className={
        localView === "modal" ? "absolute h-[100%] top-[6.9rem] w-full" : "bg-primary-white h-[44rem] border-2 shadow shadow-neutral-900/100 rounded-md"
      }
    >
      <div className="h-5 w-full bg-primary-orange rounded-md" />
      <section className="flex flex-col">
        {
          localView !== "modal" && 
          (
            <div className="flex flex-col items-center gap-3 mt-8">
              <h2 className="font-poppins font-semibold text-4xl leading-6">
                { infoTodoFolder.todo }
              </h2>
              <p className="flex flex-col font-montserrat font-normal text-xl leading-6 text-center px-3">
                <span>{ infoTodoFolder.takeBreath }</span>
                <span>{ infoTodoFolder.startDoing }</span>
              </p>
            </div> 
          )
        }

        {/* Lista de tasks */}
        <div className={
              localView === "modal" ? "h-[70%] absolute right-0 left-0 overflow-x-hidden pt-1" :
              `w-[16rem] c-mobile:w-[20rem] h-[27rem] overflow-hidden pt-7`
            }
          >
            { isLoading && 
              ( <Loading /> )
            }

            { !isLoading && incompleteTodoList?.length === 0 &&
              (  <h3 className="font-mono font-bold text-xl text-center">
                  <br />
                  { infoTodoFolder.emptyList }
                </h3> 
              )
            }

            { !isLoading && incompleteTodoList?.length > 0 &&
              (
                <ReactDnD
                  todoList={
                    localView !== "modal" ? incompleteTodoList.slice(0, 9)
                    : incompleteTodoList
                  }
                  localView={localView}
                  typeList="incomplete"
                  userIsAuthenticated={userIsAuthenticated!}
                />
              )
            }
        </div>

        { localView !== "modal" &&
          (
            <div className="w-full flex flex-col items-center gap-2 mt-4">
              <button 
                role="button"
                className="border border-primary-orange w-[80%] p-1 rounded-md hover:bg-orange-500 hover:text-primary-white transition-all"
                aria-label="see all completed tasks"
                title="see all completed tasks"
                disabled={isLoading}
                onClick={() => setSelectModal!({
                  types: "addNewTodo",
                  contentLabel: "Add new task"
                })}
              >
                { verifyQualityTodoLis() }
              </button>
              <Button 
                text={ incompleteTodoList?.length ? infoTodoFolder.eraseAll 
                       : infoTodoFolder.emptyList
                      } 
                ariaLabel={ incompleteTodoList?.length ? infoTodoFolder.eraseAll 
                            : infoTodoFolder.emptyList
                          }
                title={ incompleteTodoList?.length ? infoTodoFolder.eraseAll 
                        : infoTodoFolder.emptyList
                      }
                type="button" 
                width="w-[80%]"
                bg="bg-primary-black"
                disabled={incompleteTodoList?.length === 0 || isLoading || !userIsAuthenticated}
                onClick={() => setSelectModal!({
                  types: "deleteAllIncompleteTodo",
                  contentLabel: "Delete all incompleteTodo"
                })}
              />
            </div>
          )
        }
      </section>
    </ul>
  );
};