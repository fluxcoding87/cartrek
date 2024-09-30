/* eslint-disable react-hooks/exhaustive-deps */
import { carImages, CarListing } from "../../../configs/schema";
import { db } from "../../../configs/index";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { desc, eq } from "drizzle-orm";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { formatResult } from "../../shared/Service";
import CarCardItem from "../CarCardItem";
import { FaTrash } from "react-icons/fa6";

export default function MyListing() {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);
  useEffect(() => {
    user && getUserCarListing();
  }, [user]);

  const getUserCarListing = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(carImages, eq(CarListing.id, carImages.carListingId))
      .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(CarListing.id));

    const res = formatResult(result);
    console.log(res);
    setCarList(res);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">My Listing</h2>
        <Link to="/add-listing">
          <Button>+ Add New Listing</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
        {carList.map((item, idx) => (
          <div key={idx}>
            <CarCardItem car={item} />
            <div className="p-2 bg-gray-50 rounded-lg flex justify-between gap-3">
              <Link
                to={`/add-listing?mode=edit&id=${item?.id}`}
                className="w-full"
              >
                <Button variant="outline" className="w-full">
                  Edit
                </Button>
              </Link>

              <Button variant="destructive">
                <FaTrash />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
