import { Button } from "../../common/Button";
import { HeroContainer } from "./HeroContainer";

import { infoFolder } from "../../data/GeneralInfo";

export function Info () {
  return (
    <section className="flex flex-col items-center mt-10 sm:flex-row sm:gap-7">
      <div className="flex flex-col items-center sm:items-start sm:ml-[3rem] lg:ml-[6rem]">
        <div>
          <div className="font-montserrat font-bold leading-10 text-4xl md:text-5xl md:pl-2 lg:text-6xl lg:leading-[4rem] xl:leading-[5rem] xl:mt-36 xl:text-7xl">
            <h1>{ infoFolder.organize }</h1>
            <h2 className="text-primary-green font-normal ">{ infoFolder.yourDailyJobs }</h2>
          </div>
          <br />
          <p className="font-montserrat font-semibold leading-6 text-sm text-center sm:text-start">
            { infoFolder.theOnly }
          </p>
          <br />
        </div>
        <Button 
          text={infoFolder.goTodoList} 
          type="button" 
          ariaLabel={infoFolder.goTodoList}
          title={infoFolder.goTodoList} 
        />
      </div>
      <div className="hidden sm:block">
        <HeroContainer />
      </div>
    </section>
  );
};