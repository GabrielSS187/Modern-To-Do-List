import heroImg from "../../assets/img/hero-img.png";
import heroArrowImg from "../../assets/img/hero-arrow-img.png"

export function HeroContainer () {
  return (
    <div className="">
      <img src={heroArrowImg} alt="a" className="z-10 absolute -top-14 -right-20 sm:w-96 sm:top-14 md:w-[25rem] min-[900px]:w-[32rem] min-[900px]:-top-3 xl:w-[40rem]"/>
      <img 
        src={heroImg} 
        alt="image hero"
        className="z-10 absolute top-36 right-6 w-60 h-72 min-[900px]:h-96 min-[900px]:w-72 min-[900px]:right-20 min-[900px]:top-24 xl:h-[29rem] xl:w-[25rem] xl:top-32"
       />
    </div>
  );
};