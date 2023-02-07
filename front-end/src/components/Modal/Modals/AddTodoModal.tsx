import { useId } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { IncompleteTodoList } from "../../Todo";
import { Button } from "../../../common/Button";
import { AnimationContainer } from "../../../common/AnimationContainer";
import { TTodo } from "../ModalContainer";

import { infoModalFolder } from "../../../data/GeneralInfo";

interface IProps {
  todoList: TTodo[];
  isLoadingTodosIncomplete: boolean;
};

type TFormType = {
  todo: string;
};

export function AddTodoModal ({ todoList, isLoadingTodosIncomplete }: IProps) {
  const id = useId();

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    clearErrors,
    watch,
    setError
  } = useForm<TFormType>();

  if ( errors?.todo ) {
    toast(`${errors?.todo?.message}`, {
      type: "error",
      toastId: `${id}:erros-add-new-todo`
    });
  };

  return (
    <AnimationContainer type="reveal" className="h-full">
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit(() => {})} className="flex flex-col gap-2 h-[7rem] w-full">
          <div className="font-montserrat font-semibold">
            <label htmlFor="name-task">
              {infoModalFolder.addTodoModal.taskName}
            </label>
            <input 
              id="name-task"
              {...register("todo", {
                maxLength: {value: 30, message: infoModalFolder.addTodoModal.max30},
                minLength: {value: 4, message: infoModalFolder.addTodoModal.min4},
                required: {value: true, message: infoModalFolder.addTodoModal.required},
              })}
              type="text"
              aria-required
              aria-label={infoModalFolder.addTodoModal.ariaLabel}
              placeholder={infoModalFolder.addTodoModal.placeholder}
              className={`h-9 w-full rounded-sm outline outline-1 ${errors?.todo?.message ? "outline-red-500" : "outline-secondary-black"} p-2 text-sm sm:text-lg focus:outline-primary-green`}
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              text={infoModalFolder.addTodoModal.addNewTask}
              ariaLabel={infoModalFolder.addTodoModal.ariaLabel}
              title={infoModalFolder.addTodoModal.title}
              width="w-1/2 truncate"
              padding="p-1"
            />
            <div className="w-1/2 flex justify-center items-center border bg-primary-orange text-primary-white rounded-md p-1 text-sm sm:text-base font-montserrat truncate font-semibold">
              <p>{infoModalFolder.addTodoModal.totalTasks}: {todoList.length}</p>
            </div>
          </div>
        </form>
        {
          todoList.length === 0 &&
          (
            <h3 className="font-mono font-bold text-xl text-center">
              <br />
              {infoModalFolder.addTodoModal.emptyList}
            </h3> 
          )
        }
        {
          todoList.length > 0 &&
          (
            <IncompleteTodoList 
              incompleteTodoList={todoList}
              isLoading={isLoadingTodosIncomplete}
              localView="modal"
            />
          )
        }
      </div>
    </AnimationContainer>
  );
};