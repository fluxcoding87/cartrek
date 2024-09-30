/* eslint-disable no-unused-vars */
import { Form, useNavigate, useSearchParams } from "react-router-dom";
import carDetails from "../shared/carDetails.json";
import features from "../shared/features.json";
import InputField from "@/components/add-listing/InputField";
import DropdownField from "@/components/add-listing/DropdownField";
import TextAreaField from "@/components/add-listing/TextAreaField";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { db } from "../../configs/index.js";
import { carImages, CarListing } from "../../configs/schema.js";
import { BiLoaderAlt } from "react-icons/bi";
import IconField from "@/components/add-listing/IconField";
import UploadImages from "@/components/add-listing/UploadImages";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { eq } from "drizzle-orm";
import { formatResult } from "@/shared/Service";

export default function AddListingPage() {
  const [triggerUploadImages, setTriggerUploadImages] = useState();
  const [loading, setLoading] = useState(false);
  const [carInfo, setCarInfo] = useState({});
  const [featuresData, setFeaturesData] = useState({});
  const [userImages, setUserImages] = useState([]);
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const id = searchParams.get("id");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    toast("Please Wait...");
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const checkBoxFeatures = fd.getAll("features");
    const formData = {
      ...data,
    };

    if (mode === "edit") {
      const result = await db
        .update(CarListing)
        .set({
          ...formData,
          features: checkBoxFeatures,
          createdBy: user?.primaryEmailAddress.emailAddress,
          userName: user?.fullName,
          userImageUrl: user?.imageUrl,
          postedOn: moment().format("DD/MM/yyyy"),
        })
        .where(eq(CarListing.id, id))
        .returning({ id: CarListing.id });
      console.log(result);
      setTriggerUploadImages(result[0]?.id);
      setLoading(false);
      navigate("/profile");
    } else {
      try {
        const result = await db
          .insert(CarListing)
          .values({
            ...formData,
            features: checkBoxFeatures,
            createdBy: user?.primaryEmailAddress.emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            postedOn: moment().format("DD/MM/yyyy"),
          })
          .returning({ id: CarListing.id });
        if (result) {
          console.log("datasaved");
          setTriggerUploadImages(result[0]?.id);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  const handleFeatureChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    async function getListingDetails() {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(carImages, eq(CarListing.id, carImages.carListingId))
        .where(eq(CarListing.id, id));

      const res = formatResult(result);
      let data = {};
      res[0].features.forEach((feature) => {
        data = {
          ...data,
          [feature]: true,
        };
      });

      setCarInfo(res[0]);
      setFeaturesData(data);
      setUserImages(res[0].images);
    }
    if (mode === "edit") {
      getListingDetails();
    }
  }, [id, mode]);
  console.log(carInfo);

  return (
    <div>
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10" onSubmit={handleSubmit}>
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm flex gap-2 items-center mb-2">
                    <IconField icon={item.icon} />
                    {item.label}
                    {item.required && <span className="text-red-500">*</span>}
                  </label>
                  {item.fieldType === "text" || item.fieldType === "number" ? (
                    <InputField
                      item={item}
                      required={item.required}
                      carInfo={carInfo}
                    />
                  ) : null}
                  {item.fieldType === "dropdown" ? (
                    <DropdownField
                      item={item}
                      required={item.required}
                      carInfo={carInfo}
                      name={item.name}
                    />
                  ) : null}
                  {item.fieldType === "textarea" ? (
                    <TextAreaField
                      item={item}
                      required={item.required}
                      carInfo={carInfo}
                      name={item.name}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox
                    name="features"
                    value={item.name}
                    onCheckedChange={(value) =>
                      handleFeatureChange(item.name, value)
                    }
                    checked={featuresData?.[item.name]}
                  />
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
          <UploadImages
            triggerUploadImages={triggerUploadImages}
            imagesList={userImages}
            mode={mode}
            id={id}
            setLoader={(v) => {
              setLoading(v);
              if (!loading) {
                navigate("/profile");
              }
            }}
          />
          <div className="mt-10 flex justify-end">
            <Button type="submit" disabled={loading}>
              {!loading ? (
                "Submit"
              ) : (
                <BiLoaderAlt className="animate-spin text-lg" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
