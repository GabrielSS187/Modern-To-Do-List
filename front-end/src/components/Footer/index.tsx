import { infoFooterFolder } from "../../data/GeneralInfo";

import { AnimationContainer } from "../../common/AnimationContainer";

export function Footer () {
  return (
    <AnimationContainer>
      <footer
        role="contentinfo" 
        className="flex flex-col items-center bg-primary-black mt-16 pt-20 w-full sm:clip-path-myPolygonFooter"
      >
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

        <div className="bg-primary-green h-8 w-[50%]" />
      </footer>
    </AnimationContainer>
  );
};