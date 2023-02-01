import { infoSliderFolder } from "../../data/GeneralInfo";
import { SlideList } from "./SlideList";

export function ContainerSlide () {
  return (
    <section className="mt-5 mb-[7rem] sm:mb-[10rem] min-[800px]:mt-28 relative">
      <div className="hidden min-[800px]:block bg-primary-green absolute -top-9 w-[70%] md:w-[70%] h-[30rem] -right-10 rounded-lg">
        <h2 className="font-montserrat font-bold text-4xl text-primary-white absolute top-[3rem] left-[4.5rem] xl:left-[8rem] 2xl:left-[5.4rem]">
          { infoSliderFolder.goodThings }
        </h2>
      </div>
      <h2 className="md:hidden font-montserrat font-bold text-4xl text-center text-primary-green relative top-10">
      { infoSliderFolder.goodThings }
      </h2>
      <SlideList />
    </section>
  );
};