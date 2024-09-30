import { GiGasPump, GiGearStickPattern } from "react-icons/gi";
import { HiCalendarDays } from "react-icons/hi2";
import { SlSpeedometer } from "react-icons/sl";
/* eslint-disable react/prop-types */
export default function DetailsHeader({ carDetails }) {
  return (
    <div>
      {carDetails.listingTitle ? (
        <div>
          <h2 className="font-bold text-3xl">{carDetails.listingTitle}</h2>
          <p className="text-sm font-medium">{carDetails?.tagline}</p>
          <div className="flex gap-2 mt-3">
            <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
              <HiCalendarDays className="h-7 w-7 text-primary" />
              <h2 className="text-primary text-sm">{carDetails?.year}</h2>
            </div>
            <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
              <SlSpeedometer className="h-7 w-7 text-primary" />
              <h2 className="text-primary text-sm">{carDetails?.mileage}</h2>
            </div>
            <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
              <GiGearStickPattern className="h-7 w-7 text-primary" />
              <h2 className="text-primary text-sm">
                {carDetails?.transmission}
              </h2>
            </div>
            <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
              <GiGasPump className="h-7 w-7 text-primary" />
              <h2 className="text-primary text-sm">{carDetails?.fuelType}</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-xl h-[100px] bg-slate-300 animate-pulse"></div>
      )}
    </div>
  );
}
