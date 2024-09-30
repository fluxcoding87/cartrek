/* eslint-disable react/prop-types */
import carSpecification from "../../shared/carSpecification";
import IconField from "../add-listing/IconField";

export default function Specification({ carDetails }) {
  return (
    <div className="p-10 rounded-xl border shadow-md mt-7">
      <h2 className="font-semibold text-xl">Specifications</h2>
      {carDetails ? (
        carSpecification.map((item, idx) => (
          <div key={idx} className="mt-5 flex items-center justify-between">
            <h2 className="flex gap-2 items-center font-medium">
              <IconField icon={item?.icon} />
              {item?.label}
            </h2>
            <h2 className="font-medium">
              {carDetails?.[item.name] || "Not Found"}
            </h2>
          </div>
        ))
      ) : (
        <div className="w-full h-[500px] rounded-xl bg-slate-300 animate-pulse"></div>
      )}
    </div>
  );
}
