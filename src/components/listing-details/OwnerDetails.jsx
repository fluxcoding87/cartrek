import { createSendBirdChannel, createSendBirdUser } from "@/shared/Service";
import { Button } from "../ui/button";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function OwnerDetails({
  imgUrl,
  userName,
  userEmail,
  listingTitle,
}) {
  const { user } = useUser();
  const navigate = useNavigate();
  async function onMessageOwnerClick() {
    const userId = user?.primaryEmailAddress.emailAddress.split("@")[0];
    const ownerUserId = userEmail.split("@")[0];
    try {
      await createSendBirdUser(userId, user?.fullName, user?.imageUrl).then(
        (res) => {}
      );
    } catch (e) {
      console.log(e);
    }
    // Owner Id
    try {
      await createSendBirdUser(ownerUserId, userName, imgUrl).then((res) => {});
    } catch (e) {
      console.log(e);
    }
    try {
      await createSendBirdChannel([userId, ownerUserId], listingTitle).then(
        (res) => {
          navigate("/profile");
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-semibold text-xl mb-3">Owner / Dealer Details</h2>
      <img src={imgUrl} alt="" className="w-[70px] h-[70px] rounded-full" />
      <h2 className="mt-2 font-bold text-xl">{userName}</h2>
      <h2 className="mt-2 text-gray-500">{userEmail}</h2>
      <Button className="w-full mt-6" onClick={onMessageOwnerClick}>
        Message Owner
      </Button>
    </div>
  );
}
