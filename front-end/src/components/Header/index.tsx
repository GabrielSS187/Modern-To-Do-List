import { Button } from "../../common/Button";
import { ArrowSvg } from "../../assets/svg/ArrowSvg";
import { AnimationContainer } from "../../common/AnimationContainer";

import { infoHeaderFolder } from "../../data/GeneralInfo";

interface IProps {
  setSelectModal: (params: {
    types: "" | "login" | "logout";
    contentLabel: string
  }) => void;
  userIsAuthenticated: boolean;
};

export function Header ({setSelectModal, userIsAuthenticated}: IProps) {
  const selectAction = () => {
    if ( userIsAuthenticated ) {
      setSelectModal({
        types: "logout",
        contentLabel: "logout"
      })
    };
    if ( !userIsAuthenticated ) {
      setSelectModal({
        types: "login",
        contentLabel: "login"
      })
    };
  };

  return (
    <header className="flex justify-between gap-5 px-3 py-5" role="banner">
      <AnimationContainer direction="left">
        <div className="flex items-center">
          <ArrowSvg className="w-10 h-10"/>
          <h1 className="text-3xl pb-1 pl-1 font-montserrat font-semibold">
            { infoHeaderFolder.coopers }
          </h1>
        </div>
      </AnimationContainer>
      <AnimationContainer direction="right">
        <Button 
          type="button"
          text={!userIsAuthenticated ? infoHeaderFolder.login : "logout"} 
          bg="bg-primary-black" 
          font="font-poppins" 
          width="w-24" 
          weight="font-semibold" 
          padding="p-1"
          ariaLabel={infoHeaderFolder.ariaLabel}
          title={infoHeaderFolder.ariaLabel}
          onClick={selectAction} />
      </AnimationContainer>
    </header>
  );
};