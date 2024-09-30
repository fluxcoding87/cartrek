/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Separator } from "./ui/separator";
import { LuFuel } from "react-icons/lu";
import { SlSpeedometer } from "react-icons/sl";
import { GiGearStickPattern } from "react-icons/gi";
import { MdOpenInNew } from "react-icons/md";
import { Link } from "react-router-dom";
export default function CarCardItem({ car }) {
  return (
    <Link to={`/listing-details/${car.id}`}>
      <div className="rounded-xl bg-white cursor-pointer hover:shadow-md">
        <h2 className="absolute m-2 bg-green-600 px-2 rounded-full text-sm py-1 text-white">
          New
        </h2>
        <img
          src={car?.images[0]?.imageUrl}
          className="rounded-t-xl w-full object-cover h-[200px]"
        />
        <div className="p-4">
          <h2 className="font-bold text-black text-lg mb-2">
            {car?.listingTitle}
          </h2>
          <Separator />
          <div className="grid grid-cols-3 mt-5">
            <div className="flex flex-col items-center">
              <LuFuel className="text-lg mb-2" />
              <h2>{car.mileage}</h2>
            </div>
            <div className="flex flex-col items-center">
              <SlSpeedometer className="text-lg mb-2" />
              <h2>{car.fuelType}</h2>
            </div>
            <div className="flex flex-col items-center">
              <GiGearStickPattern className="text-lg mb-2" />
              <h2>{car.transmission}</h2>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">${car.sellingPrice}</h2>
            <h2 className="text-primary text-sm flex gap-2 items-center">
              View Details
              <MdOpenInNew />
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}
