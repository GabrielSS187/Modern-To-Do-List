import { ArrowSvg } from "../../assets/svg/ArrowSvg";
import { infoSliderFolder } from "../../data/GeneralInfo";

interface IProps {
  text: string;
  img: string;
  link: string;
};

export function CardSlide ({ text, img, link }: IProps) {
  return (
    <div className="bg-primary-white w-[17rem] sm:w-[25rem] h-[24rem] sm:h-[30rem] border-1 border-black shadow-lg rounded-3xl mx-auto">
      <div>
        <div className="absolute">
          <ArrowSvg className="w-10 h-12 relative top-[7.9rem] left-[13rem] sm:top-[12.3rem] sm:left-[20rem]"/>
        </div>
        <img 
          src={`${img}`} 
          alt="illustrations"
          className="w-full rounded-t-3xl"
        />
      </div>
      <div className="h-[14.5rem] sm:h-[16rem] flex flex-col items-start justify-between p-5">
        <div className="flex flex-col gap-3 items-start">
          <button 
            className="w-[7rem] border px-2 py-1 rounded-2xl border-primary-gray hover:bg-primary-green hover:text-white transition-all"
            aria-label="function"
            title="function"
          >
              { infoSliderFolder.function }
          </button>
          <p className="max-w-[95%] font-montserrat font-medium leading-6 text-base sm:text-lg">
            {text}
          </p>
        </div>
        <a href="#"
           className="text-primary-green"
           title="go illustration 1"
        >
        { infoSliderFolder.readMore }
      </a>
      </div>
    </div>
  );
};