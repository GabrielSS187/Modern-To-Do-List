import { useState, useId } from "react";
import { toast } from "react-toastify";
import { infoModalFolder } from "../../../data/GeneralInfo";
import { Button } from "../../../common/Button";
import { queryClientObj } from "../../../services/queryClient.ts";
import { 
  deleteAllTodosCompleteApi,
  deleteAllTodosIncompleteApi
} from "../../../endpoints/todoApi";

interface IProps {
  type: "logout" | "deleteAllIncompleteTodo" | "deleteAllCompleteTodo"
  setSelectModal: (params: {
    types: "",
    contentLabel: string;
  }) => void;
};

const { useQueryClient } = queryClientObj;

export function ConfirmModal ({ type, setSelectModal }: IProps) {
  const [ errorApi, setErrorApi ] = useState<string>("")
  ,[ isLoading, setIsLoading ] = useState<boolean>(false)
  ,id = useId();

  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const deleAllComplete = async () => {
    try {
      setIsLoading(true);
      await toast.promise(deleteAllTodosCompleteApi(), {
        pending: "Processing",
        success: "Success",
      });
      queryClient.invalidateQueries("todos-complete");
      setIsLoading(false);
      setSelectModal({
        types: "",
        contentLabel: ""
      });
    } catch (error: any) {
      const [errors]: string[] = 
      Object.values(error.response?.data);
      toast.error(errors, {
        toastId: `${id}:delete-todo-error`
      });
    } finally {
      setIsLoading(false);
    };
  };

  const deleAllIncomplete = async () => {
    try {
      setIsLoading(true);
      await toast.promise(deleteAllTodosIncompleteApi(), {
        pending: "Processing",
        success: "Success",
      });
      queryClient.invalidateQueries("todos-incomplete");
      setIsLoading(false);
      setSelectModal({
        types: "",
        contentLabel: ""
      });
    } catch (error: any) {
      const [errors]: string[] = 
      Object.values(error.response?.data);
      toast.error(errors, {
        toastId: `${id}:delete-todo-error`
      });
    } finally {
      setIsLoading(false);
    };
  };

  const selectAction = () => {
    switch (type) {
      case "logout": 
        logout()
        break;
      case "deleteAllIncompleteTodo":
        deleAllIncomplete()
        break;
      case "deleteAllCompleteTodo":
        deleAllComplete()
        break
      default: 
        return;
    };
  };
  
  return (
    <div className="flex flex-col h-full justify-center">
      <h1 className="font-montserrat font-bold text-center text-lg">
        { type === "deleteAllIncompleteTodo" && infoModalFolder.confirmModal.deleteAllIncompleteTodo }
        { type === "deleteAllCompleteTodo" && infoModalFolder.confirmModal.deleteAllCompleteTodo }
        { type === "logout" && infoModalFolder.confirmModal.logoutAccount }
      </h1>
      <br/>
      <div className="flex justify-center gap-2">
        <Button
          title={!isLoading ? infoModalFolder.confirmModal.yes : "loading..."}
          type="button"
          ariaLabel={infoModalFolder.confirmModal.yes}
          text={infoModalFolder.confirmModal.yes}
          padding="p-1 md:p-2"
          onClick={selectAction}
        />
        <Button
          title={infoModalFolder.confirmModal.no}
          type="button"
          ariaLabel={infoModalFolder.confirmModal.no}
          text={infoModalFolder.confirmModal.no}
          padding="p-1 md:p-2"
          bg="bg-red-500"
          onClick={() => setSelectModal({
            types: "",
            contentLabel: ""
          })}
        />
      </div>
    </div>
  );
};