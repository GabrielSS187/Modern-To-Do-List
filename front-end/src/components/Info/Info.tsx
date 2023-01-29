import { Button } from "../../common/Button";

import { HeroContainer } from "./HeroContainer";

export function Info () {
  return (
    <section className="flex flex-col items-center mt-10 sm:flex-row sm:gap-7 sm:h-80 ">
      <div className="flex flex-col items-center sm:w-1/2">
        <div>
          <div className="font-montserrat font-bold leading-10 text-4xl md:text-5xl md:pl-2 lg:text-6xl lg:leading-[4rem] xl:mt-36">
            <h1>Organize</h1>
            <h2 className="text-primary-green font-normal">your daily jobs</h2>
          </div>
          <br />
          <p className="font-montserrat font-semibold leading-6 text-sm text-center sm:text-start">The only way to get things done</p>
          <br />
        </div>
        <Button text="Go to To-do list" type="button" ariaLabel="Go to To-do list" />
      </div>
      <div className="hidden sm:block">
        <HeroContainer />
      </div>
    </section>
  );
};