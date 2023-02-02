import { infoApp } from "./data/GeneralInfo";

import { Header } from "./components/Header";
import { Info } from "./components/Info";
import { TodoContainer } from "./components/Todo";
import { useScrollTop } from "./hook/useScrollTop";

import { ContainerSlide } from "./components/InfoSlider";
import { Form } from "./components/Form/Form";
import { Footer } from "./components/Footer";
import { AnimationContainer } from "./common/AnimationContainer";

import { ArrowFatLinesUp } from "phosphor-react";

export function App () {
  const [ handleClick, showButton ] = useScrollTop(200);

  return (
    <>
      <Header />

      <main role="main">
        <Info />
        <TodoContainer />
        <ContainerSlide />
        <Form />
        <Footer />
      </main>

        <AnimationContainer direction="up" className={`fixed right-[0.5rem] ${ showButton ? "bottom-[5rem]" : "bottom-3" } z-50`}>
          <button 
            aria-label={infoApp.addWhatsapp} title={infoApp.addWhatsapp}
          >
            <a href="https://wa.me/5583986785354?text=Olá Gabriel Silva, meu nome é:" target="_blank">
              <img src={infoApp.whatsappLogo} alt="whatsapp" className="w-[2.9rem] sm:w-[3.5rem]" />
            </a>
          </button>
        </AnimationContainer>

        {
          showButton && (
            <AnimationContainer direction="up"  className="fixed right-[.5rem] bottom-3 z-50">
              <button 
                onClick={handleClick} 
                title={infoApp.scrollTop}
                aria-label={infoApp.scrollTop}
              >
                <ArrowFatLinesUp className="w-[3rem] h-[2em] animate-bounce text-blue-500" />
              </button>
            </AnimationContainer>
          )
        }
    </>
  );
};