import { useUser } from "@clerk/clerk-react";
import { SendBirdProvider } from "@sendbird/uikit-react";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import "@sendbird/uikit-react/dist/index.css";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
import { useEffect, useState } from "react";

export default function Inbox() {
  const { user } = useUser();
  const [userId, setUserId] = useState();
  const [channelUrl, setChannelUrl] = useState();
  useEffect(() => {
    if (user) {
      const id = user.primaryEmailAddress.emailAddress.split("@")[0];
      setUserId(id);
    }
  }, [user]);
  return (
    <div className="w-full h-[500px]">
      <SendBirdProvider
        appId={import.meta.env.VITE_SENDBIRD_APP_ID}
        userId={userId}
        nickname={user?.fullName}
        profileUrl={user?.imageUrl}
        allowProfileEdit={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-5">
          <div className="p-5 border shadow-lg">
            <GroupChannelList
              channelListQueryParams={{
                includeEmpty: true,
              }}
              onChannelSelect={(channel) => {
                setChannelUrl(channel?.url);
              }}
            />
          </div>
          <div className="md:col-span-2 shadow-md">
            <GroupChannel channelUrl={channelUrl} />
          </div>
        </div>
      </SendBirdProvider>
    </div>
  );
}
