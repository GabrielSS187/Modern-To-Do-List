import { infoFolder } from "../../data/GeneralInfo";
import { AnimationContainer } from "../../common/AnimationContainer";


export function HeroContainer () {
  return (
    <>
      <AnimationContainer 
        direction="right" 
        triggerOnce={true} 
        className="absolute -top-14 -right-20 sm:w-96 sm:top-14 md:w-[25rem] min-[900px]:w-[32rem] min-[900px]:-top-3 xl:w-[40rem]"
      >
        <img src={infoFolder.heroArrowImg} alt="arrow image" className="z-10"/>
      </AnimationContainer>
      <AnimationContainer 
        direction="right" 
        className="absolute top-36 right-6 w-60 h-72 min-[900px]:h-96 min-[900px]:w-72 min-[900px]:right-20 min-[900px]:top-24 xl:h-[29rem] xl:w-[25rem] xl:top-32"
      >
        <img 
          src={infoFolder.heroImg} 
          alt="image hero"
          className="z-10"
        />
      </AnimationContainer>
    </>
  );
};