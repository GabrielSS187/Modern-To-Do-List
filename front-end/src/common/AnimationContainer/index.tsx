import { Fade } from "react-awesome-reveal";

interface IProps {
  children: React.ReactNode
  direction?: any;
  triggerOnce?: boolean;
  className?: string;
  delay?: number,
  cascade?: true,
  damping?: number,
  fraction?: 0 | 1;
};

export function AnimationContainer ({
  children, 
  direction, 
  triggerOnce, 
  className,
  delay,
  cascade,
  damping,
  fraction
}: IProps) {
  return (
    <Fade
       direction={direction}
       triggerOnce={triggerOnce} 
       duration={1200}
       className={className ? className : className="z-50"}
       delay={delay && delay}
       cascade={cascade && cascade}
       damping={damping && damping}
       fraction={fraction ? fraction : 0}
      >
      { children }
    </Fade>
  );
};