import { Spinner } from "phosphor-react";

export function Loading () {
  return (
    <div className="flex justify-center mt-5">
      <Spinner size={32} className="animate-spin text-blue-800" />
    </div>
  );
};