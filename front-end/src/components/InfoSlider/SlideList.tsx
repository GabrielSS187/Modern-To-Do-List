import { SliderComponent } from "../../lib/swiper";
import { SwiperSlide } from "swiper/react";

import { infoSliderFolder } from "../../data/GeneralInfo";

import { CardSlide } from './CardSlide';

export function SlideList () {
  return (
    <SliderComponent>
        {
          infoSliderFolder.listInfoSlides.map((info) => {
            return (
              <SwiperSlide key={info.id}>
                <CardSlide
                  img={info.img}
                  text={info.text}
                  link={info.link}
                  />
                </SwiperSlide>
            )
          })
        }
    </SliderComponent>
  );
};