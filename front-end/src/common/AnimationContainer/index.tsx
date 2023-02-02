import { Fade, FadeDirection } from "react-awesome-reveal";

interface IProps {
  children: React.ReactNode
  direction?: FadeDirection;
  triggerOnce?: boolean;
  className?: string;
};

export function AnimationContainer ({children, direction, triggerOnce, className}: IProps) {
  return (
    <Fade
       direction={direction}
       triggerOnce={triggerOnce} 
       duration={1200}
       className={className ? className : className="z-50"}
      >
      { children }
    </Fade>
  )
};