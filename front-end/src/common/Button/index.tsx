interface IProps {
  text: string;
  type: "submit" | "button";
  ariaLabel: string;
  bg?: string;
  width?: string;
  weight?: string;
  font?: string;
  padding?: string;
};

export function Button ({ text, type, ariaLabel, bg, width, font, weight, padding }: IProps) {
  
  return (
    <button
      aria-label={ariaLabel}
      type={type}
      className={`${bg ? `${bg}` : "bg-primary-green"} ${width ? `${width}` : "w-72"} ${font ? `${font}` : "font-montserrat"} ${weight ? `${weight}` : "font-semibold"} ${padding ? `${padding}` : "p-2"} max-w-[10rem] hover:opacity-80 transition-all text-sm md:text-base text-primary-white leading-7 rounded-lg z-10`}>
      {text}
    </button>
  );
};