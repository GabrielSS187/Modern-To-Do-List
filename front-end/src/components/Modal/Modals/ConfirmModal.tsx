import { infoModalFolder } from "../../../data/GeneralInfo";
import { Button } from "../../../common/Button";

interface IProps {
  type: "logout" | "deleteAllIncompleteTodo" | "deleteAllCompleteTodo"
  setSelectModal: (params: {
    types: "",
    contentLabel: string;
  }) => void;
};

export function ConfirmModal ({ type, setSelectModal }: IProps) {
  
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
          title={infoModalFolder.confirmModal.yes}
          type="button"
          ariaLabel={infoModalFolder.confirmModal.yes}
          text={infoModalFolder.confirmModal.yes}
          padding="p-1 md:p-2"
          onClick={() => {}}
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