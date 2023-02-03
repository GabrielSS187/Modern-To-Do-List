import { Swiper, SwiperProps } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";

interface SwiperComponentProps {
  settings?: SwiperProps;
  children: React.ReactNode;
};

export const settingsDefault: SwiperProps = {
  spaceBetween: 30,
  slidesPerView: 1,
  centeredSlides: false,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination:  {
    clickable: true,
    dynamicBullets: true,
  },
  navigation: false,
  modules: [Autoplay, Pagination, Navigation],
  effect: "slide",
  breakpoints: {
    550: {
      spaceBetween: -220,
      slidesPerView: 1
    },
    768: {
      spaceBetween: -350,
      slidesPerView: 1,
    },
    1000: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    1250: {
      spaceBetween: 30,
      slidesPerView: 3,
    }
  },
};


export function SliderComponent ({ children }: SwiperComponentProps) {
  return (
    <Swiper {...settingsDefault}>
      {children}
    </Swiper>
  );
};