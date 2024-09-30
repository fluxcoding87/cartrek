import { useEffect, useState } from "react";
import { db } from "../../configs/index";
import { carImages, CarListing } from "../../configs/schema";
import { eq } from "drizzle-orm";
import { useParams } from "react-router-dom";
import { formatResult } from "../shared/Service";
import CarCardItem from "../components/CarCardItem";

export default function SearchCategoryPage() {
  const { category } = useParams();
  const [carList, setCarList] = useState([]);
  useEffect(() => {
    async function getCarList() {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(carImages, eq(CarListing.id, carImages.carListingId))
        .where(eq(CarListing.category, category));

      const data = formatResult(result);
      setCarList(data);
    }
    getCarList();
  }, [category]);

  return (
    <>
      <div className="p-10 md:px-20">
        <h2 className="font-bold text-4xl ">{category}</h2>

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
              Sorry....no {category} cars found.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
