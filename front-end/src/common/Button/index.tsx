interface IProps {
  text: string;
  type: "submit" | "button";
  ariaLabel: string;
  bg?: string;
  width?: string;
  weight?: string;
  font?: string;
  padding?: string;
  position?: string;
};

export function Button ({ text, type, ariaLabel, bg, width, font, weight, padding, position }: IProps) {
  
  return (
    <button
      aria-label={ariaLabel}
      type={type}
      className={`${bg ? `${bg}` : "bg-primary-green"} ${width ? `${width}` : "w-72"} ${font ? `${font}` : "font-montserrat"} ${weight ? `${weight}` : "font-semibold"} ${padding ? `${padding}` : "p-2"} ${position && position} max-w-[10rem] hover:opacity-80 transition-all text-sm md:text-base text-primary-white leading-7 rounded-lg z-20`}>
      {text}
    </button>
  );
};