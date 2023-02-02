import InputMask from "react-input-mask";

import { infoFormFolder } from "../../data/GeneralInfo";

import { Head } from "./Head";
import { Button } from "../../common/Button";
import { InboxSvg } from "../../assets/svg/InboxSvg";
import { AnimationContainer } from "../../common/AnimationContainer";

export function Form () {

  const inputClass = "h-9 rounded-sm outline outline-1 outline-secondary-black p-2 text-sm sm:text-lg focus:outline-primary-green";
  return (
    <AnimationContainer direction="left" triggerOnce={true}>
      <section className="relative w-full flex flex-col items-center">
        <form className="absolute bg-primary-white w-[80%] max-w-[44rem] px-7 pb-2 border-2 flex flex-col rounded-md shadow-md">
          <Head />

          <div className="relative bottom-7 flex justify-center gap-3 self-start">
            <div className="bg-primary-green p-3 max-w-max rounded-md sm:p-5">
              <InboxSvg />
            </div>
            <div className="my-auto tracking-widest text-lg leading-tight sm:text-xl">
              <p className="font-montserrat font-medium">{ infoFormFolder.getIn }</p>
              <p className="font-montserrat font-bold">{ infoFormFolder.touch }</p>
            </div>
          </div>
          
          <br />

          <div className="relative bottom-7 flex flex-col gap-5 font-montserrat font-normal text-base text-secondary-black">
            <div className="flex flex-col sm:text-lg">
              <label htmlFor="name">{ infoFormFolder.inputName.label }</label>
              <input
                id="name"
                type="text"
                aria-label={ infoFormFolder.inputName.ariaLabel }
                placeholder={ infoFormFolder.inputName.placeholder }
                aria-required={true}
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-5 sm:text-lg md:flex-row">
              <div className="flex flex-col md:w-1/2">
                <label htmlFor="email">{ infoFormFolder.inputEmail.label }</label>
                <input
                  id="email"
                  type="email"
                  aria-label={ infoFormFolder.inputEmail.ariaLabel }
                  placeholder={ infoFormFolder.inputEmail.placeholder }
                  aria-required={true}
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col md:w-1/2">
              <label htmlFor="telephone">{ infoFormFolder.inputTelephone.label }</label>
                <InputMask
                  mask="(99) 99999-9999"
                  id="telephone"
                  type="tel"
                  aria-label={ infoFormFolder.inputTelephone.ariaLabel }
                  placeholder={ infoFormFolder.inputTelephone.placeholder }
                  aria-required={true}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col sm:text-lg">
              <label htmlFor="message">{ infoFormFolder.inputMessage.label }</label>
              <textarea
                id="message"
                rows={4}
                cols={50}
                aria-label={ infoFormFolder.inputMessage.ariaLabel }
                placeholder={ infoFormFolder.inputMessage.placeholder }
                aria-required={true}
                required
                className="w-full h-36 rounded-sm outline outline-1 outline-secondary-black p-2 text-sm sm:text-lg focus:outline-primary-green"
              />
            </div>
            <Button 
              text={ infoFormFolder.sendNow }
              ariaLabel={ infoFormFolder.ariaLabel }
              type="submit" 
              title={ infoFormFolder.ariaLabel }
              width="w-[100%]"
            />
          </div>
        </form>
      </section>
    </AnimationContainer>
  );
};