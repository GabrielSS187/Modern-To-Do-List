import { infoSliderFolder } from "../../data/GeneralInfo";
import { SlideList } from "./SlideList";

import { AnimationContainer } from "../../common/AnimationContainer";

export function ContainerSlide () {
  return (
    <AnimationContainer direction="down" className="relative mt-16">
      <>
        <div className="hidden min-[1000px]:block w-[75%] h-[27rem] min-[1250px]:w-full m-desktop:w-[75%] ml-[10rem] bg-primary-green rounded-lg absolute">
          <h2 className="font-montserrat font-bold p-5 text-4xl text-primary-white absolute left-[3rem] min-[1000px]:top-5 min-[1250px]:left-[4rem] m-desktop:left-[1.5rem]">
            { infoSliderFolder.goodThings }
          </h2>
        </div>
        <h2 className="min-[900px]:hidden font-montserrat font-bold text-4xl w-full text-center text-primary-green absolute pt-2">
        { infoSliderFolder.goodThings }
        </h2>
        <br className="hidden min-[1000px]:block"/>
        <SlideList />
      </>
    </AnimationContainer>
  );
};