interface IProps {
  text: string | React.ReactNode;
  type: "submit" | "button";
  title: string;
  ariaLabel: string;
  bg?: string;
  width?: string;
  weight?: string;
  font?: string;
  padding?: string;
  position?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  onClick,
  text,
  type,
  ariaLabel,
  bg,
  width,
  font,
  weight,
  padding,
  position,
  title,
  disabled,
}: IProps) {
  return (
    <button
      aria-label={ariaLabel}
      type={type}
      title={title}
      role="button"
      className={`${bg ? `${bg}` : "bg-primary-green"} ${
        width ? `${width}` : "w-72 max-w-[10rem]"
      } ${font ? `${font}` : "font-montserrat"} ${
        weight ? `${weight}` : "font-semibold"
      } ${padding ? `${padding}` : "p-2"} ${
        position && position
      } hover:opacity-80 transition-all text-sm md:text-base text-primary-white leading-7 rounded-lg z-30`}
      onClick={onClick}
      disabled={disabled && disabled}
    >
      {text}
    </button>
  );
};
