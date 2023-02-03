import { ArrowSvg } from "../../assets/svg/ArrowSvg";
import { infoSliderFolder } from "../../data/GeneralInfo";

interface IProps {
  text: string;
  img: string;
  link: string;
};

export function CardSlide ({ text, img, link }: IProps) {
  return (
    <div className="bg-primary-white w-[17rem] sm:w-[23rem] h-[25rem] sm:h-[28rem] border-1 border-black shadow-lg rounded-3xl mx-auto">
      <div>
        <div className="absolute">
          <ArrowSvg className="w-10 h-12 relative top-[7.9rem] left-[13rem] sm:top-[11.2rem] sm:left-[19.5rem]"/>
        </div>
        <img 
          src={`${img}`} 
          alt="illustrations"
          className="w-full rounded-t-3xl"
        />
      </div>
      <div className=" flex flex-col items-start justify-around h-[16rem] p-5">
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
        <div className="text-primary-green">
          <a href="#"
            title="go illustration 1"
          >
            { infoSliderFolder.readMore }
          </a>
        </div>
      </div>
    </div>
  );
};