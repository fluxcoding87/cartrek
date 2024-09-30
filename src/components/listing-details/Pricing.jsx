/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import { MdOutlineLocalOffer } from "react-icons/md";
export default function Pricing({ price }) {
  return (
    <div className="p-10 rounded-xl shadow-md border">
      <h2 className="font-medium text-2xl">Our Price</h2>
      <h2 className="font-bold text-4xl mt-2">${price}</h2>
      <Button className="w-full mt-7" size="lg">
        <MdOutlineLocalOffer className="text-lg mr-2" />
        Make an offer price
      </Button>
    </div>
  );
}
