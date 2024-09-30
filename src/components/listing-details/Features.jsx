import { FaCheck } from "react-icons/fa6";

/* eslint-disable react/prop-types */
export default function Features({ features }) {
  return (
    <div className="p-10 bg-white rounded-xl border shadow-md my-7">
      <h2 className="font-semibold text-2xl">Features</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-7 ">
        {features?.map((item, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <FaCheck className="text-lg bg-blue-100 text-primary p-1 rounded-full" />
            <p className="font-medium">{item.toLowerCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
