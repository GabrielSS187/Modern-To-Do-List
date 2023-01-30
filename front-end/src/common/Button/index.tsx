interface IProps {
  text: string;
  type: "submit" | "button";
  title: string;
  ariaLabel: string;
  bg?: string;
  width?: string;
  weight?: string;
  font?: string;
  padding?: string;
  position?: string;
};

export function Button ({ text, type, ariaLabel, bg, width, font, weight, padding, position, title }: IProps) {
  
  return (
    <button
      aria-label={ariaLabel}
      type={type}
      title={title}
      role="button"
      className={`${bg ? `${bg}` : "bg-primary-green"} ${width ? `${width}` : "w-72 max-w-[10rem]"} ${font ? `${font}` : "font-montserrat"} ${weight ? `${weight}` : "font-semibold"} ${padding ? `${padding}` : "p-2"} ${position && position} hover:opacity-80 transition-all text-sm md:text-base text-primary-white leading-7 rounded-lg z-20`}>
      {text}
    </button>
  );
};