import { infoFooterFolder } from "../../data/GeneralInfo";

export function Footer () {
  return (
    <section className="flex flex-col items-center bg-primary-black relative pt-20 top-[46rem] sm:top-[53rem] md:top-[48rem] w-full h-[15.5rem] sm:clip-path-myPolygonFooter">
      <div className="text-primary-white flex flex-col items-center gap-4 pb-8">
        <h3 className="font-montserrat font-semibold text-xl">
          { infoFooterFolder.needHelp }
        </h3>
        <h4 className="font-montserrat font-semibold text-xl">
          { infoFooterFolder.email }
        </h4>
        <h5 className="font-montserrat font-medium text-sm text-center px-3 sm:px-0">
          { infoFooterFolder.copyright }
        </h5>
      </div>

      <div className="bg-primary-green h-8  w-[50%]" />
    </section>
  );
};