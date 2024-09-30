import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "./ui/separator";
import { CiSearch } from "react-icons/ci";
import { CarMakes, Pricing } from "../shared/Data";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Search() {
  const [cars, setCars] = useState();
  const [make, setMake] = useState();
  const [price, setPrice] = useState();

  return (
    <div className="p-2 md:p-5 bg-white rounded-md md:rounded-full flex flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%] ">
      <Select onValueChange={(value) => setCars(value)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Car Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Used">Used</SelectItem>
          <SelectItem value="Certified Pre-Owned">
            Certified Pre-Owned
          </SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select onValueChange={(value) => setMake(value)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Car Models" />
        </SelectTrigger>
        <SelectContent>
          {CarMakes.map((maker) => {
            return (
              <SelectItem key={maker.id} value={maker.name}>
                {maker.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select onValueChange={(value) => setPrice(value)}>
        <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          {Pricing.map((price) => {
            return (
              <SelectItem key={price.id} value={price.amount}>
                {price.amount}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Link to={`/search?cars=${cars}&make=${make}&price=${price}`}>
        <CiSearch className="text-[3rem] bg-primary rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer" />
      </Link>
    </div>
  );
}
