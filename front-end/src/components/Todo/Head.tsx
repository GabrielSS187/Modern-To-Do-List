export function Head () {
  return (
    <div className="w-full flex flex-col items-center text-center bg-primary-black mt-10 py-10 text-primary-white sm:py-28 sm:clip-path-myPolygon">
      <h2 className="font-poppins font-semibold text-4xl leading-10 underline underline-offset-[.5rem] decoration-primary-green">To-do List</h2>
      <p className="font-montserrat font-medium text-sm leading-5 mt-5 px-3 max-w-md">
        Drag and drop to set your main priorities, check when done and create what´s new.
      </p>
    </div>
  );
};