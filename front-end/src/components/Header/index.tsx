import { Button } from "../../common/Button";
import { ArrowSvg } from "../../assets/svg/ArrowSvg";

export function Header () {
  return (
    <header className="flex justify-between gap-5 px-3 py-5" role="banner">
      <div className="flex items-center">
        <ArrowSvg className="w-10 h-10"/>
        <h1 className="text-3xl pb-1 pl-1 font-montserrat font-semibold">
          coopers
        </h1>
      </div>
      <Button 
        type="button"
        text="login" 
        bg="bg-primary-black" 
        font="font-poppins" 
        width="w-24" 
        weight="font-semibold" 
        padding="p-1"
        ariaLabel="begin session"
        title="begin session"
      />
    </header>
  );
};