import { useEffect, useState } from "react";

type TProps = {
  currentPageOffset: number;
};

type TShowButton = boolean;
type THandleClick = () => void;


export function useScrollTop (currentPageOffset: number): [ 
  THandleClick: THandleClick,
  showButton: TShowButton,
 ] {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > currentPageOffset) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return [ handleClick, showButton ];
};