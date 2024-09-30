import { useEffect, useState } from "react";
import { db } from "../../configs/index";
import { carImages, CarListing } from "../../configs/schema";
import { eq } from "drizzle-orm";
import { useSearchParams } from "react-router-dom";
import { formatResult } from "../shared/Service";
import CarCardItem from "../components/CarCardItem";

export default function SearchByOptionsPage() {
  const [carList, setCarList] = useState([]);
  const [searchParams] = useSearchParams();
  const condition = searchParams.get("cars");
  const make = searchParams.get("make");
  const price = searchParams.get("price");

  useEffect(() => {
    async function getCarList() {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(carImages, eq(CarListing.id, carImages.carListingId))
        .where(condition && eq(CarListing.condition, condition))
        .where(make && eq(CarListing.make, make));
      const data = formatResult(result);
      setCarList(data);
    }
    getCarList();
  }, [condition, make, price]);

  return (
    <div className="p-10 md:px-20">
      <h2 className="font-bold text-4xl ">
        Search Results for {condition} {make} Cars
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">
        {carList.length > 0
          ? carList.map((item, index) => (
              <div key={index}>
                <CarCardItem car={item} />
              </div>
            ))
          : [1, 2, 3, 4].map((item, idx) => (
              <div
                key={idx}
                className="h-[250px] rounded-xl bg-slate-200 animate-pulse"
              ></div>
            ))}
      </div>
      {!carList.length > 0 && (
        <div className="text-center ">
          <p className="font-semibold text-3xl mt-10 bg-red-500 p-10 rounded-xl text-gray-200">
            Sorry....no {condition} {make} cars found.
          </p>
        </div>
      )}
    </div>
  );
}
