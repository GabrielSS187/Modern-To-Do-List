import { CompleteTodoList } from "../../Todo";
import { AnimationContainer } from "../../../common/AnimationContainer";
import { TTodo } from "../ModalContainer";
import { infoModalFolder } from "../../../data/GeneralInfo";

interface IProps {
  todoList: TTodo[];
  isLoadingTodosComplete: boolean;
};

export function CompleteTodoListModal ({ todoList, isLoadingTodosComplete, }: IProps) {
  return (
    <AnimationContainer type="fade" className="h-full flex flex-col items-center">
        <h2 className="w-[95%] font-montserrat font-semibold text-base sm:text-2xl text-center">
          { infoModalFolder.completeTodoListModal.totalTask } 
          <span className="text-primary-green ml-2">{todoList.length}</span>
        </h2>
        <br />
        <CompleteTodoList 
          completeTodoList={todoList}
          isLoading={isLoadingTodosComplete}
          localView="modal"
        />
    </AnimationContainer>
  );
};