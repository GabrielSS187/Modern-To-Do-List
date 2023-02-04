import { AnimationContainer } from "../../../common/AnimationContainer";

import { WomenSvg } from "../../../assets/svg/WomenSvg";
import { Button } from "../../../common/Button";

interface IProps {
  alterModal: "login" | "register";
  setAlterModal: (params: "login" | "register") => void;
};

export function LoginAndRegisterModal ({ alterModal, setAlterModal }: IProps) {
  const inputClass = "h-9 w-full self-center rounded-sm outline outline-1 outline-secondary-black p-2 text-sm sm:text-lg focus:outline-primary-green";
  return (
    <AnimationContainer type="reveal">
      <div className="relative flex min-[500px]:justify-center  sm:items-center gap-1">
        <WomenSvg className="hidden sm:block w-[7.5rem] h-[7.5rem] md:w-[10rem] md:h-[10rem] lg:w-[12rem] lg:h-[12rem] absolute left-0" />
        <div className="font-montserrat">
          <h2 className="font-semibold text-primary-black text-4xl leading-8 md:leading-9">
            { alterModal === "login" ? "Sign in" : "Register" }
          </h2>
          <h3 className="font-normal text-primary-green text-2xl leading-8">
            { alterModal === "login" ? " to access your list" : "to create to-do list" }
          </h3>
        </div>
      </div>

      <form role="form" className="flex flex-col gap-5 mt-1 font-montserrat font-semibold leading-7">
        <div className="flex flex-col w-full self-center sm:w-[17rem] lg:w-[22rem]">
          <label htmlFor="User">
            { alterModal === "login" ? "User:" : "Choose a name" }
          </label>
          <input 
            id="User" 
            type="text" 
            className={inputClass} 
            required
            aria-required
            aria-label="Enter your username here."
          />
        </div>
        <div className="flex flex-col self-center w-full sm:w-[17rem] lg:w-[22rem]">
          <label htmlFor="Password">
            { alterModal === "login" ? "Password:" : "Choose a password" }
          </label>
          <input
            id="Password"
            type="password" 
            required
            aria-required
            className={inputClass}
            aria-label="Enter your password from here."
          />
        </div>
        <Button
          type="submit"
          text={alterModal === "login" ? "Sign in" :  "Register"}
          ariaLabel="Sign in"
          title="Sign in"
          width="w-full sm:w-[17rem] self-center lg:w-[22rem]"
        />
      </form>

      <br />

      <div className="flex flex-col font-montserrat font-normal text-sm text-center">
        <p>{ alterModal === "login" ? "Don't have an account?" : "Already have an account?" }</p>
        {
          alterModal === "login" &&
          (
            <button 
              onClick={() => setAlterModal("register")} 
              className="text-blue-600 underline decoration-wavy"
            >
              Register
            </button>
          )
        }
        {
          alterModal === "register" &&
          (
            <button 
              onClick={() => setAlterModal("login")} 
              className="text-blue-600 underline decoration-wavy"
            >
              Login
            </button>
          )
        }  
      </div>
    </AnimationContainer>
  );
};