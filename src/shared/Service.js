import axios from "axios";

export const formatResult = (res) => {
  let result = [];
  let finalResult = [];
  res.forEach((item) => {
    const listingId = item.carListing?.id;
    if (!result[listingId]) {
      result[listingId] = {
        car: item.carListing,
        images: [],
      };
    }
    if (item.carImages) {
      result[listingId].images.push(item.carImages);
    }
  });

  result.forEach((item) => {
    finalResult.push({
      ...item.car,
      images: item.images,
    });
  });

  return finalResult;
};
const appId = import.meta.env.VITE_SENDBIRD_APP_ID;
const apiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;
export const createSendBirdUser = (userId, nickname, profileUrl) => {
  return axios.post(
    `https://api-${appId}.sendbird.com/v3/users`,
    {
      user_id: userId,
      nickname,
      profile_url: profileUrl,
      issue_access_token: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": apiToken,
      },
    }
  );
};

export const createSendBirdChannel = (users, title) => {
  return axios.post(
    `https://api-${appId}.sendbird.com/v3/group_channels`,
    {
      user_ids: users,
      is_distinct: true,
      name: title,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": apiToken,
      },
    }
  );
};
