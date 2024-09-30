import DetailsHeader from "../components/listing-details/DetailsHeader";
import { formatResult } from "../shared/Service";
import { db } from "../../configs/index";
import { carImages, CarListing } from "../../configs/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "../components/listing-details/ImageGallery";
import Description from "../components/listing-details/Description";
import Features from "../components/listing-details/Features";
import Pricing from "../components/listing-details/Pricing";
import Specification from "../components/listing-details/Specification";
import OwnerDetails from "../components/listing-details/OwnerDetails";
import MostSearchCar from "../components/MostSearchCar";

export default function ListingDetailsPage() {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState({});
  useEffect(() => {
    async function getCarDetails() {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(carImages, eq(CarListing.id, carImages.carListingId))
        .where(eq(CarListing.id, id));

      const data = formatResult(result);
      setCarDetails(data[0]);
    }
    getCarDetails();
  }, [id]);
  console.log(carDetails);

  return (
    <div>
      <div className="p-10 md:px-20">
        <DetailsHeader carDetails={carDetails} />

        <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5">
          <div className="md:col-span-2">
            <ImageGallery imagesList={carDetails.images} />
            <Description carDescription={carDetails.listingDescription} />
            <Features features={carDetails.features} />
          </div>
          <div>
            <Pricing price={carDetails.sellingPrice} />
            <Specification carDetails={carDetails} />
            <OwnerDetails
              imgUrl={carDetails.userImageUrl}
              userName={carDetails.userName}
              userEmail={carDetails.createdBy}
              listingTitle={carDetails.listingTitle}
            />
          </div>
        </div>
        <MostSearchCar />
      </div>
    </div>
  );
}
