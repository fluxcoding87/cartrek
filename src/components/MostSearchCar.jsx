import CarCardItem from "./CarCardItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { db } from "../../configs/index";
import { carImages, CarListing } from "../../configs/schema";
import { desc, eq } from "drizzle-orm";
import { formatResult } from "../shared/Service";
import { useEffect, useState } from "react";

export default function MostSearchCar() {
  const [carList, setCarList] = useState([]);
  useEffect(() => {
    getPopularCarList();
  }, []);

  async function getPopularCarList() {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(carImages, eq(CarListing.id, carImages.carListingId))
      .orderBy(desc(CarListing.id))
      .limit(10);

    const res = formatResult(result);
    setCarList(res);
  }

  return (
    <div className="mx-24">
      <h2 className="font-bold text-3xl text-center my-16">
        Most Searched Cars
      </h2>
      <Carousel>
        <CarouselContent>
          {carList.map((car, idx) => (
            <CarouselItem key={idx} className="basis-1/3">
              <CarCardItem car={car} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
