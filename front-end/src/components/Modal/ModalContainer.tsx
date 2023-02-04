import { useState, useEffect } from "react";

import Modal from "react-modal";
import { X } from "phosphor-react";

import { LoginAndRegisterModal } from "./Modals/LoginAndRegisterModal";

interface IProps {
  selectModal: TSelectModal;
  setSelectModal: (params: TSelectModal) => void;
};

type TSelectModal = {
  types: "" | "login" | "confirm";
  contentLabel: string;
};

type TCss = {
  content: React.CSSProperties;
};

export function ModalContainer ({ selectModal, setSelectModal }: IProps) {
  const [ alterModal, setAlterModal ] = 
  useState<"login" | "register">("login");

  useEffect(() => {
    if ( selectModal.types.length === 0 ) {
      setAlterModal("login");
    }; 
  }, [selectModal]);

  const customStyles: TCss = {
    content: {
      width: "min(80%, 50rem)",
      height: "32rem",
      paddingBottom: "3rem",
      margin: "0 auto",
      zIndex: 100,
      overflowY: "hidden"
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
        <div className="flex flex-col">
          <div className="self-end">
            <button role="button" onClick={() => setSelectModal({types: "", contentLabel: ""})}>
              <X size={32}/>
            </button>
          </div>
          <br />
          <LoginAndRegisterModal 
            alterModal={alterModal}
            setAlterModal={setAlterModal}
          />
        </div>
    </Modal>
  );
};
