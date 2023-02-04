import { Button } from "../../common/Button";
import { ArrowSvg } from "../../assets/svg/ArrowSvg";
import { AnimationContainer } from "../../common/AnimationContainer";

import { infoHeaderFolder } from "../../data/GeneralInfo";

interface IProps {
  setSelectModal: (params: {
    types: "" | "login" | "cadaster" | "confirm";
    contentLabel: string
  }) => void;
};

export function Header ({setSelectModal}: IProps) {
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
          text={infoHeaderFolder.login} 
          bg="bg-primary-black" 
          font="font-poppins" 
          width="w-24" 
          weight="font-semibold" 
          padding="p-1"
          ariaLabel={infoHeaderFolder.ariaLabel}
          title={infoHeaderFolder.ariaLabel}
          onClick={() => setSelectModal({types: "login", contentLabel: "ola"})}
        />
      </AnimationContainer>
    </header>
  );
};