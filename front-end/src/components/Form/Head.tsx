import image from "../../assets/img/women-img.png";

export function Head () {
  return (
    <div className="relative flex items-center bottom-[3.5rem] self-center sm:bottom-[5.5rem]">
      <span className="h-5 bg-primary-green w-10"/>
      <img 
        src={image} 
        alt="logo form"
        className="rounded-full relative w-[7rem] z-10 sm:w-[11rem]"
      />
    </div>
  );
};